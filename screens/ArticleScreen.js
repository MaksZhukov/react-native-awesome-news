/* eslint-disable react/prop-types */
import React, { useLayoutEffect } from 'react';
import { Button, Share } from 'react-native';
import { WebView } from 'react-native-webview';

export default function ArticleScreen({
  navigation,
  route: {
    params: { article }
  }
}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Share"
          onPress={async () => {
            await Share.share({ message: article.url, url: article.url });
          }}
        />
      )
    });
  }, [article]);
  return (
    <WebView
      source={{
        uri: article.url
      }}
    />
  );
}
