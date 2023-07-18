import { db } from '@/firebase/serverFirebaseApps';
import { Battlepack } from '@/firestore/types';

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
    console.log('No matching documents.');
    return null;
  }
  return response.data() as Battlepack;
};
