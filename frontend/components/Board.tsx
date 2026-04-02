import { Card as CardType } from "../types";
import Card from "./Card";

interface BoardProps {
  cards: CardType[];
  onFlip: (id: number) => void;
}

export default function Board({ cards, onFlip }: BoardProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.id} card={card} onClick={onFlip} />
      ))}
    </div>
  );
}