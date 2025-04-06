import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { ParentAndPresschoolerController } from './parent_and_presschooler.controller';
import { ParentAndPreschoolerService } from './parent_and_presschooler.service';

@Module({
  controllers: [ParentAndPresschoolerController],
  providers: [ParentAndPreschoolerService, PrismaService],
})
export class ParentAndPreschoolModule {}
