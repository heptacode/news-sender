import { postRequest } from '@/libs/httpRequest';
import { getDateWithHyphens } from '@/modules/dateConverter';
import { config } from '@/config';
import { Soldier, SoldierUnit } from '@/types';

/**
 * 군인 추가하기
 * @param {Soldier} soldier
 * @returns {boolean} 등록에 성공하면 true, 이미 등록된 군인이면 false
 */
export const addSoldier = async (soldier: Soldier): Promise<boolean> => {
  const response = await postRequest<any>('/missSoldier/insertDirectMissSoldierA.do', {
    iuid: config.iuid,
    name: soldier.name,
    birth: getDateWithHyphens(soldier.birthDate),
    enterDate: getDateWithHyphens(soldier.enterDate),
    trainUnitCd: soldier.unit ? SoldierUnit[soldier.unit] : '20020191700', // default: 육군훈련소
    missSoldierClassCdNm: '예비군인/훈련병',
    grpCd: '0000010001', // 육군
    grpCdNm: '육군',
    missSoldierClassCd: '0000490001', // '예비군인/훈련병'
  });

  return !!(response.data?.resultCd !== 'E001');
};
