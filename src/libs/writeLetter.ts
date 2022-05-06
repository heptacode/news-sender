import { postRequest } from '@/libs/httpRequest';
import { getTrainUnitEduSeq } from '@/libs/getTrainUnitEduSeq';
import { getTraineeMsrSeq } from './getTraineeMgrSeq';
import { updateSoldiers } from '@/modules/updateSoldiers';
import { LetterPayload } from '@/types';
import { config } from '@/config';

/**
 * 편지 작성하기
 * @param {LetterPayload} LetterPayload
 * @returns {void} void
 */
export const writeLetter = async (payload: LetterPayload): Promise<void> => {
  const soldierIdx = config.soldiers.findIndex(
    soldier =>
      soldier.name === payload.soldier.name && soldier.birthDate === payload.soldier.birthDate
  );

  if (!payload.soldier.trainUnitEduSeq) {
    config.soldiers[soldierIdx].trainUnitEduSeq = await getTrainUnitEduSeq(payload.soldier);
    config.soldiers[soldierIdx].traineeMgrSeq = await getTraineeMsrSeq(payload.soldier);
    updateSoldiers();
  }

  // 편지 보내기
  await postRequest<void>('/consolLetter/insertConsolLetterA.do', {
    trainUnitEduSeq: payload.soldier.trainUnitEduSeq ?? config.soldiers[soldierIdx].trainUnitEduSeq,
    traineeMgrSeq: payload.soldier.traineeMgrSeq ?? config.soldiers[soldierIdx].traineeMgrSeq,
    sympathyLetterSubject: `[${payload.author}] ${payload.title}`,
    sympathyLetterContent: payload.content.replace(/(?:\r\n|\r|\n)/g, '<br>'),
    boardDiv: 'sympathyLetter',
    tempSaveYn: 'N',
  });
};
