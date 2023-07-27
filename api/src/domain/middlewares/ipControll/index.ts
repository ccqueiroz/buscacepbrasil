import {
  RequestInfra,
  ResponseInfra,
  NextFunctionInfra,
} from '../../../infra/models/http';
import { normalizeIp } from '../../utils/normalizeIp';

export class MiddlewareIpControll {
  public async execute(
    request: RequestInfra,
    response: ResponseInfra,
    next: NextFunctionInfra,
  ): Promise<void> {
    const { ip, headers } = request;
    const ipControll = headers['cf-connecting-ip'] ?? ip;

    request.ipControll = ipControll as string;

    response.set('ip-controll', normalizeIp(ipControll as string));

    return next();
  }
}
