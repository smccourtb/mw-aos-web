import React from 'react';
import NewGameForm from '@/components/forms/NewGameForm';
import { getUserArmies } from '@/firestore/user';
import { userSession } from '@/firebase/serverUserSessionUtils';
import { getBattlePacks } from '@/firestore/battlepacks';
import { redirect } from 'next/navigation';

export default async function PlayPage() {
  const user = await userSession();
  if (!user) {
    redirect('/login');
  }
  const userArmies = user ? await getUserArmies(user.uid) : [];
  const battlepacks = await getBattlePacks();
  return (
    <div className="mx-10 flex h-screen flex-col items-center">
      <NewGameForm
        userArmies={userArmies}
        battlepacks={battlepacks}
        userId={user!.uid}
      />
    </div>
  );
}
