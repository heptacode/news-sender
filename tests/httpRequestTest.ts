import axios, { AxiosResponse } from 'axios';
import qs from 'qs';

/**
 * HTTP GET Request for Tests
 * @param {string} path
 * @returns {AxiosResponse} AxiosResponse
 */
export async function getRequestTest<T>(path: string): Promise<AxiosResponse<T>> {
  return await axios.get(`https://www.thecamp.or.kr${path}`);
}

/**
 * HTTP POST Request for Tests
 * @param {string} path
 * @param {any} (Optional) body
 * @returns {AxiosResponse} AxiosResponse
 */
export async function postRequestTest<T>(path: string, body?: any): Promise<AxiosResponse<T>> {
  return await axios.post(`https://www.thecamp.or.kr${path}`, qs.stringify(body));
}
