import firebase from 'firebase';
import { cepRegionsByFirstDigitCep } from '../../../domain/models/cepRegions/index';
import { CepInterface } from '../../../domain/models/cep';
import { ProviderRepository } from '../../../domain/models/repositories/ProviderRepository';
import {
  FireBaseErrorAdapter,
  FireBaseErrorInterface,
} from '../../models/errors/FirebaseError';

type Constructor = {
  client: firebase.app.App;
  firebaseError: FireBaseErrorAdapter;
};

export class FireBaseRepository extends ProviderRepository {
  private db: firebase.firestore.Firestore;
  private firebaseError: FireBaseErrorAdapter;

  constructor({ client, firebaseError }: Constructor) {
    super();
    this.db = firebase.firestore(client);
    this.firebaseError = firebaseError;
  }
  async getCep(
    region: (typeof cepRegionsByFirstDigitCep)[keyof typeof cepRegionsByFirstDigitCep],
    cep: string,
  ): Promise<CepInterface | Error> {
    try {
      const response = await this.db
        .collection(region)
        .doc(cep)
        .get()
        .then((snapshot) => {
          const data = snapshot.data();
          if (!data) {
            const error: FireBaseErrorInterface = {
              code: 'Dados não encontrados!',
              message: 'Dados não encontrados!',
            };
            return this.firebaseError.adapterError(error);
          }
          return { ...data } as CepInterface;
        })
        .catch((onrejected: FireBaseErrorInterface) =>
          this.firebaseError.adapterError(onrejected),
        );

      if (response instanceof Error) {
        throw new Error(response?.message);
      }
      return response;
    } catch (error) {
      return error as Error;
    }
  }
}
