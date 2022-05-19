import dayjs from 'dayjs';

export function getDateWithHyphens(date: string): string {
  return dayjs(date).format('YYYY-MM-DD');
}

export function getDateWithoutHyphens(date: string): string {
  return dayjs(date).format('YYYYMMDD');
}
