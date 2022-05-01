import { resolve } from 'path';
import { writeFileSync } from 'fs';
import { config } from '@/config';

export const updateSoldiers = () => {
  writeFileSync(resolve(__dirname, '../soldiers.json'), JSON.stringify(config.soldiers));
};
