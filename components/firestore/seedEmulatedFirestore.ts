import { db } from '@/firebase/serverFirebaseApps';

import { seraphon } from '@/mocks/factions/seraphon';

export const seedEmulatedFirestore = async () => {
  const seedRef = await db.collection('seeded').get();
  if (!seedRef.empty) {
    return false;
  }
  await db.collection('seeded').doc().set({ seeded: true });
  return await setUpFactions();
};

const setUpFactions = async () => {
  const collection = 'factions';
  const factions = [seraphon];
  const batch = db.batch();
  await factions.forEach((faction) => {
    const docRef = db.collection(collection).doc();
    const unitsRef = docRef.collection('units');
    const { name, units } = faction;

    units.forEach((unit) => {
      const unitRef = unitsRef.doc();
      batch.set(unitRef, unit);
    });
    batch.set(docRef, { name });
  });

  await batch.commit();
};
