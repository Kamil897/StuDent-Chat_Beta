import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { TeacherService } from 'src/teacher/teacher.service';
import { SuperAdminGuard } from 'src/common/guards/super-admin.guard';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAdminStrategy } from 'src/common/strategies/jwt.strategy';
import { JwtRefreshStrategy } from 'src/common/strategies/refresh-jwt.strategy';
import { AccessTokenStrategy } from 'src/common/strategies';
import { MailModule } from 'src/mail/mail.module';  // Добавь импорт MailModule
import { MailService } from 'src/mail/mail.service'; // Добавь MailService

@Module({
  imports: [
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forRoot({ isGlobal: true }),
    MailModule // Добавь MailModule в imports
  ],
  controllers: [AdminController],
  providers: [
    {
      provide: AdminService,
      useFactory: async (prismaService: PrismaService, jwtService: JwtService, mailService: MailService) => {
        try {
          return new AdminService(prismaService, jwtService);
        } catch (error) {
          console.error('Error creating AdminService:', error);
          throw error;
        }
      },
      inject: [PrismaService, JwtService, MailService], // Добавь MailService в inject
    },
    JwtService,
    JwtRefreshStrategy,
    TeacherService,
    JwtAdminStrategy,
    SuperAdminGuard,
    AccessTokenStrategy,
    MailService, // Добавь MailService в providers
  ],
  exports: [
    JwtService,
    AdminService,
    TeacherService,
    SuperAdminGuard,
    MailService // Добавь MailService в exports
  ]
})
export class AdminModule { }
