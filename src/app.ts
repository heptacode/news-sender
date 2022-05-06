import { scheduleJob } from 'node-schedule';
import dayjs from 'dayjs';
import { log } from '@/modules/logger';
import { accessSync, constants } from 'fs';

import getNews from '@/libs/getNews';
import login from '@/libs/login';
import checkAvailability from '@/libs/checkAvailability';
import writeLetter from '@/libs/writeLetter';

import { config } from '@/config';
import { NewsPayload } from '@/types';
import 'dotenv/config';
import { resolve } from 'path';

const REQUIRED_ENV = ['USER_ID', 'USER_PW'];

const init = () => {
  try {
    accessSync('.env', constants.F_OK);
    require(resolve(__dirname, '../soldiers.json'));

    const missingValues = REQUIRED_ENV.filter((key: string) => !process.env[key]?.length);
    if (missingValues.length) {
      return log.w(
        `README를 참고하여 .env 파일에 ${missingValues.join(', ')} 변수를 지정해주세요.`
      );
    }

    log.i('구동 완료. CRON 작업 대기중...');
  } catch (error) {
    log.w('README를 참고하여 .env 파일과 soldiers.json 파일을 생성해주세요.');
    process.exit();
  }
};

const execute = async () => {
  try {
    const newsList: NewsPayload[] = await getNews();

    await login();

    for (const soldier of config.soldiers) {
      // 시작, 종료날짜 검사
      if (dayjs().isBefore(dayjs(soldier.startDate)) || dayjs().isAfter(dayjs(soldier.endDate))) {
        log.w(`${soldier.name} > 전송 기간 X`);
        continue;
      }

      // 카페 개설여부 확인
      if (!(await checkAvailability(soldier))) {
        log.w(`${soldier.name} > 카페 개설 X`);
        continue;
      }

      for (const newsItem of newsList) {
        let content: string = ``;
        for (const news of newsItem.news) {
          content += `# ${news.title}\n${news.summary.slice(
            0,
            news.summary.indexOf('다.') + 1
          )}\n\n`;
        }

        await writeLetter({
          soldier: soldier,
          author: dayjs().format('YYYY-MM-DD'),
          title: newsItem.category.toUpperCase(),
          content: content,
        });

        log.s(`${soldier.name} > ${newsItem.category.toUpperCase()}`);
      }
    }
  } catch (error) {
    log.e(error);
  }
};

init();
scheduleJob('0 12 * * *', execute); // 매일 정오에 실행
