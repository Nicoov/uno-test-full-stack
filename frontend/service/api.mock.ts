import { User, Card, GameResult } from "../types";

const MOCK_IMAGES = [
  "https://placecats.com/200/200",
  "https://placecats.com/201/200",
  "https://placecats.com/202/200",
  "https://placecats.com/203/200",
  "https://placecats.com/204/200",
  "https://placecats.com/205/200",
  "https://placecats.com/206/200",
  "https://placecats.com/207/200",
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export const findOrCreateUser = async (
  name: string,
  run: string
): Promise<User> => {
  return { id: "mock-user-id", name, run };
};

export const fetchDeck = async (): Promise<Card[]> => {
  await new Promise((r) => setTimeout(r, 500)); // simula latencia
  const paired = [...MOCK_IMAGES, ...MOCK_IMAGES];
  return shuffle(paired).map((imageUrl, index) => ({
    id: index,
    imageUrl,
    isFlipped: false,
    isMatched: false,
  }));
};

export const saveGameResult = async (): Promise<void> => {
  console.log("Mock: game result saved");
};

export const getGameHistory = async (run: string): Promise<GameResult[]> => {
  return [
    { id: "1", matches: 8, errors: 3, duration: 45, createdAt: new Date().toISOString() },
    { id: "2", matches: 8, errors: 7, duration: 72, createdAt: new Date().toISOString() },
  ];
};