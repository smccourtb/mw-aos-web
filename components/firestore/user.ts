import { db } from '@/firebase/serverFirebaseApps';
import { PlayerArmy } from '@/components/firestore/types';

export const getUserArmies = async (user_id: string) => {
  const armiesRef = await db.collection(`users/${user_id}/armies`).get();
  if (armiesRef.empty) {
    return [];
  }
  return armiesRef.docs.map((doc) => doc.data()) as PlayerArmy[];
};
