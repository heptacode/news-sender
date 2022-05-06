import { scheduleJob } from 'node-schedule';
import { getNews } from '@/libs/getNews';
import { login } from '@/libs/login';
import { addSoldier } from '@/libs/addSoldier';
import { checkCafe } from '@/libs/checkCafe';
import { sendNews } from '@/libs/sendNews';
import { checkEnvironment } from '@/modules/checkEnvironment';
import { getTargetSoldiers } from '@/modules/getTargetSoldiers';
import { log } from '@/modules/logger';
import { config } from '@/config';
import { NewsPayload } from '@/types';
import 'dotenv/config';

const init = async () => {
  await checkEnvironment();
  log.i('구동 완료. CRON 작업 대기중...');
};

const execute = async () => {
  try {
    const newsList: NewsPayload[] = await getNews();

    await login();

    for (const soldier of getTargetSoldiers(config.soldiers)) {
      // 보고싶은 군인 추가
      await addSoldier(soldier);

      // 카페 개설여부 확인
      if (!(await checkCafe(soldier))) continue;

      // 뉴스 전송
      for (const newsItem of newsList) {
        await sendNews(soldier, newsItem);
        log.s(`${soldier.name} > ${newsItem.category.toUpperCase()}`);
      }
    }
  } catch (error) {
    log.e(error);
  }
};

init();
scheduleJob('0 12 * * *', execute); // 매일 정오에 실행
