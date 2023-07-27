import * as functions from 'firebase-functions';
import { FireBaseRepository } from '../api/src/infra/repositories/FirebaseRepository/index';
import { RedisRepository } from '../api/src/infra/repositories/RedisRepository';
import { FireBaseError } from '../api/src/infra/errors/FireBaseError';
import { clientFirebase } from '../api/src/infra//lib/clients/firebase';
import { clientRedis } from '../api/src/infra//lib/clients/redis';

import { BootStrap } from '../api/index';

const fireBaseRepository = new FireBaseRepository({
  client: clientFirebase,
  firebaseError: FireBaseError.init(),
});

const redisRepository = new RedisRepository({
  client: clientRedis,
});

const app = new BootStrap({
  providerRepository: fireBaseRepository,
  providerRepositoryCache: redisRepository,
});

const api = functions.https.onRequest(app.getInstance());

export { api };
