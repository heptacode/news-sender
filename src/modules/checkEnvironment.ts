import { log } from '@/modules/logger';
import { accessSync, constants, readFileSync } from 'node:fs';
import { resolve } from 'path';

const REQUIRED_ENV = ['USER_ID', 'USER_PW'];

export function checkEnvironment() {
  try {
    accessSync('.env', constants.F_OK);
    JSON.parse(readFileSync(resolve(process.cwd(), 'soldiers.json'), 'utf-8'));

    const missingValues = REQUIRED_ENV.filter((key: string) => !process.env[key]?.length);
    if (missingValues.length) {
      return log.w(
        `README를 참고하여 .env 파일에 ${missingValues.join(', ')} 변수를 지정해주세요.`
      );
    }
  } catch (error) {
    log.w('README를 참고하여 .env 파일과 soldiers.json 파일을 생성해주세요.');
    process.exit();
  }
}
