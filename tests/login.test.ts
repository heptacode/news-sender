import { postRequestTest } from './httpRequestTest';

async function loginRequest(userId?: string, userPwd?: string) {
  return await postRequestTest<any>('/login/loginA.do', {
    state: 'email-login',
    autoLoginYn: 'N',
    findPwType: 'pwFind',
    userId: userId,
    userPwd: userPwd,
  });
}

describe('login', () => {
  it('존재하지 않는 계정으로 로그인하는 경우', async () => {
    const response = await loginRequest('test@example.com', 'password');
    expect(response.data.resultCd).toEqual('9000');
  });

  it('이메일을 입력하지 않은 경우', async () => {
    const response = await loginRequest(undefined, 'password');
    expect(response.data.resultCd).toEqual('9006');
  });

  it('비밀번호를 입력하지 않은 경우', async () => {
    const response = await loginRequest('test@example.com', undefined);
    expect(response.data.resultCd).toEqual('9000');
  });
});
