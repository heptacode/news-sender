import { postRequest } from '@/libs/httpRequest';
import { Soldier, SoldierUnit } from '@/types';

/**
 * 훈련병 식별 코드 조회하기
 * @param {Soldier} soldier
 * @returns {string} traineeMgrSeq
 */
export async function getTraineeMsrSeq(soldier: Soldier) {
  return (
    await postRequest<any>('/consolLetter/viewConsolLetterMain.do', {
      trainUnitEduSeq: soldier.trainUnitEduSeq,
      trainUnitCd: soldier.unit ? SoldierUnit[soldier.unit] : '20020191700', // default: 육군훈련소
    })
  ).data.match(/(traineeMgrSeq = '(.*?)\'\;)/)[2];
}
