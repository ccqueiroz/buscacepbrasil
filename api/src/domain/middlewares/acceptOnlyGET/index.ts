import {
  RequestInfra,
  ResponseInfra,
  NextFunctionInfra,
} from '../../../infra/models/http';
import { ResponseAdapter } from '../../models/responseAdapter/responseHTTPAdapter';

export class MiddlewareAcceptOnlyGet {
  public async execute(
    request: RequestInfra,
    response: ResponseInfra,
    next: NextFunctionInfra,
  ) {
    const { method } = request;

    if (method.toLocaleLowerCase() !== 'get') {
      return response.status(405).send({
        error: 'Método não permitido.',
        success: false,
      } as ResponseAdapter);
    }

    return next();
  }
}
