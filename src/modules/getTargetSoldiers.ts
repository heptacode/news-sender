import { log } from '@/modules/logger';
import { Soldier } from '@/types';
import dayjs from 'dayjs';

export function getTargetSoldiers(soldiers: Soldier[]) {
  return soldiers.filter((soldier: Soldier) => {
    if (soldier.exclude) return false;
    if (dayjs().isBefore(dayjs(soldier.startDate)) || dayjs().isAfter(dayjs(soldier.endDate))) {
      log.w(`${soldier.name} > 전송 기간 X`);
      return false;
    }
    return true;
  });
}
