import { getRequest, postRequest } from '@/libs/httpRequest';
import { getDateWithHyphens, getDateWithoutHyphens } from '@/modules/dateConverter';
import { config } from '@/config';
import { Soldier } from '@/types';

export default async function (soldier: Soldier): Promise<boolean> {
  // addSoilder
  await postRequest<void>('/missSoldier/insertDirectMissSoldierA.do', {
    iuid: config.iuid,
    name: soldier.name,
    birth: getDateWithHyphens(soldier.birthDate),
    enterDate: getDateWithHyphens(soldier.enterDate),
    trainUnitCd: '20020191700', // 육군훈련소
    missSoldierClassCdNm: '예비군인/훈련병',
    grpCd: '0000010001', // 육군
    grpCdNm: '육군',
    missSoldierClassCd: '0000490001', // '예비군인/훈련병'
  });

  // 카페 가입 확인
  const cafeResult = (
    await postRequest<any>('/main/cafeCreateCheckA.do', {
      name: soldier.name,
      birth: getDateWithoutHyphens(soldier.birthDate),
      enterDate: getDateWithoutHyphens(soldier.enterDate),
      trainUnitCd: '20020191700', // 육군훈련소
      grpCd: '0000010001', // 육군
      trainUnitTypeCd: '0000140001', // ??
      traineeRelationshipCd: '0000420006', // 친구/지인
    })
  ).data;

  return !cafeResult.resultCd.includes('M');
}
