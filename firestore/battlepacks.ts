import { db } from '@/firebase/serverFirebaseApps';
import { Battlepack } from '@/types/firestore/firestore';

export const getBattlePacks = async () => {
  const response = await db.collection('battlepacks').get();
  if (response.empty) {
    console.log('No matching documents.');
    return [];
  }
  const battlepacks: Battlepack[] = [];
  response.forEach((doc) => {
    battlepacks.push(doc.data() as Battlepack);
  });

  return battlepacks;
};

export const getBattlePack = async (id: string | undefined) => {
  if (!id) return null;
  const response = await db.collection('battlepacks').doc(id).get();
  if (!response.exists) {
    throw new Error('No matching documents in battlepacks collection.');
  }
  return response.data() as Battlepack;
};
