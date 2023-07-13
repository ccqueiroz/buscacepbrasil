import { Request, Response } from 'express';
import { ServiceGetCep } from '../../services/getCep';
import { RepositoryBase } from '../../repositories/RepositoryBase';
import { FireBaseRepository } from '../../repositories/FirebaseRepository';
import { clientFirebase } from '../../lib/clients/firebase';
import { FireBaseError } from '../../errors/FireBaseError';

export const controllerGetCep = async (
  request: Request,
  response: Response,
) => {
  const { params } = request;
  const { cep } = params;
  const fireBaseRepository = new FireBaseRepository({
    client: clientFirebase,
    firebaseError: FireBaseError.init(),
  });

  const repositoryBase = new RepositoryBase(fireBaseRepository);
  const serviceGetCep = new ServiceGetCep(repositoryBase, cep);

  const responseCep = await serviceGetCep.getCep();

  return response.send(responseCep);
};
