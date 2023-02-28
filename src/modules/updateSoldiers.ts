import { config } from '@/config';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

/**
 * soldiers.json 업데이트
 */
export function updateSoldiers() {
  writeFileSync(resolve(process.cwd(), 'soldiers.json'), JSON.stringify(config.soldiers));
}
