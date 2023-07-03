import { db } from '@/firebase/serverFirebaseApps';
import { NextApiRequest, NextApiResponse } from 'next';

const addFaction = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.collection('factions').add({ name: req.body });
    return res.status(200).json({ message: 'success' });
  } catch (error) {
    console.log('error', error);
    return res.status(500).json({ message: 'error' });
  }
};

export default addFaction;
