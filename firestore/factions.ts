import { db } from '@/firebase/serverFirebaseApps';
import { Unit } from '@/types/firestore/firestore';
import { Faction } from '@/types/firestore/factions';

export const getFactions = async () => {
  const response = await db.collection('factions').get();
  if (response.empty) {
    throw new Error('Something went wrong', {
      cause: 'No matching documents in factions collection.',
    });
  }
  const factions: Faction[] = [];
  for (const doc of response.docs) {
    const unitsRef = await db.collection(`factions/${doc.id}/units`).get();
    const units = unitsRef.docs.map((doc) => doc.data() as Unit);
    const faction = { ...doc.data(), units } as Faction;
    factions.push({ ...faction });
  }

  return factions;
};
