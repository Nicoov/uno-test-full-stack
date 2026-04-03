"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { findOrCreateUser } from "../../service/api";
import { validateRun } from "../../utils/validateRun";


export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [run, setRun] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !run.trim()) {
      setError("Por favor completa todos los campos");
      return;
    }

    if (!validateRun(run.trim())) {
      setError("RUN inválido. Debe tener el formato 12345678-9");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const user = await findOrCreateUser(name.trim(), run.trim());
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/game");
    } catch (e) {
       const error = e as { response?: { data?: { message?: string } } };
       setError(error?.response?.data?.message || "Ocurrió un error, intenta nuevamente");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-orange-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-orange-500 mb-1 text-center">
          Memory Game 
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Ingresa tus datos para comenzar
        </p>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none text-black focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              RUN
            </label>
            <input
              type="text"
              value={run}
              onChange={(e) => setRun(e.target.value)}
              placeholder="12345678-9"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none text-black focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-lg py-2 transition-colors disabled:opacity-50"
          >
            {isLoading ? "Cargando..." : "Jugar"}
          </button>
        </div>
      </div>
    </main>
  );
}