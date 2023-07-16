import React from 'react';
import NewGameForm from '@/components/forms/NewGameForm';
import { getUserArmies } from '@/firestore/user';
import { userSession } from '@/firebase/serverUserSessionUtils';
import { getBattlePacks } from '@/firestore/battlepacks';

export default async function PlayPage() {
  const userData = await userSession();
  const userArmies = userData ? await getUserArmies(userData.uid) : [];
  const battlepacks = await getBattlePacks();
  return (
    <div className="mx-10 flex h-screen flex-col items-center">
      <NewGameForm userArmies={userArmies} battlepacks={battlepacks} />
    </div>
  );
}
