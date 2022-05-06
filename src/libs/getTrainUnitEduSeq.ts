import { parse } from 'node-html-parser';
import { getRequest } from '@/libs/httpRequest';
import { Soldier } from '@/types';

/**
 * 교육대코드 조회
 * @param {Soldier} soldier
 * @returns {string} trainUnitEduSeq
 */
export const getTrainUnitEduSeq = async (soldier: Soldier): Promise<string> => {
  const trainUnitEduSeqResponse = (await getRequest<any>('/eduUnitCafe/viewEduUnitCafeMain.do'))
    .data;
  const wrappers = parse(trainUnitEduSeqResponse).querySelectorAll('div.profile-wrap');
  const wrapper = wrappers.find(wrapper => wrapper.rawText.trim().includes(soldier.name));
  return wrapper.attrs.onclick.match(/\d+/)[0];
};