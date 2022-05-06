import { parse } from 'node-html-parser';
import { getRequest, postRequest } from '@/libs/httpRequest';
import { getDateWithHyphens, getDateWithoutHyphens } from '@/modules/dateConverter';
import { log } from '@/modules/logger';
import { config } from '@/config';
import { Soldier, SoldierUnit } from '@/types';

export default async function (soldier: Soldier): Promise<boolean> {
  // addSoilder
  await postRequest<void>('/missSoldier/insertDirectMissSoldierA.do', {
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

  // 등록 순서 가져오기
  const soldierRegListResponse = (await getRequest<any>('/missSoldier/viewMissSoldierRegList.do'))
    .data;
  const wrappers = parse(soldierRegListResponse).querySelectorAll('div.profile-info-area');
  const wrapper = wrappers.find(wrapper => wrapper.rawText.trim().includes(soldier.name));
  const regOrder = wrapper.querySelector('a.btn-profile-set').attrs.href.match(/\d+/)[0];

  // 카페 가입 확인
  const cafeResult = (
    await postRequest<any>('/main/cafeCreateCheckA.do', {
      regOrder: regOrder,
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
}
