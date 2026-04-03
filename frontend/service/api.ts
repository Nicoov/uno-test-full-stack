import axios from "axios";
import { User, Card, GameResult } from "../types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
});


export const findOrCreateUser = async (
  name: string,
  run: string
): Promise<User> => {
  const { data } = await api.post<User>("/users", { name, run });
  return data;
};


export const fetchDeck = async (): Promise<Card[]> => {
  const { data } = await api.get<Card[]>("/deck");
  return data;
};


export const saveGameResult = async (
  userId: string,
  matches: number,
  errors: number,
  duration: number
): Promise<void> => {
  await api.post("/games", { userId, matches, errors, duration });
};

export const getGameHistory = async (run: string): Promise<GameResult[]> => {
  const { data } = await api.get<GameResult[]>(`/games/history/`, {
    params: { run },
  });
  return data;
};