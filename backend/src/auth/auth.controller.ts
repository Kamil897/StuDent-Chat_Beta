import { Controller, Get, Post, Body, HttpCode, HttpStatus, Res, UseGuards, UnauthorizedException, Req, ForbiddenException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { AdminSignInDto, CreateAdminDto } from '../admin/dto';
import { ResponseFields } from '../common/types';
import { RefreshTokenGuard } from '../common/guards';
import { AdminRefreshTokenGuard } from '../common/guards/admin-refresh-token.guard';
import { CookieGetter } from 'src/decorators/cookie-getter.decorator';
import { CreateTeacherDto } from 'src/teacher/dto/create-teacher.dto';
import { UpdateTeacherDto } from 'src/teacher/dto/update-teacher.dto';
import { TeacherSignInDto } from 'src/teacher/dto/sign_in-teacher.dto';
import { GetCurrentUser, GetCurrentUserId } from 'src/common/decorators';
import { TeacherService } from 'src/teacher/teacher.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly teacherService: TeacherService,
    private readonly jwtService: JwtService

  ) { }

  @ApiOperation({ summary: "Yangi foydalanuvchilarni ro'yxatdan o'tkazish" })
  @Post('sign-up')
  signUp(@Body() createTeacherDto: CreateTeacherDto) {
    return this.authService.signUp(createTeacherDto)
  }

  @ApiOperation({ summary: "Tizimga kirish" })
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  signIn(
    @Body() teacherSignInDto: TeacherSignInDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<ResponseFields> {
    return this.authService.signIn(teacherSignInDto, res);
  }

  @UseGuards(RefreshTokenGuard)
  @Post("sign-out")
  async signout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) {
      throw new UnauthorizedException("No refresh token provided");
    }

    const decodedToken = this.jwtService.verify(refreshToken, { secret: process.env.REFRESH_TOKEN_KEY });
    const teacherId = decodedToken.id;

    const teacher = await this.teacherService.findOne(teacherId);
    if (!teacher || !teacher.hashed_refresh_token) {
      throw new ForbiddenException("Invalid or missing refresh token");
    }

    await this.teacherService.updateRefreshToken(teacher.id, null as any);
    res.clearCookie("refresh_token");

    return { message: "Teacher logged out successfully" };
  }

  @Get("refresh")
    async refresh(
        @GetCurrentUserId() teacherId: number,
        @GetCurrentUser("refreshToken") refreshToken: string,
        @Req() req: Request,  // 👈 Передаём req, чтобы видеть все cookies
        @Res({ passthrough: true }) res: Response
    ) {
        console.log("✅ [AuthController] Teacher ID:", teacherId);
        console.log("✅ [AuthController] Received Refresh Token:", refreshToken);
        console.log("✅ [AuthController] All Cookies:", req.cookies);

        if (!teacherId || !refreshToken) {
            throw new BadRequestException("❌ Не переданы необходимые параметры (teacherId или refreshToken)");
        }

        return this.authService.refreshToken(teacherId, refreshToken, req, res);
    }
  


  @ApiOperation({ summary: "Yangi admin ro'yxatdan o'tkazish" })
  @Post('admin/sign-up')
  signUpAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.adminSignUp(createAdminDto)
  }

  @ApiOperation({ summary: "Admin tizimga kirish" })
  @HttpCode(HttpStatus.OK)
  @Post('admin/sign-in') // Changed from '/admin/sign-in' to 'admin/sign-in'
  adminSignIn(
    @Body() adminSignInDto: AdminSignInDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<ResponseFields> {
    return this.authService.adminSignIn(adminSignInDto, res);
  }

  @Post('admin/sign-out')
  async adminSignOut(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.adminSignOut(refreshToken, res);
  }

  @Get("admin/refresh")
  AdminRefresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ): Promise<ResponseFields> {
    return this.authService.AdminRefreshToken(req, res);
  }

}
