import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import BoardScreen from '../app/Board/screens/BoardScreen';

import {NavigatorScreenParams} from '@react-navigation/native';
import FriendsScreens from '../app/Friends/screens/FriendsScreens';
import SettingScreen from '../app/Settings/SettingScreen';
import {Board, Chat, Friends, Home, Setting} from '../assets';
import {colors} from '../constants/colors';
import {useUser} from '../hooks/useUser';
import ChatNavigator, {ChatstackParamList} from './ChatNavigator';
import HomeNavigator, {HomeStackParamList} from './HomeNavigator';
import InitialSelectNavigator from './InitialSelectNavigator';

export type RootStackParamList = {
  HomeNav: NavigatorScreenParams<HomeStackParamList>;
  ChatNav: NavigatorScreenParams<ChatstackParamList>;
  Friends: undefined;
  Board: undefined;
  Settings: undefined;
};

const RootBottomTab = createBottomTabNavigator<RootStackParamList>();

const RootNavigator = () => {
  const {userProfileQuery} = useUser();
  const {data: userData} = userProfileQuery;

  return userData?.nickname === null ? (
    <InitialSelectNavigator />
  ) : (
    <RootBottomTab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          switch (route.name) {
            case 'HomeNav':
              return <Home fill={color} />;
            case 'ChatNav':
              return <Chat fill={color} />;
            case 'Friends':
              return <Friends fill={color} />;
            case 'Board':
              return <Board fill={color} />;
            case 'Settings':
              return <Setting fill={color} />;
          }
        },
        headerShown: false,
        tabBarStyle: {paddingBottom: 0, height: 80},
        tabBarIconStyle: {marginTop: 11},
        tabBarActiveTintColor: colors.blue.primary,
        tabBarInactiveTintColor: colors.gray.primary,
        tabBarLabelStyle: {
          fontWeight: 'bold',
          fontSize: 12,
        },
      })}>
      <RootBottomTab.Screen
        name="HomeNav"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <RootBottomTab.Screen
        name="ChatNav"
        component={ChatNavigator}
        options={{
          tabBarLabel: 'Chat',
        }}
      />
      <RootBottomTab.Screen
        name="Friends"
        component={FriendsScreens}
        options={{
          tabBarLabel: 'Friends',
        }}
      />
      <RootBottomTab.Screen
        name="Board"
        component={BoardScreen}
        options={{
          tabBarLabel: 'Board',
        }}
      />
      <RootBottomTab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          tabBarLabel: 'Settings',
        }}
      />
    </RootBottomTab.Navigator>
  );
};

export default RootNavigator;
