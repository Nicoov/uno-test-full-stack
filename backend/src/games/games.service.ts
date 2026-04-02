import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGameDto } from './dto/create-game.dto';

@Injectable()
export class GamesService {
    constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateGameDto) {
    return await this.prisma.game.create({
      data: {
        userId: dto.userId,
        matches: dto.matches,
        errors: dto.errors,
        duration: dto.duration,
      },
    });
  }

  async getHistoryByRun(run: string) {
    return await this.prisma.game.findMany({
      where: {
        user: { run },
      },
      orderBy: { createdAt: 'desc' },
      include: { user: false },
    });
  }
}
