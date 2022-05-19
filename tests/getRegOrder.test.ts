import { getRequestTest } from './httpRequestTest';

describe('getRegOrder', () => {
  it('HTTP 상태 코드 200 확인', async () => {
    const response = await getRequestTest<any>('/missSoldier/viewMissSoldierRegList.do');
    expect(response.status).toEqual(200);
  });
});
