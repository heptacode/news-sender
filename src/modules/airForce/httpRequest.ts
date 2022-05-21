import axios, { AxiosResponse } from 'axios';
import { Agent } from 'https';
import qs from 'qs';

const baseUrl = 'https://www.airforce.mil.kr/user';

/**
 * HTTP GET Request
 * @param {string} path
 * @returns {AxiosResponse} AxiosResponse
 */
export async function getRequest<T>(path: string): Promise<AxiosResponse<T>> {
  return await axios.get(`${baseUrl}${path}`, {
    httpsAgent: new Agent({
      rejectUnauthorized: false,
    }),
  });
}

/**
 * HTTP POST Request
 * @param {string} path
 * @param {any} (Optional) body
 * @returns {AxiosResponse} AxiosResponse
 */
export async function postRequest<T>(path: string, body?: any): Promise<AxiosResponse<T>> {
  return await axios.post(`${baseUrl}${path}`, qs.stringify(body), {
    httpsAgent: new Agent({
      rejectUnauthorized: false,
    }),
  });
}
