import { db } from '@/firebase/serverFirebaseApps';

export const getKeywords = async () => {
  const response = await db.collection('keywords').get();
  if (response.empty) {
    console.log('No matching documents.');
    return [];
  }
  const keywords: { name: string; ref: string }[] = [];
  response.forEach((doc) => {
    const { name } = doc.data();
    keywords.push({ ref: `/keywords/${doc.id}`, name });
  });

  return keywords;
};
