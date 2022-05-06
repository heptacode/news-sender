import { resolve } from 'path';
import { writeFileSync } from 'fs';
import { config } from '@/config';

/**
 * soldiers.json 업데이트
 */
export const updateSoldiers = () => {
  writeFileSync(resolve(__dirname, '../soldiers.json'), JSON.stringify(config.soldiers));
};
