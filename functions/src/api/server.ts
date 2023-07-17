import express, { json } from 'express';
import cors from 'cors';
import { routes } from './routes';

const app = express();

app.set('x-powered-by', false);

app.use(cors({ origin: true }));

app.use(json());

app.use(routes);

export { app };
