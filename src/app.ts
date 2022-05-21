import { config } from '@/config';
import { sendNews as sendNewsAirForce } from '@/modules/airForce/sendNews';
import { login } from '@/modules/army/login';
import { sendNews as sendNewsArmy } from '@/modules/army/sendNews';
import { checkEnvironment } from '@/modules/checkEnvironment';
import { getNews } from '@/modules/getNews';
import { getTargetSoldiers } from '@/modules/getTargetSoldiers';
import { log } from '@/modules/logger';
import { NewsPayload, SoldierType } from '@/types';
import 'dotenv/config';
import { scheduleJob } from 'node-schedule';
import { addSoldier } from './modules/army/addSoldier';
import { checkCafe } from './modules/army/checkCafe';

const init = async () => {
  await checkEnvironment();
  log.i('구동 완료. CRON 작업 대기중...');
};

const execute = async () => {
  try {
    const newsList: NewsPayload[] = await getNews();

    await login();

    for (const soldier of getTargetSoldiers(config.soldiers)) {
      switch (soldier.type) {
        case SoldierType.AIR_FORCE:
          for (const newsItem of newsList) {
            await sendNewsAirForce(soldier, newsItem);
            log.s(`공군 ${soldier.name} > ${newsItem.category.toUpperCase()}`);
          }
          continue;
        case SoldierType.ARMY:
        default:
          // 보고싶은 군인 추가
          await addSoldier(soldier);

          // 카페 개설여부 확인
          if (!(await checkCafe(soldier))) continue;

          // 뉴스 전송
          for (const newsItem of newsList) {
            await sendNewsArmy(soldier, newsItem);
            log.s(`육군 ${soldier.name} > ${newsItem.category.toUpperCase()}`);
          }
          continue;
      }
    }
  } catch (error) {
    log.e(error);
  }
};

init();
scheduleJob('0 12 * * *', execute); // 매일 정오에 실행
