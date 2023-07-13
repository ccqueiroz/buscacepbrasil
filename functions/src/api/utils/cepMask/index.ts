export const cepMask = (cep: string) => {
  let index = 0;
  const cepFormat = '#####-###'
    .replace(/#/g, () => cep[index++])
    .replace(/undefined/g, '');

  return cepFormat;
};
