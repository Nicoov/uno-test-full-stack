/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { DeckService } from './deck.service';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockImages = [
  { url: 'https://example.com/cat.jpg', uuid: '1', title: 'cat', content_type: 'image/jpeg' },
  { url: 'https://example.com/dog.jpg', uuid: '2', title: 'dog', content_type: 'image/jpeg' },
  { url: 'https://example.com/bird.jpg', uuid: '3', title: 'bird', content_type: 'image/jpeg' },
  { url: 'https://example.com/fish.jpg', uuid: '4', title: 'fish', content_type: 'image/jpeg' },
  { url: 'https://example.com/lion.jpg', uuid: '5', title: 'lion', content_type: 'image/jpeg' },
  { url: 'https://example.com/tiger.jpg', uuid: '6', title: 'tiger', content_type: 'image/jpeg' },
  { url: 'https://example.com/bear.jpg', uuid: '7', title: 'bear', content_type: 'image/jpeg' },
  { url: 'https://example.com/wolf.jpg', uuid: '8', title: 'wolf', content_type: 'image/jpeg' },
  { url: 'https://example.com/fox.jpg', uuid: '9', title: 'fox', content_type: 'image/jpeg' },
  { url: 'https://example.com/owl.jpg', uuid: '10', title: 'owl', content_type: 'image/jpeg' },
];

describe('DeckService', () => {
  let service: DeckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeckService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('https://mock-api.com/images'),
          },
        },
      ],
    }).compile();

    service = module.get<DeckService>(DeckService);
    mockedAxios.get.mockResolvedValue({ data: mockImages });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return 16 cards', async () => {
    const deck = await service.buildDeck();
    expect(deck).toHaveLength(16);
  });

  it('should have every image appear exactly twice', async () => {
    const deck = await service.buildDeck();
    const urlCounts = deck.reduce<Record<string, number>>((acc, card) => {
      acc[card.imageUrl] = (acc[card.imageUrl] || 0) + 1;
      return acc;
    }, {});
    Object.values(urlCounts).forEach((count) => {
      expect(count).toBe(2);
    });
  });

  it('should return cards with correct shape', async () => {
    const deck = await service.buildDeck();
    deck.forEach((card) => {
      expect(card).toHaveProperty('id');
      expect(card).toHaveProperty('imageUrl');
      expect(card).toHaveProperty('isFlipped', false);
      expect(card).toHaveProperty('isMatched', false);
    });
  });

  it('should select only 8 unique images', async () => {
    const deck = await service.buildDeck();
    const uniqueUrls = new Set(deck.map((c) => c.imageUrl));
    expect(uniqueUrls.size).toBe(8);
  });
});