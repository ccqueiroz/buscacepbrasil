import { Router } from 'express';
import { controllerGetCep } from '../controllers/getCep';

const routes: Router = Router();

routes.get('/:cep', controllerGetCep);

export { routes };
