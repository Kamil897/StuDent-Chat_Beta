import { Module } from '@nestjs/common';
import { NotificationService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [NotificationsController],
  providers: [
    {
      provide: NotificationService,
      useFactory: async (prismaService: PrismaService) => {
        try {
          return new NotificationService(prismaService);
        } catch (error) {
          console.error('Error creating NotificationService:', error);
          throw error;
        }
      },
      inject: [PrismaService],
    },
  ],
})
export class NotificationsModule {}
