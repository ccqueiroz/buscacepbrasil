import { RedisClientType } from 'redis';
import { ProviderRepositoryCache } from '../../../domain/models/repositories/ProviderRepositoryCache';
import { ResponseSetCacheAdapter } from '../../../domain/models/responseAdapter/responseSetCacheAdapter';

type Constructor = {
  client: RedisClientType;
};

export class RedisRepository extends ProviderRepositoryCache {
  private client: RedisClientType;
  constructor({ client }: Constructor) {
    super();
    this.client = client;
  }

  async connectServer(): Promise<void> {
    await this.client.connect();
  }

  async disconnectServer(): Promise<void> {
    await this.client.disconnect();
  }

  providerIsAlreadyConected(): boolean {
    return this.client.isReady;
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
