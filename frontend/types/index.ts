export interface User {
  id: string;
  name: string;
  run: string;
}

export interface Card {
  id: number;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameResult {
  id: string;
  matches: number;
  errors: number;
  duration: number;
  createdAt: string;
}