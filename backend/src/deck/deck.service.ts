import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Card } from './deck.interface';


interface ImageResponse {
  url: string;
  uuid: string;
  title: string;
  content_type: string;
}

@Injectable()
export class DeckService {
  constructor(private readonly config: ConfigService) {}

  private shuffle<T>(array: T[]): T[] {
    return [...array].sort(() => Math.random() - 0.5);
  }

  private async fetchImages(): Promise<string[]> {
    const url = this.config.get<string>('IMAGES_API_URL', '');
    const { data } = await axios.get<ImageResponse[]>(url);
    return data.map((img) => img.url);
  }

  async buildDeck(): Promise<Card[]> {
    const images = await this.fetchImages();
    const selected = this.shuffle<string>(images).slice(0, 8);
    const paired = [...selected, ...selected];
    return this.shuffle<string>(paired).map((imageUrl, index) => ({
      id: index,
      imageUrl,
      isFlipped: false,
      isMatched: false,
    }));
  }
}