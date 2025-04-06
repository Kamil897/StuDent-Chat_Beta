import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminService } from 'src/admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service'; // Import MailService
import { MailModule } from 'src/mail/mail.module'; // Import MailModule

@Module({
  imports: [
    PrismaModule, 
    MailModule 
  ],
  controllers: [TeacherController],
  providers: [
    PrismaService,
    AdminService,
    JwtService,
    TeacherService,
  ],
  exports: [TeacherService], 
})
export class TeacherModule { }
