import { postRequest } from '@/modules/army/httpRequest';
import { Soldier, SoldierUnit } from '@/types';

/**
 * 훈련병 식별 코드 조회하기
 * @param {Soldier} soldier
 * @returns {string} id
 */
export async function getId(soldier: Soldier) {
  return (
    await postRequest<any>('/consolLetter/viewConsolLetterMain.do', {
      trainUnitEduSeq: soldier.unitId,
      trainUnitCd: soldier.unit ? SoldierUnit[soldier.unit] : '20020191700', // default: 육군훈련소
    })
  ).data.match(/(traineeMgrSeq = '(.*?)\'\;)/)[2];
}
