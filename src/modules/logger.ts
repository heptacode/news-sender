import chalk from 'chalk';

export const log = {
  getTsp(): string {
    return new Date().toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
    });
  },
  // Error
  e(str: any): void {
    console.error(`[${this.getTsp()}] ${chalk.red(str)}`);
  },
  // Warning
  w(str: any): void {
    console.warn(`[${this.getTsp()}] ${chalk.yellow(str)}`);
  },
  // Info
  i(str: any): void {
    console.info(`[${this.getTsp()}] ${chalk.cyan(str)}`);
  },
  // Success
  s(str: any): void {
    console.log(`[${this.getTsp()}] ${chalk.green(str)}`);
  },
  // Verbose
  v(str: any): void {
    console.log(`[${this.getTsp()}] ${chalk.white(str)}`);
  },
  // Debug
  d(str: any): void {
    console.debug(`[${this.getTsp()}] ${chalk.blue(str)}`);
  },
};
