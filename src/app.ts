import { scheduleJob } from 'node-schedule';
import dayjs from 'dayjs';
import { log } from '@/modules/logger';
import { checkEnvironment } from '@/modules/checkEnvironment';
import { getTargetSoldiers } from '@/modules/getTargetSoldiers';
import { config } from '@/config';
import { NewsPayload } from '@/types';
import 'dotenv/config';

import getNews from '@/libs/getNews';
import login from '@/libs/login';
import checkAvailability from '@/libs/checkAvailability';
import writeLetter from '@/libs/writeLetter';

const init = async () => {
  await checkEnvironment();
  log.i('구동 완료. CRON 작업 대기중...');
};

const execute = async () => {
  try {
    const newsList: NewsPayload[] = await getNews();

    await login();

    for (const soldier of getTargetSoldiers(config.soldiers)) {
      // 카페 개설여부 확인
      if (!(await checkAvailability(soldier))) continue;

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
