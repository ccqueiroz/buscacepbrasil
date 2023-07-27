import { AbstractRepositoryBaseCache } from '../../models/repositories/AbstractRepositoryBaseCache';
import { ProviderRepositoryCache } from '../../models/repositories/ProviderRepositoryCache';

export class RepositoryBaseCache extends AbstractRepositoryBaseCache {
  constructor(provider: ProviderRepositoryCache) {
    super(provider);
  }
}
