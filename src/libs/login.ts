import { postRequest } from '@/libs/httpRequest';
import { extractCookies } from '@/modules/extractCookies';
import { config } from '@/config';

/**
 * 로그인
 * @returns {void} void
 */
export const login = async (): Promise<void> => {
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
};
