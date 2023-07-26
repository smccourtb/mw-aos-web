import { db } from '@/firebase/serverFirebaseApps';
import { PlayerArmy } from '@/firestore/types';
import { FirestoreGame } from '@/types/firestore/firestore';

export const getUserArmies = async (user_id: string | undefined) => {
  const armiesRef = await db.collection(`users/${user_id}/armies`).get();
  if (armiesRef.empty) {
    return [];
  }
  return armiesRef.docs.map((doc) => doc.data()) as PlayerArmy[];
};

export const getUserGame = async (
  user_id: string | undefined,
  gameId: string,
) => {
  if (!user_id) return null;
  const gameRef = await db
    .collection(`users/${user_id}/games`)
    .doc(gameId)
    .get();
  if (!gameRef.exists) {
    return null;
  }
  return gameRef.data() as FirestoreGame;
};
