/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Game from "../../components/Game";
import { User } from "../../types";

export default function GamePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

   useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(stored));
    setReady(true);
  }, [router]);

  if (!ready) return null;

  return <Game user={user!} />;
}