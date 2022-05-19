import { Cookie } from '@/types';

/**
 * Cookie 추출
 */
export function extractCookies(cookies: string[]): Cookie {
  if (!cookies.length) {
    throw new Error('Invalid Cookie');
  }

  const [iuid] = cookies.filter(cookie => cookie.includes('iuid='));
  const [token] = cookies.filter(cookie => cookie.includes('Token='));

  return {
    iuid: iuid.slice(0, iuid.indexOf(';')),
    token: token.slice(0, token.indexOf(';')),
  };
}
