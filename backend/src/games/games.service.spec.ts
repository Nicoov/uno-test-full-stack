/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { GamesService } from './games.service';
import { PrismaService } from '../prisma/prisma.service';

const mockGame = {
  id: 'game-1',
  userId: 'user-1',
  matches: 8,
  errors: 3,
  duration: 45,
  createdAt: new Date(),
};

describe('GamesService', () => {
  let service: GamesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GamesService,
        {
          provide: PrismaService,
          useValue: {
            game: {
              create: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<GamesService>(GamesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a game result', async () => {
    jest.spyOn(prisma.game, 'create').mockResolvedValue(mockGame);

    const result = await service.create({
      userId: 'user-1',
      matches: 8,
      errors: 3,
      duration: 45,
    });

    expect(result).toEqual(mockGame);
    expect(prisma.game.create).toHaveBeenCalledTimes(1);
  });

  it('should return game history by RUN', async () => {
    jest.spyOn(prisma.game, 'findMany').mockResolvedValue([mockGame]);

    const result = await service.getHistoryByRun('12345678-9');

    expect(result).toHaveLength(1);
    expect(prisma.game.findMany).toHaveBeenCalledWith({
      where: { user: { run: '12345678-9' } },
      orderBy: { createdAt: 'desc' },
      include: { user: false },
    });
  });

  it('should return empty array if no history', async () => {
    jest.spyOn(prisma.game, 'findMany').mockResolvedValue([]);

    const result = await service.getHistoryByRun('12345678-9');
    expect(result).toHaveLength(0);
  });
});