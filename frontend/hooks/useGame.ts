import { useState, useEffect, useCallback, useRef } from "react";
import { Card } from "../types";
import { fetchDeck, saveGameResult } from "../service/api.mock";
// import { fetchDeck, saveGameResult } from "../service/api";

const FLIP_DELAY_MS = 1000;

interface UseGameReturn {
  cards: Card[];
  matches: number;
  errors: number;
  duration: number;
  isFinished: boolean;
  isLoading: boolean;
  flipCard: (id: number) => void;
  resetGame: () => void;
}

export function useGame(userId: string): UseGameReturn {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);
  const [errors, setErrors] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [duration, setDuration] = useState(0);
  const isChecking = useRef(false);

  const loadDeck = useCallback(async () => {
    setIsLoading(true);
    try {
      const deck = await fetchDeck();
      setCards(deck);
      setStartTime(Date.now());
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDeck();
  }, [loadDeck]);

  useEffect(() => {
    if (cards.length === 0) return;
    const totalPairs = cards.length / 2;
    if (matches === totalPairs) {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setDuration(elapsed);
      setIsFinished(true);
      saveGameResult(userId, matches, errors, elapsed);
    }
  }, [matches, cards.length, userId, errors, startTime]);

  const flipCard = useCallback(
    (id: number) => {
      if (isChecking.current) return;

      const card = cards.find((c) => c.id === id);
      if (!card || card.isFlipped || card.isMatched) return;

      setCards((prev) =>
        prev.map((c) => (c.id === id ? { ...c, isFlipped: true } : c))
      );

      setFlippedIds((prev) => {
        const next = [...prev, id];

        if (next.length === 2) {
          isChecking.current = true;
          const [firstId, secondId] = next;
          const first = cards.find((c) => c.id === firstId)!;
          const second = cards.find((c) => c.id === secondId)!;

          if (first.imageUrl === second.imageUrl) {
            setTimeout(() => {
              setCards((prev) =>
                prev.map((c) =>
                  c.id === firstId || c.id === secondId
                    ? { ...c, isMatched: true }
                    : c
                )
              );
              setMatches((m) => m + 1);
              isChecking.current = false;
            }, FLIP_DELAY_MS);
          } else {
            setTimeout(() => {
              setCards((prev) =>
                prev.map((c) =>
                  c.id === firstId || c.id === secondId
                    ? { ...c, isFlipped: false }
                    : c
                )
              );
              setErrors((e) => e + 1);
              isChecking.current = false;
            }, FLIP_DELAY_MS);
          }

          return [];
        }

        return next;
      });
    },
    [cards]
  );

  const resetGame = useCallback(() => {
    setFlippedIds([]);
    setMatches(0);
    setErrors(0);
    setIsFinished(false);
    setDuration(0);
    isChecking.current = false;
    loadDeck();
  }, [loadDeck]);

  return {
    cards,
    matches,
    errors,
    duration,
    isFinished,
    isLoading,
    flipCard,
    resetGame,
  };
}