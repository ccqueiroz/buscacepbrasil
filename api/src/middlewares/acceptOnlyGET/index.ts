import { Request, Response, NextFunction } from 'express';
import { ResponseAdapter } from '../../models/responseAdapter/responseHTTPAdapter';

export const middlewareAcceptOnlyGet = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { method } = request;

  if (method.toLocaleLowerCase() !== 'get') {
    return response.status(405).send({
      error: 'Método não permitido.',
      success: false,
    } as ResponseAdapter);
  }

  return next();
};
