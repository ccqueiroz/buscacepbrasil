export const cepRegionsByFirstDigitCep = {
  0: 'regiao-1',
  1: 'regiao-1',
  2: 'regiao-2',
  3: 'regiao-3',
  4: 'regiao-4',
  5: 'regiao-5',
  6: 'regiao-6',
  7: 'regiao-7',
  8: 'regiao-8',
  9: 'regiao-9',
} as const;

export const cepRegions = {
  'regiao-1': [
    'Região Metropolitana de São Paulo (SP)',
    'Litoral e interior de SP',
  ],
  'regiao-2': ['Rio de Janeiro', 'Espírito Santo'],
  'regiao-3': ['Minas Gerais'],
  'regiao-4': ['Bahia', 'Sergipe'],
  'regiao-5': ['Pernambuco', 'Alagoas', 'Paraíba', 'Rio Grande do Norte'],
  'regiao-6': [
    'Ceará',
    'Piauí',
    'Maranhão',
    'Pará',
    'Amapá',
    'Amazonas',
    'Roraima',
    'Acre',
  ],
  'regiao-7': [
    'Distrito Federal',
    'Goiás',
    'Rondônia',
    'Tocantins',
    'Mato Grosso',
    'Mato Grosso do Sul',
  ],
  'regiao-8': ['Paraná', 'Santa Catarina'],
  'regiao-9': ['Rio Grande do Sul'],
} as const;
