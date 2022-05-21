import { config } from '@/config';
import axios, { AxiosResponse } from 'axios';
import qs from 'qs';

const baseUrl = 'https://www.thecamp.or.kr';
/**
 * HTTP GET Request
 * @param {string} path
 * @returns {AxiosResponse} AxiosResponse
 */
export async function getRequest<T>(path: string): Promise<AxiosResponse<T>> {
  return await axios.get(`${baseUrl}${path}`, config.requestConfig);
}

/**
 * HTTP POST Request
 * @param {string} path
 * @param {any} (Optional) body
 * @returns {AxiosResponse} AxiosResponse
 */
export async function postRequest<T>(path: string, body?: any): Promise<AxiosResponse<T>> {
  return await axios.post(`${baseUrl}${path}`, qs.stringify(body), config.requestConfig);
}
