import { db } from '@/firebase/serverFirebaseApps';
import { NextApiRequest, NextApiResponse } from 'next';

const deleteFaction = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const factionRef = req.body;
    await db.doc(factionRef).delete();
    return res.status(200).json({ message: 'success' });
  } catch (error) {
    console.log('error', error);
    return res.status(500).json({ message: 'error' });
  }
};

export default deleteFaction;
