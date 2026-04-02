
interface ModalProps {
  user: { name: string };
  duration: number;
  errors: number;
  resetGame: () => void;
  handleLogout: () => void;
}


export default function Modal(user: ModalProps) {
    return(
         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
            <p className="text-4xl mb-3">🎉</p>
            <h2 className="text-2xl font-bold text-orange-500 mb-1">
              ¡Felicidades, {user.user.name}!
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Completaste el juego en {user.duration}s con {user.errors} errores
            </p>

            <div className="flex gap-3">
              <button
                onClick={user.resetGame}
                className="flex-1 bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-lg py-2 transition-colors"
              >
                Jugar de nuevo
              </button>
              <button
                onClick={user.handleLogout}
                className="flex-1 border border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold rounded-lg py-2 transition-colors"
              >
                Salir
              </button>
            </div>
          </div>
        </div>
    )
}