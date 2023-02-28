import { Config } from '@/types';
import { readFileSync } from 'node:fs';
import { resolve } from 'path';

export const config: Config = {
  iuid: '',
  requestConfig: {},
  categories: ['digital', 'society', 'politics', 'economic', 'foreign'],
  pageSize: 24,
  soldiers: JSON.parse(readFileSync(resolve(process.cwd(), 'soldiers.json'), 'utf-8')),
};
