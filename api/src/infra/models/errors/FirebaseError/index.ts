import { ApiError } from '../../../../domain/errors/ApiErrors';

export type FireBaseErrorInterface = {
  code: string;
  toString: () => string;
  message: string;
};

export abstract class FireBaseErrorAdapter {
  abstract adapterError(error: FireBaseErrorInterface): ApiError;
}
