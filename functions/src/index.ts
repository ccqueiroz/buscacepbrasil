import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';
import serviceAccount from '../serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

app.use(cors({ origin: true }));
const db = admin.firestore();

exports.app = functions.https.onRequest(app);
