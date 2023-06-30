import * as functions from 'firebase-functions';
import { app } from './src';

const api = functions.https.onRequest(app);

export { api };
