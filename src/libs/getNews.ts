import axios from 'axios';
import { config } from '@/config';
import { NewsPayload } from '@/types';

export default async function () {
  const promises: NewsPayload[] = [];

  for (const category of config.categories) {
    promises.push({
      category: category,
      news: (
        await axios.get(
          `https://news.daum.net/api/harmonydic/contents/news.json?category=${category}&pageSize=${config.pageSize}`
        )
      ).data.list,
    });
  }

  return await Promise.all([...promises]);
}