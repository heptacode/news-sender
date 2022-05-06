import axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import { config } from '@/config';

/**
 * HTTP GET Request
 * @param {string} path
 * @returns {AxiosResponse} AxiosResponse
 */
export const getRequest = async <T>(path: string): Promise<AxiosResponse<T>> => {
  return await axios.get(`${config.baseUrl}${path}`, config.requestConfig);
};

/**
 * HTTP POST Request
 * @param {string} path
 * @param {any} (Optional) body
 * @returns {AxiosResponse} AxiosResponse
 */
export const postRequest = async <T>(path: string, body?: any): Promise<AxiosResponse<T>> => {
  return await axios.post(`${config.baseUrl}${path}`, qs.stringify(body), config.requestConfig);
};
