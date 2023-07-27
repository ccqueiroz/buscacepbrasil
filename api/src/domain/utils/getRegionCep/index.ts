import { cepRegionsByFirstDigitCep } from '../../models/cepRegions';

export const getRegionCep = (
  cep: string,
):
  | (typeof cepRegionsByFirstDigitCep)[keyof typeof cepRegionsByFirstDigitCep]
  | undefined => {
  const regexCep = new RegExp(/^[0-9]{5}-[0-9]{3}$|^[0-9]{8}$/g);

  if (!regexCep.test(cep)) return undefined;

  const firstNumberCep: keyof typeof cepRegionsByFirstDigitCep = cep
    .replace(/\D/g, '')
    .charAt(0) as unknown as keyof typeof cepRegionsByFirstDigitCep;

  return cepRegionsByFirstDigitCep[firstNumberCep] ?? undefined;
};
