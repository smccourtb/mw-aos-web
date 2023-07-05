import React, { Suspense } from 'react';
import Firestore from '@/components/Firestore';
import { getKeywords } from '@/components/firestore/keywords';
import { getFactions } from '@/components/firestore/factions';

export default async function FirestorePage() {
  const [keywords, factions] = await Promise.all([
    getKeywords(),
    getFactions(),
  ]); // [getKeywords(), getFactions()

  const data = { keywords, factions };

  return (
    <div className="mx-10 flex flex-col">
      <Suspense>
        <Firestore data={data} />
      </Suspense>
    </div>
  );
}
