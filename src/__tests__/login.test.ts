import { postRequest } from '@/libs/httpRequest';

const loginRequest = async (userId?: string, userPwd?: string) => {
  return await postRequest<any>('/login/loginA.do', {
    state: 'email-login',
    autoLoginYn: 'N',
    findPwType: 'pwFind',
    userId: userId,
    userPwd: userPwd,
  });
};

describe('login', () => {
  it('존재하지 않는 계정으로 로그인', async () => {
    const response = await loginRequest('test@example.com', 'password');
    expect(response.data.resultCd).toEqual('9000');
  });
});
