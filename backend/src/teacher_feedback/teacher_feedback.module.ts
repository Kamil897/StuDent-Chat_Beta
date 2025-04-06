import { Module } from '@nestjs/common';
import { TeacherFeedbackService } from './teacher_feedback.service';
import { TeacherFeedbackController } from './teacher_feedback.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [TeacherFeedbackController],
  providers: [
    {
      provide: TeacherFeedbackService,
      useFactory: async (prismaService: PrismaService) => {
        try {
          return new TeacherFeedbackService(prismaService);
        } catch (error) {
          console.error('Error creating TeacherFeedbackService:', error);
          throw error;
        }
      },
      inject: [PrismaService],
    },
  ],
})
export class TeacherFeedbackModule {}
