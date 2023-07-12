import React from 'react';
import { userSession } from '@/firebase/serverUserSessionUtils';
import { getUserGame } from '@/components/firestore/user';

export default async function Page({ params }: { params: { id: string } }) {
  const user = await userSession();
  const gameData = user ? await getUserGame(user?.uid, params.id) : [];
  console.log('gameData', gameData);

  return (
    <div className="mx-10 flex h-screen flex-col items-center">
      return <div>GameId: {params.id}</div>
    </div>
  );
}
