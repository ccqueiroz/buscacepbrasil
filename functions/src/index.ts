import admin, { ServiceAccount } from 'firebase-admin';
import express from 'express';
import cors from 'cors';
import serviceAccount from '../serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

const app = express();

app.use(cors({ origin: true }));

app.get('/', (request, response) => {
  console.log('request', request);
  return response.status(200).send('hello cambada');
});

export { app };
