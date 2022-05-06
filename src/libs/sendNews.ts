import dayjs from 'dayjs';
import { writeLetter } from '@/libs/writeLetter';
import { NewsPayload, Soldier } from '@/types';

/**
 * 뉴스 보내기
 * @param {LetterPayload} LetterPayload
 * @returns {void} void
 */
export const sendNews = async (soldier: Soldier, newsItem: NewsPayload): Promise<void> => {
  let content: string = ``;
  for (const news of newsItem.news) {
    content += `# ${news.title}\n${news.summary.slice(0, news.summary.indexOf('다.') + 1)}\n\n`;
  }

  await writeLetter({
    soldier: soldier,
    author: dayjs().format('YYYY-MM-DD'),
    title: newsItem.category.toUpperCase(),
    content: content,
  });
};
