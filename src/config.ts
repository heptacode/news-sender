import { Config } from '@/types';
import { resolve } from 'path';

export const config: Config = {
  iuid: '',
  requestConfig: {},
  baseUrl: 'https://www.thecamp.or.kr',
  categories: ['digital', 'society', 'politics', 'economic', 'foreign'],
  pageSize: 23,
  soldiers: require(resolve(__dirname, '../soldiers.json')),
};
