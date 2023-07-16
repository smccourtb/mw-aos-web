import { db } from '@/firebase/serverFirebaseApps';
import type { Faction, Unit } from '@/firestore/types';

export const getFactions = async () => {
  const response = await db.collection('factions').get();
  if (response.empty) {
    console.log('No matching documents.');
    return [];
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
