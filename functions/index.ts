import * as functions from 'firebase-functions';
import { app } from '../api/index';

const api = functions.https.onRequest(app);

export { api };
