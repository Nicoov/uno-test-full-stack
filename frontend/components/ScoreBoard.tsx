interface ScoreBoardProps {
  matches: number;
  errors: number;
  totalPairs: number;
}

export default function ScoreBoard({
  matches,
  errors,
  totalPairs,
}: ScoreBoardProps) {
  return (
    <div className="flex gap-8 text-center">
      <div className="bg-green-50 border border-green-200 rounded-xl px-6 py-3">
        <p className="text-sm text-green-600 font-medium">Aciertos</p>
        <p className="text-2xl font-bold text-green-700">
          {matches}/{totalPairs}
        </p>
      </div>
      <div className="bg-red-50 border border-red-200 rounded-xl px-6 py-3">
        <p className="text-sm text-red-600 font-medium">Errores</p>
        <p className="text-2xl font-bold text-red-700">{errors}</p>
      </div>
    </div>
  );
}