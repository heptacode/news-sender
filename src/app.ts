import { scheduleJob } from 'node-schedule';
import dayjs from 'dayjs';
import { log } from '@/modules/logger';
import login from '@/libs/login';
import { config } from '@/config';
import writeLetter from '@/libs/writeLetter';
import checkAvailability from '@/libs/checkAvailability';
import getNews from '@/libs/getNews';
import { NewsPayload } from '@/types';
import 'dotenv/config';

const execute = async () => {
  try {
    const newsList: NewsPayload[] = await getNews();

    await login();

    for (const soldier of config.soldiers) {
      // 시작, 종료날짜 검사
      if (dayjs().isBefore(dayjs(soldier.startDate)) || dayjs().isAfter(dayjs(soldier.endDate))) {
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

        console.log(`${soldier.name} > ${newsItem.category.toUpperCase()}`);
      }
    }
  } catch (error) {
    log.e(error);
  }
};

scheduleJob('0 12 * * *', execute);

execute();
