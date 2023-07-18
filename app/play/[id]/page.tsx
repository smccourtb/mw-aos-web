import React from 'react';
import Game from '@/components/Game';
import { getUserGame } from '@/firestore/user';
import { userSession } from '@/firebase/serverUserSessionUtils';
import { getPhases } from '@/firestore/phases';

type GamePageProps = {
  params: { id: string };
};
export default async function PlayGamePage({ params }: GamePageProps) {
  const user = await userSession();

  const gameData = await getUserGame(user?.uid, params.id);

  const phases = await getPhases();
  return (
    <div className="mx-10 flex h-screen flex-col items-center">
      <Game gameData={gameData} phaseData={phases} />
    </div>
  );
}
