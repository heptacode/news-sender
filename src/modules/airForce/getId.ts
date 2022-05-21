import { getRequest } from '@/modules/airForce/httpRequest';
import { Soldier } from '@/types';
import dayjs from 'dayjs';
import { parse } from 'node-html-parser';

/**
 * 훈련병코드 조회
 * @param {Soldier} soldier
 * @returns {string} id
 */
export async function getId(soldier: Soldier): Promise<string> {
  const response = (
    await getRequest<any>(
      `/emailPicViewSameMembers.action?siteId=last2&searchName=${encodeURI(
        soldier.name
      )}&searchBirth=${dayjs(soldier.birthDate).format('YYYYMMDD')}`
    )
  ).data;
  const wrapper = parse(response).querySelector('input[type=button].choice');
  return wrapper.attrs.onclick.match(/\d+/)[0];
}
