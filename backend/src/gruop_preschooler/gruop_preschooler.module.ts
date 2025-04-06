import { Module } from '@nestjs/common';
import { GruopPreschoolerController } from './gruop_preschooler.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GroupService } from 'src/group/group.service';
import { GroupPreschoolerService } from './gruop_preschooler.service';

@Module({
  imports: [PrismaModule],
  controllers: [GruopPreschoolerController],
  providers: [GroupService, GroupPreschoolerService],
})
export class GruopPreschoolerModule {}
