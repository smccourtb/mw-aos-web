import React from 'react';
import NewGameForm from '@/components/forms/NewGameForm';
import { getUserArmies } from '@/firestore/user';
import { userSession } from '@/firebase/serverUserSessionUtils';

export default async function PlayPage() {
  const armyBuilderData = await getArmyBuilderData();
  const userData = await userSession();
  const userArmies = userData ? await getUserArmies(userData.uid) : [];
  return (
    <div className="mx-10 flex h-screen flex-col items-center">
      <NewGameForm armyBuilderData={armyBuilderData} userArmies={userArmies} />
    </div>
  );
}
