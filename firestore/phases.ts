import { db } from '@/firebase/serverFirebaseApps';
import { Phase } from '@/firestore/types';

export const getPhases = async () => {
  const response = await db.collection('phases').get();
  if (response.empty) {
    console.log('No matching documents.');
    return [];
  }
  const phases: Phase[] = [];
  response.forEach((doc) => {
    phases.push({
      // @ts-ignore
      id: `/phases/${doc.id}`,
      ...(doc.data() as Phase),
    });
  });

  return phases;
};
