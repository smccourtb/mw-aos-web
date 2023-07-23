import { NextApiRequest, NextApiResponse } from 'next';
import { serverAuth } from '@/firebase/serverFirebaseApps';

const edge = (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const expiresIn = 60 * 60 * 24 * 14 * 1000; // 14 days in milliseconds;

  switch (method) {
    case 'POST':
      const { token } = req.headers;
      if (token) {
        return serverAuth
          .createSessionCookie(<string>token, { expiresIn })
          .then(
            (sessionCookie) => {
              // Set cookie policy for session cookie.
              res.setHeader('Access-Control-Expose-Headers', 'Set-Cookie');
              res.setHeader(
                'Set-Cookie',
                `session=${sessionCookie};Path=/;HttpOnly;Max-Age=${expiresIn};`,
              );
              res.status(200).json({ ok: true });
            },
            (_error) => {
              res.status(401).json({ error: 'Unauthorized Request' });
            },
          );
      } else {
        return res.status(400).json({ error: 'Invalid input' });
      }
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).json({ error: `Method ${method} Not Allowed` });
      return;
  }
};

export default edge;
