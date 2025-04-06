import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [EventController],
  providers: [
    {
      provide: EventService,
      useFactory: async (prismaService: PrismaService) => {
        try {
          return new EventService(prismaService);
        } catch (error) {
          console.error('Error creating EventService:', error);
          throw error;
        }
      },
      inject: [PrismaService],
    },
  ],
})
export class EventModule {}
