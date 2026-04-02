import Image from "next/image";
import { Card as CardType } from "../types";

interface CardProps {
  card: CardType;
  onClick: (id: number) => void;
}

export default function Card({ card, onClick }: CardProps) {
  const isVisible = card.isFlipped || card.isMatched;

  return (
    <div
      onClick={() => onClick(card.id)}
      className={`
        relative w-24 h-24 cursor-pointer rounded-xl
        transition-transform duration-500
        ${card.isMatched ? "opacity-60 cursor-default" : "hover:scale-105"}
      `}
      style={{ perspective: "600px" }}
    >
      <div
        className="w-full h-full relative transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: isVisible ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className="absolute inset-0 rounded-xl bg-orange-400 flex items-center justify-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-white text-3xl">🐾</span>
        </div>
        <div
          className="absolute inset-0 rounded-xl bg-white border-2 border-orange-200 overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Image
            src={card.imageUrl}
            alt="card"
            width={100}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}