import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdminDto, UpdateAdminDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Admin } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) { }

  async create(createAdminDto: CreateAdminDto) {
    const hashed_password = await bcrypt.hash(createAdminDto.password, 10);
    const data = {
      ...createAdminDto,
      hashed_password,
      username: createAdminDto.username,
      password: createAdminDto.password,
      confirm_password: createAdminDto.confirm_password,
    };

    try {
      return await this.prismaService.admin.create({
        data,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new BadRequestException('Unique constraint failed on the fields: (`id`)');
      }
      throw error;
    }
  }

  findAll() {
    return this.prismaService.admin.findMany();
  }

  findOne(id: number) {
    if (!id || isNaN(id)) {
      throw new BadRequestException("Invalid admin ID");
    }

    return this.prismaService.admin.findUnique({
      where: { id: Number(id) },
    });
  }



  findByEmail(email: string) {
    return this.prismaService.admin.findUnique({ where: { email } });
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.prismaService.admin.update({
      where: { id },
      data: updateAdminDto,
    });
  }

  remove(id: number) {
    return this.prismaService.admin.delete({ where: { id } });
  }

  async getToken(admin: Admin) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
      email: admin.email,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async updateRefreshToken(id: number, hashed_refreshToken: string | null) {
    console.log("Updating admin refresh token:", { id, hashed_refreshToken });

    const updatedAdmin = await this.prismaService.admin.update({
      where: { id },
      data: { hashed_refreshToken },
    });

    console.log("Updated admin:", updatedAdmin);
    return updatedAdmin;
  }
  async findByRefreshToken(refreshToken: string) {
    const admins = await this.prismaService.admin.findMany({
      select: { id: true, hashed_refreshToken: true }
    });

    for (const admin of admins) {
      if (admin.hashed_refreshToken && (await bcrypt.compare(refreshToken, admin.hashed_refreshToken))) {
        return admin;
      }
    }
    return null;
  }
}
