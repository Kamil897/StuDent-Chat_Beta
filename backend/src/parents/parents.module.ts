import { Module } from '@nestjs/common';
import { ParentsController } from './parents.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ParentsService } from './parents.service';

@Module({
  imports:[PrismaModule],
  controllers: [ParentsController],
  providers: [ParentsService, PrismaService],
})
export class ParentsModule {}
