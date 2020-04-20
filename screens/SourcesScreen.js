/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button } from 'react-native';
import { getSources } from '../api';

export default function SourcesScreen({ navigation }) {
  const fetchData = useCallback(async () => {
    const data = await getSources();
    setSources(data.map(({ id, name }) => ({ id, name, isSelected: false })));
  });
  useEffect(() => {
    fetchData();
  }, []);
  const [sources, setSources] = useState([]);

  const handleTouch = useCallback(
    id => () => {
      const newSources = sources.map(res =>
        res.id === id ? { ...res, isSelected: !res.isSelected } : res
      );
      if (newSources.filter(res => res.isSelected).length <= 3) {
        setSources(newSources);
      }
    },
    [sources]
  );
  return (
    <View style={{ padding: 10 }}>
      <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {sources.map(source => (
          <View
            key={source.id}
            style={{
              padding: 10,
              width: '50%',
              height: 100
            }}>
            <View
              onTouchStart={handleTouch(source.id)}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: !source.isSelected ? 'lightgray' : 'lime',
                height: '100%',
                borderRadius: 10
              }}>
              <Text>{source.name}</Text>
            </View>
          </View>
        ))}
      </View>
      <Button
        title="Read"
        disabled={!sources.some(res => res.isSelected)}
        onPress={() => {
          navigation.navigate('Articles', {
            sourcesIDs: sources.filter(source => source.isSelected).map(source => source.id)
          });
        }}
      />
    </View>
  );
}
