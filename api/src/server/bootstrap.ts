import express, {
  json,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import cors from 'cors';
import { RoutesApp } from '../domain/routes';
import { AbstractRepositoryBase } from '../domain/models/repositories/AbstractRepositoryBase';
import { AbstractRepositoryBaseCache } from '../domain/models/repositories/AbstractRepositoryBaseCache';
import { ProviderRepository } from '../domain/models/repositories/ProviderRepository';
import { ProviderRepositoryCache } from '../domain/models/repositories/ProviderRepositoryCache';
import { RepositoryBase } from '../domain/repositories/RepositoryBase';
import { RepositoryBaseCache } from '../domain/repositories/RepositoryBaseCache';
import { MiddlewareRateLimit } from '../domain/middlewares/rateLimit';
import { MiddlewareAcceptOnlyGet } from '../domain/middlewares/acceptOnlyGET';

type Constructor = {
  providerRepository: ProviderRepository;
  providerRepositoryCache: ProviderRepositoryCache;
};

export class BootStrap {
  private app = express();
  private routes: Router;
  private baseRepository: AbstractRepositoryBase;
  private baseCacheRepository: AbstractRepositoryBaseCache;

  constructor({ providerRepository, providerRepositoryCache }: Constructor) {
    this.baseRepository = new RepositoryBase(providerRepository);
    this.baseCacheRepository = new RepositoryBaseCache(providerRepositoryCache);
    this.routes = new RoutesApp({
      routes: Router(),
      baseRepository: this.baseRepository,
    }).init();
  }

  private setupMiddlewares() {
    const middlewareAcceptOnlyGet = new MiddlewareAcceptOnlyGet();
    const middlewareRateLimit = new MiddlewareRateLimit(
      this.baseCacheRepository,
    );

    this.app.use(
      async (request: Request, response: Response, next: NextFunction) =>
        await middlewareAcceptOnlyGet.execute(request, response, next),
    );

    this.app.use(
      async (request: Request, response: Response, next: NextFunction) =>
        await middlewareRateLimit.execute(request, response, next),
    );
  }

  private setupRoutes() {
    this.app.use(this.routes);
  }

  private setupBootStrap() {
    this.app.set('x-powered-by', false);
    this.app.use(cors({ origin: true }));
    this.app.use(json());
    this.setupMiddlewares();
    this.setupRoutes();
  }

  public getInstance() {
    this.setupBootStrap();
    return this.app;
  }

  public listen(port = 3000, cb?: () => void) {
    const app = this.getInstance();
    app.listen(port, cb);
  }
}
