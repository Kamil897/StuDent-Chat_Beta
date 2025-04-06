import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TeacherModule } from './teacher/teacher.module';
import { EventModule } from './event/event.module';
import { GroupModule } from './group/group.module';
import { TeacherReviewModule } from './teacher_review/teacher_review.module';
import { TeacherFeedbackModule } from './teacher_feedback/teacher_feedback.module';
import { ParentsModule } from './parents/parents.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AttendanceModule } from './attendance/attendance.module';
import { PreschoolerModule } from './preschooler/preschooler.module';
import { GruopPreschoolerModule } from './gruop_preschooler/gruop_preschooler.module';
import { EventRegestrationModule } from './event_regestration/event_regestration.module';
import { AuthModule } from './auth/auth.module';
import { ParentAndPreschoolModule } from './parent_and_presschooler/parent_and_presschooler.module';
import { GameModule } from './game/game.module';

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
    ParentAndPreschoolModule,
    AttendanceModule,
    PreschoolerModule,
    GruopPreschoolerModule,
    EventRegestrationModule,
    AuthModule,
    GameModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
