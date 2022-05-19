import { postRequestTest } from './httpRequestTest';

describe('getTraineeMsrSeq', () => {
  it('HTTP 상태 코드 200 확인', async () => {
    const response = await postRequestTest<void>('/consolLetter/viewConsolLetterMain.do');
    expect(response.status).toEqual(200);
  });
});
