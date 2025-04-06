import { Module } from '@nestjs/common';
import { PreschoolerService } from './preschooler.service';
import { PreschoolerController } from './preschooler.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [PreschoolerController],
  providers: [
    {
      provide: PreschoolerService,
      useFactory: async (prismaService: PrismaService) => {
        try {
          return new PreschoolerService(prismaService);
        } catch (error) {
          console.error('Error creating PreschoolerService:', error);
          throw error;
        }
      },
      inject: [PrismaService],
    },
  ],
})
export class PreschoolerModule {}
