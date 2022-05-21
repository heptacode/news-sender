import { config } from '@/config';
import { getId } from '@/modules/army/getId';
import { getUnitId } from '@/modules/army/getUnitId';
import { postRequest } from '@/modules/army/httpRequest';
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

  if (!payload.soldier.unitId || !payload.soldier.id) {
    config.soldiers[soldierIdx].unitId = await getUnitId(payload.soldier);
    config.soldiers[soldierIdx].id = await getId(payload.soldier);
    updateSoldiers();
  }

  // 편지 보내기
  await postRequest<void>('/consolLetter/insertConsolLetterA.do', {
    trainUnitEduSeq: payload.soldier.unitId ?? config.soldiers[soldierIdx].unitId,
    traineeMgrSeq: payload.soldier.id ?? config.soldiers[soldierIdx].id,
    sympathyLetterSubject: `[${payload.author}] ${payload.title}`,
    sympathyLetterContent: payload.content.replace(/(?:\r\n|\r|\n)/g, '<br>'),
    boardDiv: 'sympathyLetter',
    tempSaveYn: 'N',
  });
}
