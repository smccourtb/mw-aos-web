import { db } from '@/firebase/serverFirebaseApps';
import { FactionName, Unit } from '@/types/firestore/firestore';
import { Faction } from '@/types/firestore/factions';

export const getAllUnits = async () => {
  const factionsRef = db.collection('factions');
  const factionDocs = await factionsRef.get();
  const factions = factionDocs.docs.map((doc) => {
    return { ...doc.data(), ref: doc.id } as Faction;
  });
  const units: { [K in FactionName]: Unit[] } = {} as {
    [k in FactionName]: Unit[];
  };
  for (const faction of factions) {
    const unitDocs = await db.collection(`factions/${faction.ref}/units`).get();
    const factionName = faction.name as FactionName;
    units[factionName] = unitDocs.docs.map((doc) => {
      return { ...doc.data(), factionRef: faction.ref, ref: doc.id } as Unit;
    });
  }
  return units;
};
