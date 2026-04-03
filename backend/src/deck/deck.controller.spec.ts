/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { DeckController } from './deck.controller';
import { DeckService } from './deck.service';

const mockDeck = [
  { id: 0, imageUrl: 'https://example.com/cat.jpg', isFlipped: false, isMatched: false },
  { id: 1, imageUrl: 'https://example.com/dog.jpg', isFlipped: false, isMatched: false },
  { id: 2, imageUrl: 'https://example.com/cat.jpg', isFlipped: false, isMatched: false },
  { id: 3, imageUrl: 'https://example.com/dog.jpg', isFlipped: false, isMatched: false },
];

describe('DeckController', () => {
  let controller: DeckController;
  let service: DeckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeckController],
      providers: [
        {
          provide: DeckService,
          useValue: {
            buildDeck: jest.fn().mockResolvedValue(mockDeck),
          },
        },
      ],
    }).compile();

    controller = module.get<DeckController>(DeckController);
    service = module.get<DeckService>(DeckService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return deck from service', async () => {
    const result = await controller.getDeck();
    expect(result).toEqual(mockDeck);
    expect(service.buildDeck).toHaveBeenCalledTimes(1);
  });

  it('should return 4 cards', async () => {
    const result = await controller.getDeck();
    expect(result).toHaveLength(4);
  });
});