import { ApiError } from '../../domain/errors/ApiErrors';
import {
  FireBaseErrorAdapter,
  FireBaseErrorInterface,
} from '../models/errors/FirebaseError';

export class FireBaseError extends FireBaseErrorAdapter {
  constructor() {
    super();
  }

  adapterError(error: FireBaseErrorInterface): ApiError {
    const err = new ApiError(error?.code, error?.statusCode ?? 400);
    return err;
  }

  static init(): FireBaseError {
    const instance = new FireBaseError();
    return instance;
  }
}
