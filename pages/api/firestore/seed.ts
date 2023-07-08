import { NextApiRequest, NextApiResponse } from 'next';
import { seedEmulatedFirestore } from '@/components/firestore/seedEmulatedFirestore';

const addFaction = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    await seedEmulatedFirestore();
    return res.status(200).json({ message: 'success' });
  } catch (error) {
    console.log('error', error);
    return res.status(500).json({ message: 'error' });
  }
};

export default addFaction;
