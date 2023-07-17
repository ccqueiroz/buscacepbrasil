import express, { json } from 'express';
import cors from 'cors';
import { routes } from './routes';
import { middlewareRateLimit } from './middlewares/rateLimit';

const app = express();

app.set('x-powered-by', false);

app.use(cors({ origin: true }));

app.use(middlewareRateLimit);

app.use(json());

app.use(routes);

export { app };
