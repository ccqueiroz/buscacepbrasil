import { createClient } from 'redis';
import configRedis from './configRedis.json';

const clientRedis = createClient(configRedis);

export { clientRedis };
