import { ResponseSetCacheAdapter } from '../../responseAdapter/responseSetCacheAdapter';

export abstract class ProviderRepositoryCache {
  abstract getData<T>(key: string): Promise<T | null>;
  abstract setData<T>(
    key: string,
    data: T,
    ttl: number,
  ): Promise<ResponseSetCacheAdapter>;
  abstract connectServer(): Promise<void>;
  abstract disconnectServer(): Promise<void>;
  abstract providerIsAlreadyConected(): boolean;
}
