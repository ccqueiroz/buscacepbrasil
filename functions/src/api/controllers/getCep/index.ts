import { Request, Response } from 'express';

export const controllerGetCep = async (
  request: Request,
  response: Response,
) => {
  const { params, ip } = request;
  const { cep } = params;

  return response.send({ cep, ip });
};
