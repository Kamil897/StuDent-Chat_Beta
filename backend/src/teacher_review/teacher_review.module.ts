import { TeacherReviewService } from './teacher_review.service';
import { TeacherReviewController } from './teacher_review.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  imports:[PrismaModule],
  controllers: [TeacherReviewController],
  providers: [TeacherReviewService],
})
export class TeacherReviewModule {}
