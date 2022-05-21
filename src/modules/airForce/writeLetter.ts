import { config } from '@/config';
import { getId } from '@/modules/airForce/getId';
import { postRequest } from '@/modules/airForce/httpRequest';
import { updateSoldiers } from '@/modules/updateSoldiers';
import { LetterPayload } from '@/types';

/**
 * 편지 작성하기
 * @param {LetterPayload} LetterPayload
 * @returns {void} void
 */
export async function writeLetter(payload: LetterPayload): Promise<void> {
  const soldierIdx = config.soldiers.findIndex(
    soldier =>
      soldier.name === payload.soldier.name && soldier.birthDate === payload.soldier.birthDate
  );

  if (!payload.soldier.id) {
    config.soldiers[soldierIdx].id = await getId(payload.soldier);
    updateSoldiers();
  }

  // 편지 보내기
  await postRequest<void>('/emailPicSaveEmail.action', {
    siteId: 'last2',
    command2: 'writeEmail',
    memberSeqVal: payload.soldier.id ?? config.soldiers[soldierIdx].id,
    senderName: payload.author,
    relationship: '지인',
    title: `[${payload.author}] ${payload.title}`,
    contents: payload.content.replace(/(?:\r\n|\r|\n)/g, ' / '),
    password: 'passw0rd',
  });
}
