import { parse } from 'node-html-parser';
import { getRequest, postRequest } from '@/libs/httpRequest';
import { updateSoldiers } from '@/modules/updateSoldiers';
import { LetterPayload } from '@/types';
import { config } from '@/config';

export default async function (payload: LetterPayload) {
  const soldierIdx = config.soldiers.findIndex(
    soldier =>
      soldier.name === payload.soldier.name && soldier.birthDate === payload.soldier.birthDate
  );

  if (!payload.soldier.trainUnitEduSeq) {
    // 교육대코드 조회
    const trainUnitEduSeqResponse = (await getRequest<any>('/eduUnitCafe/viewEduUnitCafeMain.do'))
      .data;
    const wrappers = parse(trainUnitEduSeqResponse).querySelectorAll('div.profile-wrap');
    const wrapper = wrappers.find(wrapper => wrapper.rawText.trim().includes(payload.soldier.name));
    config.soldiers[soldierIdx].trainUnitEduSeq = wrapper.attrs.onclick.match(/\d+/)[0];

    // 훈련병 식별 코드 조회
    config.soldiers[soldierIdx].traineeMgrSeq = (
      await postRequest<any>('/consolLetter/viewConsolLetterMain.do', {
        trainUnitEduSeq: config.soldiers[soldierIdx].trainUnitEduSeq,
        trainUnitCd: '20020191700',
      })
    ).data.match(/(traineeMgrSeq = '(.*?)\'\;)/)[2];

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
}
