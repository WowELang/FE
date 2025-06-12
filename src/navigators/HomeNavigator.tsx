import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import CharacterChangeScreen from '../app/Home/screens/CharacterChangeScreen';
import CharacterMenuScreen from '../app/Home/screens/CharacterMenuScreen';
import HomeScreen from '../app/Home/screens/HomeScreen';

export type HomeStackParamList = {
  Home: undefined;
  CharacterMenu: undefined;
  CharacterChange: {type: 'color' | 'face'};
};
const HomeStack = createStackNavigator<HomeStackParamList>();
const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Home'}>
      <HomeStack.Screen name={'Home'} component={HomeScreen} />
      <HomeStack.Screen
        name={'CharacterMenu'}
        component={CharacterMenuScreen}
      />
      <HomeStack.Screen
        name={'CharacterChange'}
        component={CharacterChangeScreen}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
