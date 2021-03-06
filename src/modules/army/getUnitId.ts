import { getRequest } from '@/modules/army/httpRequest';
import { Soldier } from '@/types';
import { parse } from 'node-html-parser';

/**
 * 교육대코드 조회
 * @param {Soldier} soldier
 * @returns {string} unitId
 */
export async function getUnitId(soldier: Soldier): Promise<string> {
  const trainUnitEduSeqResponse = (await getRequest<any>('/eduUnitCafe/viewEduUnitCafeMain.do'))
    .data;
  const wrappers = parse(trainUnitEduSeqResponse).querySelectorAll('div.profile-wrap');
  const wrapper = wrappers.find(wrapper => wrapper.rawText.trim().includes(soldier.name));
  return wrapper.attrs.onclick.match(/\d+/)[0];
}
