/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import moment from 'moment';
import { View, Text, FlatList, Image, Share, Button } from 'react-native';
import { getArticles } from '../api';

export default function NewsScreen({
  navigation: { navigate },
  route: {
    params: { sourcesIDs }
  }
}) {
  const [articles, setArticles] = useState([]);
  const fetchData = useCallback(async () => {
    const data = await getArticles(sourcesIDs, 1);
    setArticles(data);
  }, [sourcesIDs]);
  const handleLoadMoreArticles = useCallback(async () => {
    const data = await getArticles(sourcesIDs, Math.ceil((articles.length + 1) / 20));
    setArticles([...articles, ...data]);
  }, [articles]);

  const renderItem = useMemo(
    () => ({ item }) => (
      <View
        style={{
          marginBottom: 10,
          paddingBottom: 5,
          borderBottomColor: 'lightgray',
          borderBottomWidth: 2
        }}>
        <View
          onTouchEndCapture={() => {
            navigate('Article', { article: item });
          }}>
          <Text style={{ fontWeight: '700' }}>{item.title}</Text>
          <Text style={{ fontStyle: 'italic' }}>{moment(item.publishedAt).format('LLLL')}</Text>
          <Text numberOfLines={3}>{item.description}</Text>
          {item.urlToImage && (
            <Image source={{ width: '100%', height: 200, uri: item.urlToImage }} />
          )}
        </View>
        <Button
          title="share"
          onPress={async () => {
            await Share.share({ message: item.url, url: item.url });
          }}
        />
      </View>
    ),
    []
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={articles}
        renderItem={renderItem}
        onEndReached={handleLoadMoreArticles}
        onEndReachedThreshold={0.5}
        keyExtractor={(item, i) => i.toString()}
      />
    </View>
  );
}
