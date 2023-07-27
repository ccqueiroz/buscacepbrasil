import { createClient, RedisClientType } from 'redis';
import configRedis from './configRedis.json';

const clientRedis: RedisClientType = createClient(configRedis);

export { clientRedis };
