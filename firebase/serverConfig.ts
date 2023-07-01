const adminConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: JSON.parse(process.env.FIREBASE_PRIVATE_KEY as string),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

export default adminConfig;
