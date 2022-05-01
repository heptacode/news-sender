import { AxiosRequestConfig } from 'axios';

export interface Soldier {
  name: string;
  birthDate: string;
  enterDate: string;
  startDate: string;
  endDate: string;
  trainUnitEduSeq?: string;
  traineeMgrSeq?: string;
}

export interface Config {
  iuid: string;
  requestConfig: AxiosRequestConfig;
  baseUrl: string;
  categories: string[];
  pageSize: number;
  soldiers: Soldier[];
}

export interface Cookie {
  iuid: string;
  token: string;
}

export interface NewsPayload {
  category: string;
  news: News[];
}

export interface News {
  newsId: string;
  contentId: string;
  title: string;
  cpId: number;
  cpLogoUrl: string;
  cpKorName: string;
  cpEngName: string;
  imageUrl: string;
  contentUrl: string;
  regDt: number;
  modiDt: number;
  status: string;
  summary: string;
  searchId: string;
  label: any;
  commentCnt: number;
  delegateId: any;
}

export interface LetterPayload {
  soldier: Soldier;
  author: string;
  title: string;
  content: string;
}
