import express, { json } from 'express';
import cors from 'cors';
import { routes } from './routes';
import { middlewareRateLimit } from './middlewares/rateLimit';
import { middlewareAcceptOnlyGet } from './middlewares/acceptOnlyGET';

const app = express();

app.set('x-powered-by', false);

app.use(cors({ origin: true }));

app.use(middlewareAcceptOnlyGet);

app.use(middlewareRateLimit);

app.use(json());

app.use(routes);

export { app };
