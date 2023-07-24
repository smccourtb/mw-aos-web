import { db } from '@/firebase/serverFirebaseApps';
import {
  EnhancementKeys,
  UniversalEnhancement,
} from '@/types/firestore/firestore';

export const getEnhancements = async () => {
  const response = await db.collection('enhancements').get();
  if (response.empty) {
    throw new Error('Something went wrong', {
      cause: 'No matching documents in enhancements collection.',
    });
  }
  const enhancements = {} as {
    [key in EnhancementKeys]: UniversalEnhancement[];
  };

  response.docs.forEach((doc) => {
    const key = doc.id as EnhancementKeys;
    enhancements[key] = Object.values(doc.data()) as UniversalEnhancement[];
  });
  return enhancements;
};
