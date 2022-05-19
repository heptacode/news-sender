import { getRequest } from '@/libs/httpRequest';
import { Soldier } from '@/types';
import { parse } from 'node-html-parser';

/**
 * 등록 순서 가져오기
 * @param {Soldier} soldier
 * @returns {string} regOrder
 */
export async function getRegOrder(soldier: Soldier): Promise<string> {
  const soldierRegListResponse = (await getRequest<any>('/missSoldier/viewMissSoldierRegList.do'))
    .data;
  const wrappers = parse(soldierRegListResponse).querySelectorAll('div.profile-info-area');
  const wrapper = wrappers.find(wrapper => wrapper.rawText.trim().includes(soldier.name));
  return wrapper.querySelector('a.btn-profile-set').attrs.href.match(/\d+/)[0];
}
