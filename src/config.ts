import { Config } from '@/types';
import { resolve } from 'path';

export const config: Config = {
  iuid: '',
  requestConfig: {},
  categories: ['digital', 'society', 'politics', 'economic', 'foreign'],
  pageSize: 24,
  soldiers: require(resolve(__dirname, '../soldiers.json')),
};
