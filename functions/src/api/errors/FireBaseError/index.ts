import {
  FireBaseErrorAdapter,
  FireBaseErrorInterface,
} from '../../models/errors/firebaseError';
import { ApiError } from '../ApiErrors';

export class FireBaseError extends FireBaseErrorAdapter {
  constructor() {
    super();
  }

  adapterError(error: FireBaseErrorInterface): ApiError {
    const err: ApiError = {
      message: error?.code,
      statusCode: 400,
      name: error?.code,
    };
    return err;
  }

  static init(): FireBaseError {
    const instance = new FireBaseError();
    return instance;
  }
}
