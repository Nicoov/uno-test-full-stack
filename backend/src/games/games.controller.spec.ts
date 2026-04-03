/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

const mockGame = {
  id: 'game-1',
  userId: 'user-1',
  matches: 8,
  errors: 3,
  duration: 45,
  createdAt: new Date(),
};

describe('GamesController', () => {
  let controller: GamesController;
  let service: GamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamesController],
      providers: [
        {
          provide: GamesService,
          useValue: {
            create: jest.fn(),
            getHistoryByRun: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<GamesController>(GamesController);
    service = module.get<GamesService>(GamesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a game result', async () => {
    jest.spyOn(service, 'create').mockResolvedValue(mockGame);

    const result = await controller.create({
      userId: 'user-1',
      matches: 8,
      errors: 3,
      duration: 45,
    });

    expect(result).toEqual(mockGame);
    expect(service.create).toHaveBeenCalledTimes(1);
  });

  it('should return game history by RUN', async () => {
    jest.spyOn(service, 'getHistoryByRun').mockResolvedValue([mockGame]);

    const result = await controller.getHistory('12345678-9');

    expect(result).toHaveLength(1);
    expect(service.getHistoryByRun).toHaveBeenCalledWith('12345678-9');
  });

  it('should return empty array if no history', async () => {
    jest.spyOn(service, 'getHistoryByRun').mockResolvedValue([]);

    const result = await controller.getHistory('12345678-9');
    expect(result).toHaveLength(0);
  });
});