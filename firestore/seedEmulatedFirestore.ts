import { db } from '@/firebase/serverFirebaseApps';

import { seraphon } from '@/mocks/factions/seraphon';
import contestOfGenerals from '@/mocks/battlepacks/contestOfGenerals.json';
import enhancements from '@/mocks/enhancements/enhancements.json';
import heroPhase from '@/mocks/phases/hero.json';

export const seedEmulatedFirestore = async () => {
  const seedRef = await db.collection('seeded').get();
  if (!seedRef.empty) {
    return false;
  }
  await setUpFactions();
  await setUpPhases();
  await setUpBattlepacks();
  await setUpEnhancements();
  await db.collection('seeded').doc().set({ seeded: true });
  return true;
};

const setUpFactions = async () => {
  const collection = 'factions';
  const factions = [seraphon];
  const batch = db.batch();
  await factions.forEach((faction) => {
    const docRef = db.collection(collection).doc();
    const unitsRef = docRef.collection('units');
    const { units, ...rest } = faction;

    units.forEach((unit) => {
      const unitRef = unitsRef.doc();
      batch.set(unitRef, unit);
    });
    batch.set(docRef, { ref: `/factions/${docRef.id}`, ...rest });
  });

  await batch.commit();
  return;
};

const setUpPhases = async () => {
  const collection = 'phases';
  const batch = db.batch();
  const docRef = db.collection(collection).doc();
  batch.set(docRef, heroPhase);
  await batch.commit();
  return;
};

const setUpBattlepacks = async () => {
  const collection = 'battlepacks';
  const batch = db.batch();
  const docRef = db.collection(collection).doc();
  batch.set(docRef, { id: docRef.id, ...contestOfGenerals });
  await batch.commit();
  return;
};
const setUpEnhancements = async () => {
  const collection = 'enhancements';
  const batch = db.batch();
  const docRef = db.collection(collection).doc();
  batch.set(docRef, enhancements);
  await batch.commit();
  return;
};
