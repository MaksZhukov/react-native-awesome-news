import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import './api';

import SourcesScreen from './screens/SourcesScreen';
import ArticlesScreen from './screens/ArticlesScreen';
import ArticleScreen from './screens/ArticleScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
            headerRightContainerStyle: {
              marginRight: 10
            }
          }}
          initialRouteName="Sources">
          <Stack.Screen name="Sources" component={SourcesScreen} />
          <Stack.Screen name="Articles" component={ArticlesScreen} />
          <Stack.Screen name="Article" component={ArticleScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
