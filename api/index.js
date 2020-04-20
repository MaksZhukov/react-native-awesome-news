import { AsyncStorage } from 'react-native';
import uniqBy from 'lodash/uniqBy';

const NewsAPI = require('newsapi');

const newsAPI = new NewsAPI('f76071eaee1a455f8238b34d3f195d7f');

export const getSources = async () => {
  let data;
  try {
    const res = await newsAPI.v2.sources({ language: 'ru' });
    data = res.sources;
    AsyncStorage.setItem('sources', JSON.stringify(data));
  } catch (err) {
    data = JSON.parse(await AsyncStorage.getItem('sources')) || [];
  }
  return data;
};
export const getArticles = async (sources, page) => {
  let data = null;
  try {
    const res = await newsAPI.v2.everything({ sources: sources.toString(), page });
    const cachedArticles = JSON.parse(await AsyncStorage.getItem('articles')) || [];
    data = res.articles;
    AsyncStorage.setItem('articles', JSON.stringify(uniqBy([...cachedArticles, ...data], 'title')));
  } catch (err) {
    const cachedArticles = JSON.parse(await AsyncStorage.getItem('articles')) || [];
    data = cachedArticles
      .filter(article => sources.some(source => source.includes(article.source.id)))
      .slice(0, page * 20);
  }
  return data;
};
