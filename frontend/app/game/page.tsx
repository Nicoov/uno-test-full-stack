"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Game from "../../components/Game";

export default function GamePage() {
  const router = useRouter();

  const user = useMemo(() => {
    if (typeof window === "undefined") return null;
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  }, []);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return <Game user={user} />;
}