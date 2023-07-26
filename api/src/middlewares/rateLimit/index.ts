import { Request, Response, NextFunction } from 'express';
import { RedisRepository } from '../../repositories/RedisRepository';
import { clientRedis } from '../../lib/clients/redis';
import { RepositoryBaseCache } from '../../repositories/RepositoryBaseCache';
import { ServiceCacheRateLimit } from '../../services/cacheRateLimit';
import { ResponseAdapter } from '../../models/responseAdapter/responseHTTPAdapter';

export const middlewareRateLimit = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const { ip } = request;
  const redisRepository = new RedisRepository({
    client: clientRedis,
  });

  const repositoryBaseCache = new RepositoryBaseCache(redisRepository);

  const serviceCacheRateLimit = new ServiceCacheRateLimit(repositoryBaseCache);
  const responseRateLimit = await serviceCacheRateLimit.rateLimit(ip);

  if (responseRateLimit.code !== 200) {
    return response.status(responseRateLimit.code).send({
      error: responseRateLimit.message,
      success: false,
    } as ResponseAdapter);
  }

  return next();
};
