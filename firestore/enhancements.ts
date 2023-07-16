import { db } from '@/firebase/serverFirebaseApps';
import { Enhancements } from '@/firestore/types';

export const getEnhancements = async () => {
  const response = await db.collection('enhancements').get();
  if (response.empty) {
    console.log('No matching documents.');
    return [];
  }
  const enhancements = response.docs.map((doc) => {
    return doc.data() as Enhancements;
  });
  return enhancements[0];
};
