import { config } from '@/config';
import { NewsPayload } from '@/types';
import axios from 'axios';

/**
 * 뉴스 가져오기
 * @returns {NewsPayload[]}
 */
export async function getNews(): Promise<NewsPayload[]> {
  const promises: NewsPayload[] = [];

  for (const category of config.categories) {
    promises.push({
      category: category,
      news: (
        await axios.get(
          `https://news.daum.net/api/harmonydic/contents/news.json?category=${category}&page=1&pageSize=${config.pageSize}`
        )
      ).data.list,
    });
  }

  return await Promise.all([...promises]);
}
