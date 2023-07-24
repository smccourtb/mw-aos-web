import { db } from '@/firebase/serverFirebaseApps';

import { seraphon } from '@/mocks/factions/seraphon';
import contestOfGenerals from '@/mocks/battlepacks/contestOfGenerals.json';
import {
  artefacts,
  spellLores,
  triumphs,
  prayers,
  commandTraits,
} from '@/mocks/enhancements/enhancements';
import heroPhase from '@/mocks/phases/hero.json';
import movementPhase from '@/mocks/phases/movement.json';
import shootingPhase from '@/mocks/phases/shooting.json';
import chargePhase from '@/mocks/phases/charge.json';
import combatPhase from '@/mocks/phases/combat.json';
import battleshockPhase from '@/mocks/phases/battleshock.json';
import { UniversalEnhancement } from '@/types/firestore/firestore';

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
  const phases = [
    heroPhase,
    movementPhase,
    shootingPhase,
    chargePhase,
    combatPhase,
    battleshockPhase,
  ];
  const batch = db.batch();
  phases.forEach((phase) => {
    const docRef = db.collection(`phases`).doc(phase.name);
    batch.set(docRef, phase);
  });
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
  const enhancements = [
    artefacts,
    spellLores,
    triumphs,
    prayers,
    commandTraits,
  ];
  const batch = db.batch();
  enhancements.forEach((enhancement) => {
    const [key, value] = Object.entries(enhancement)[0] as [
      string,
      UniversalEnhancement[],
    ];
    const docRef = db.collection(collection).doc(key);
    batch.set(docRef, { ...value });
  });
  await batch.commit();
  return;
};
