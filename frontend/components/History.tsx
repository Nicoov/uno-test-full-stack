import { GameResult } from "../types";

interface GameHistoryProps {
  history: GameResult[];
}

export default function History({ history }: GameHistoryProps) {
  if (history.length === 0) {
    return (
      <p className="text-sm text-gray-400 text-center mt-8">
        No tienes partidas anteriores
      </p>
    );
  }

  return (
    <div className="w-full max-w-2xl mt-10">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">
        Historial de partidas
      </h2>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-orange-50 text-orange-500 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Aciertos</th>
              <th className="px-4 py-3">Errores</th>
              <th className="px-4 py-3">Duración</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {history.map((game) => (
              <tr key={game.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-500">
                  {new Date(game.createdAt).toLocaleDateString("es-CL")}
                </td>
                <td className="px-4 py-3 font-medium text-green-600">
                  {game.matches}
                </td>
                <td className="px-4 py-3 font-medium text-red-500">
                  {game.errors}
                </td>
                <td className="px-4 py-3 text-gray-500">{game.duration}s</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}