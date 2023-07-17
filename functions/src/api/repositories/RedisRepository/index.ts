import { RedisClientType } from 'redis';
import { ProviderRepositoryCache } from '../../models/repositories/ProviderRepositoryCache';
import { ResponseSetCacheAdapter } from '../../models/responseAdapter';

type Constructor = {
  client: RedisClientType;
};

export class RedisRepository extends ProviderRepositoryCache {
  private client: RedisClientType;
  constructor({ client }: Constructor) {
    super();
    this.client = client;
  }

  async getData<T>(key: string): Promise<T | null> {
    const response = await this.client.get(key);

    if (!response) return null;

    return JSON.parse(response);
  }

  async setData<T>(
    key: string,
    data: T,
    ttl: number,
  ): Promise<ResponseSetCacheAdapter> {
    const dataToStorage = JSON.stringify(data);

    try {
      await this.client.set(key, dataToStorage, { EX: ttl });
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  }
}
