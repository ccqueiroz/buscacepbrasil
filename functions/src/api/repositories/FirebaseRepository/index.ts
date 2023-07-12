import firebase from 'firebase';
import { cepRegionsByFirstDigitCep } from '../../models/cepRegions/index';
import { CepInterface } from '../../models/cep';
import { RepositoryBase } from '../../models/repositories/RepositoryBase';
import {
  FireBaseErrorAdapter,
  FireBaseErrorInterface,
} from '../../models/errors/firebaseError';

type Constructor = {
  client: firebase.app.App;
  firebaseError: FireBaseErrorAdapter;
};

export class FireBaseRepository extends RepositoryBase {
  private db;
  private firebaseError;
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
          if (!data) throw new Error('Dados não encontrados!');
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
