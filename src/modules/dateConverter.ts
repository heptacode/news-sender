import dayjs from 'dayjs';

export const getDateWithHyphens = (date: string): string => {
  return dayjs(date).format('YYYY-MM-DD');
};

export const getDateWithoutHyphens = (date: string): string => {
  return dayjs(date).format('YYYYMMDD');
};
