import { getRegOrder } from '@/libs/getRegOrder';
import { postRequest } from '@/libs/httpRequest';
import { getDateWithoutHyphens } from '@/modules/dateConverter';
import { log } from '@/modules/logger';
import { Soldier, SoldierUnit } from '@/types';

/**
 * 카페 가입 확인
 * @param {Soldier} soldier
 * @returns {boolean} 카페 가입 여부
 */
export const checkCafe = async (soldier: Soldier): Promise<boolean> => {
  const cafeResult = (
    await postRequest<any>('/main/cafeCreateCheckA.do', {
      regOrder: await getRegOrder(soldier),
      name: soldier.name,
      birth: getDateWithoutHyphens(soldier.birthDate),
      enterDate: getDateWithoutHyphens(soldier.enterDate),
      trainUnitCd: soldier.unit ? SoldierUnit[soldier.unit] : '20020191700', // default: 육군훈련소
      grpCd: '0000010001', // 육군
      trainUnitTypeCd: '0000140001', // ??
      traineeRelationshipCd: '0000420006', // 친구/지인
    })
  ).data;

  const isAvailable = !cafeResult.resultCd.includes('M');
  if (!isAvailable) {
    log.w(`${soldier.name} > 카페 개설 X`);
  }

  return isAvailable;
};
