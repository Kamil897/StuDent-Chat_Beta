import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EventRegistrationService } from './event_regestration.service';
import { EventRegistrationController } from './event_regestration.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [EventRegistrationController],
  providers: [
    {
      provide: EventRegistrationService,
      useFactory: async (prismaService: PrismaService) => {
        try {
          return new EventRegistrationService(prismaService);
        } catch (error) {
          console.error('Error creating EventRegistrationService:', error);
          throw error;
        }
      },
      inject: [PrismaService],
    },
  ],
})
export class EventRegestrationModule {}
