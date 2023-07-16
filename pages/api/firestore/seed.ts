import { NextApiRequest, NextApiResponse } from 'next';
import { seedEmulatedFirestore } from '@/firestore/seedEmulatedFirestore';

const seed = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const seed = await seedEmulatedFirestore();
    if (!seed) {
      return res.status(200).json({ message: 'already seeded' });
    }
    return res.status(200).json({ message: 'success' });
  } catch (error) {
    console.log('error', error);
    return res.status(500).json({ message: 'error' });
  }
};

export default seed;
