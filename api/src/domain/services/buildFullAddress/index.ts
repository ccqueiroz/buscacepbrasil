/* eslint-disable prettier/prettier */
import { CepInterface } from '../../models/cep';
import { cepMask } from '../../utils/cepMask';

export class ServiceBuildFullAddress {
  private dataCep: CepInterface;

  constructor(dataCep: CepInterface) {
    this.dataCep = dataCep;
  }

  private normalizeLogradouro() {
    return this.dataCep.logradouro ? `${this.dataCep.logradouro}, ` : '';
  }

  private normalizeComplemento() {
    const complemento = this.dataCep?.complemento
      ? `${this.dataCep.complemento.replace(/^(- )/g, '')}, `
      : '';
    return complemento;
  }

  private normalizeBairro() {
    return this.dataCep?.bairro ? `${this.dataCep.bairro}, ` : '';
  }

  private normalizeCep() {
    return this.dataCep.cep ? `${cepMask(this.dataCep.cep)}, ` : '';
  }

  private normalizeCidadeEstado() {
    return `${this.dataCep.cidade ?? ''}${this.dataCep.cidade && this.dataCep.uf ? '/' : ''}${this.dataCep.uf ?? ''}`;
  }

  public execute() {
    return `${this.normalizeLogradouro()}${this.normalizeComplemento()
      }${this.normalizeBairro()}${this.normalizeCep()}${this.normalizeCidadeEstado()}`;
  }
}
