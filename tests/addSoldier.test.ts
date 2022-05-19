import { postRequestTest } from './httpRequestTest';

describe('addSoldier', () => {
  it('HTTP 상태 코드 200 확인', async () => {
    const response = await postRequestTest<void>('/missSoldier/insertDirectMissSoldierA.do');
    expect(response.status).toEqual(200);
  });
});
