import { db } from '@/firebase/serverFirebaseApps';
import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from 'firebase-admin/auth';
const addPlayerArmy = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const cookie = req.headers.cookie?.split('session=')[1];
    const user = await getAuth().verifySessionCookie(cookie as string);

    if (!user) {
      return res.status(401).json({ message: 'unauthorized' });
    }

    const data = await JSON.parse(req.body);

    await db
      .collection('users')
      .doc(user.uid)
      .collection('games')
      .doc(data.id)
      .set(data);
    return res.status(200).json({ message: 'success' });
  } catch (error) {
    console.log('error', error);
    return res.status(500).json({ message: 'error' });
  }
};

export default addPlayerArmy;
