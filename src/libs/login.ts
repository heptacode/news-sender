import { config } from '@/config';
import { postRequest } from '@/libs/httpRequest';
import { extractCookies } from '@/modules/extractCookies';

/**
 * 로그인
 * @returns {void} void
 */
export async function login(): Promise<void> {
  const loginResponse = await postRequest<any>('/login/loginA.do', {
    state: 'email-login',
    autoLoginYn: 'N',
    findPwType: 'pwFind',
    userId: process.env.USER_ID,
    userPwd: process.env.USER_PW,
  });

  const { iuid, token } = extractCookies(loginResponse.headers['set-cookie']!);
  config.iuid = iuid.match(/\d+/)[0];
  config.requestConfig = {
    headers: {
      Cookie: `${iuid}; ${token}`,
    },
  };
}
