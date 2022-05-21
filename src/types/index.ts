import { AxiosRequestConfig } from 'axios';
import { SoldierType, SoldierUnit } from './enums';

export interface Soldier {
  name: string;
  type?: SoldierType;
  unit?: SoldierUnit;
  birthDate: string;
  enterDate: string;
  startDate: string;
  endDate: string;
  unitId?: string;
  id?: string;
  exclude?: boolean;
}

export interface Config {
  iuid: string;
  requestConfig: AxiosRequestConfig;
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

export * from './enums';
