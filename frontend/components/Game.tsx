"use client";

import { GameResult, User } from "../types";
import { useGame } from "../hooks/useGame";
import Board from "../components/Board";
import ScoreBoard from "../components/ScoreBoard";
import History from "./History";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getGameHistory } from "../service/api.mock";
import Modal from "./Modal";

export default function Game({ user }: { user: User }) {
  const router = useRouter();
  const { cards, matches, errors, duration, isFinished, isLoading, flipCard, resetGame } =
    useGame(user.id);
    
  const [history, setHistory] = useState<GameResult[]>([]);

   useEffect(() => {
    getGameHistory(user.run).then(setHistory);
  }, [user.run]);

  useEffect(() => {
    if (isFinished) {
      getGameHistory(user.run).then(setHistory);
    }
  }, [isFinished, user.run]);


  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };


  if (isLoading) {
    return (
      <main className="min-h-screen bg-orange-50 flex items-center justify-center">
        <p className="text-orange-400 font-medium text-lg animate-pulse">
          Cargando cartas...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-orange-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-orange-500">Memory Game 🐾</h1>
          <p className="text-sm text-gray-500">Hola, {user.name}</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          Salir
        </button>
      </div>
      <div className="mb-8">
        <ScoreBoard
          matches={matches}
          errors={errors}
          totalPairs={cards.length / 2}
        />
      </div>
      <Board cards={cards} onFlip={flipCard} />
      <History history={history} />

      {isFinished && (
       <Modal user={user} duration={duration} errors={errors} resetGame={resetGame} handleLogout={handleLogout} />
      )}
    </main>
  );
}
