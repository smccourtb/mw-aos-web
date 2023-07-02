import { db } from '@/firebase/serverFirebaseApps';
import { NextApiRequest, NextApiResponse } from 'next';

const deleteKeyword = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const keywordRef = req.body;
    await db.doc(keywordRef).delete();
    return res.status(200).json({ message: 'success' });
  } catch (error) {
    console.log('error', error);
    return res.status(500).json({ message: 'error' });
  }
};

export default deleteKeyword;
