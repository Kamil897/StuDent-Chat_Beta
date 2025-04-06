import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './src/admin/admin.module';
import { PrismaModule } from './src/prisma/prisma.module';
import { TeacherModule } from './src/teacher/teacher.module';
import { EventModule } from './src/event/event.module';
import { GroupModule } from './src/group/group.module';
import { TeacherReviewModule } from './src/teacher_review/teacher_review.module';
import { TeacherFeedbackModule } from './src/teacher_feedback/teacher_feedback.module';
import { ParentsModule } from './src/parents/parents.module';
import { NotificationsModule } from './src/notifications/notifications.module';
import { AttendanceModule } from './src/attendance/attendance.module';
import { PreschoolerModule } from './src/preschooler/preschooler.module';
import { AuthModule } from './src/auth/auth.module';
import { GameModule } from './src/game/game.module';
// import { AIController } from './src/controllers/ai.controller';  // Добавили AIController

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true
    }),
    AdminModule,
    PrismaModule,
    TeacherModule,
    EventModule,
    GroupModule,
    TeacherReviewModule,
    TeacherFeedbackModule,
    ParentsModule,
    NotificationsModule,
    // ParentAndPreschoolerModule,
    AttendanceModule,
    PreschoolerModule,
    // GroupPreschoolerModule,
    // EventRegistrationModule,
    AuthModule,
    GameModule
  ],
  // controllers: [AIController],  // Добавили AIController
  // providers: [AIService], // Добавили AIService
})
export class AppModule {}
