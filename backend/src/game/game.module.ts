import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { GameController } from '../game/game.controller';
import { GameService } from '../game/game.service';

@Module({
  imports: [PrismaModule],
  controllers: [GameController],
  providers: [
    {
      provide: GameService,
      useFactory: async (prismaService: PrismaService) => {
        try {
          return new GameService(prismaService);
        } catch (error) {
          console.error('Error creating GameService:', error);
          throw error;
        }
      },
      inject: [PrismaService],
    },
  ],
})
export class GameModule {}
