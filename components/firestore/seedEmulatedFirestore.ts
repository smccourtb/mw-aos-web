import { db } from '@/firebase/serverFirebaseApps';

const bastiladon = require('../../mocks/units/bastiladon.json');
const carnosaur = require('../../mocks/units/saurusOldbloodOnCarnosaur.json');
const saurusWarriors = require('../../mocks/units/saurusWarrior.json');
const terradon = require('../../mocks/units/terradonRider.json');
const ripperdactyl = require('../../mocks/units/ripperdactylRider.json');
const starpriest = require('../../mocks/units/skinkStarpriest.json');
const slannStarmaster = require('../../mocks/units/slannStarmaster.json');

export const seedEmulatedFirestore = async () => {
  const collection = 'units';
  const batch = db.batch();
  const units = [
    bastiladon,
    carnosaur,
    saurusWarriors,
    terradon,
    ripperdactyl,
    starpriest,
    slannStarmaster,
  ];
  units.forEach((unit) => {
    const docRef = db.collection(collection).doc();
    batch.set(docRef, unit);
  });
  await batch.commit();
};
