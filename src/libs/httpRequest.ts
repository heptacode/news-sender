import axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import { config } from '@/config';

export const getRequest = async <T>(path: string): Promise<AxiosResponse<T>> => {
  return await axios.get(`${config.baseUrl}${path}`, config.requestConfig);
};

export const postRequest = async <T>(path: string, body?: any): Promise<AxiosResponse<T>> => {
  return await axios.post(`${config.baseUrl}${path}`, qs.stringify(body), config.requestConfig);
};
