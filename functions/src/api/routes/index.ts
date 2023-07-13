import { Router } from 'express';
import { controllerGetCep } from '../controllers/getCep';

const routes: Router = Router();

routes.get('/getcep/:cep', controllerGetCep);

export { routes };
