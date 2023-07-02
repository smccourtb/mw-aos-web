import { db } from '@/firebase/serverFirebaseApps';
import { FirestoreBaseData } from '@/components/firestore/types';

export const getFactions = async () => {
  const response = await db.collection('factions').get();
  if (response.empty) {
    console.log('No matching documents.');
    return null;
  }
  const factions: FirestoreBaseData[] = [];
  response.forEach((doc) => {
    const { name } = doc.data();
    factions.push({ ref: `/factions/${doc.id}`, name });
  });

  const names = factions.map((faction) => faction.name);
  return { names, factions };
};
