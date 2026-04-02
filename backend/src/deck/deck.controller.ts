import { Controller, Get } from '@nestjs/common';
import { DeckService } from './deck.service';
import { Card } from './deck.interface';

@Controller('deck')
export class DeckController {
  constructor(private readonly deckService: DeckService) {}

  @Get()
  async getDeck(): Promise<Card[]> {
    return this.deckService.buildDeck();
  }
}