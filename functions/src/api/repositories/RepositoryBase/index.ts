import { AbstractRepositoryBase } from '../../models/repositories/AbstractRepositoryBase';
import { ProviderRepository } from '../../models/repositories/ProviderRepository';

export class RepositoryBase extends AbstractRepositoryBase {
  constructor(provider: ProviderRepository) {
    super(provider);
  }
}
