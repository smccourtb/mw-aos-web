import React from 'react';
import ArmyBuilderForm from '@/components/forms/ArmyBuilderForm';
import { getBattlePack } from '@/firestore/battlepacks';
import { getFactions } from '@/firestore/factions';
import { getEnhancements } from '@/firestore/enhancements';
import { userSession } from '@/firebase/serverUserSessionUtils';
import { redirect } from 'next/navigation';

type BuildPageProps = {
  searchParams: { battlepack: string };
};
export default async function BuildPage({ searchParams }: BuildPageProps) {
  const user = await userSession();
  if (!user) {
    redirect('/login');
  }

  const [battlepack, factions, enhancements] = await Promise.all([
    await getBattlePack(searchParams.battlepack),
    await getFactions(),
    await getEnhancements(),
  ]);

  return (
    <div className="mx-10 flex h-screen flex-col items-center">
      <ArmyBuilderForm
        armies={factions}
        battlepack={battlepack}
        enhancements={enhancements}
        userId={user!.uid}
      />
    </div>
  );
}
