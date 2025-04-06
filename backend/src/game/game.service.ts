import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GameService {
  constructor(private prisma: PrismaService) { }

  async addWinPoints(userId: number): Promise<number> {
    const points = Math.floor(Math.random() * (20 - 10 + 1)) + 10; // Случайные очки от 10 до 20
    const userStats = await this.prisma.userGameStats.upsert({
      where: { userId },
      update: { score: { increment: points } },
      create: { userId, score: points },
    });
    return userStats.score;
  }
}
