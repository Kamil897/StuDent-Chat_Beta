import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';


@Module({
  imports: [PrismaModule],
  controllers: [GroupController],
  providers: [
    {
      provide: GroupService,
      useFactory: async (prismaService: PrismaService) => {
        try {
          return new GroupService(prismaService);
        } catch (error) {
          console.error('Error creating GroupService:', error);
          throw error;
        }
      },
      inject: [PrismaService],
    },
  ],
})
export class GroupModule {}
