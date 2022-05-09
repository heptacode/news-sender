import type { Config } from '@jest/types';
import { InitialOptionsTsJest } from 'ts-jest/dist/types';

export default (): InitialOptionsTsJest => {
  return {
    preset: 'ts-jest',
    verbose: true,
  };
};
