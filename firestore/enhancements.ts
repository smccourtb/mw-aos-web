import { db } from '@/firebase/serverFirebaseApps';
import { Enhancement } from '@/types/firestore';

export const getEnhancements = async () => {
  const response = await db.collection('enhancements').get();
  if (response.empty) {
    console.log('No matching documents.');
    return [];
  }
  const enhancements = response.docs.map((doc) => {
    return doc.data() as Enhancement[];
  });
  return enhancements[0];
};
