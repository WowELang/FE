import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import BoardScreen from '../app/Board/screens/BoardScreen';

import SettingScreen from '../app/Settings/SettingScreen';
import {Board, Chat, Home, Setting} from '../assets';
import ChatNavigator from './ChatNavigator';
import HomeNavigator from './HomeNavigator';

export type RootStackParamList = {
  HomeNav: undefined;
  ChatNav: undefined;
  Board: undefined;
  Settings: undefined;
};

const RootBottomTab = createBottomTabNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <RootBottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {paddingBottom: 0, height: 80},
        tabBarIconStyle: {marginTop: 11},
      }}>
      <RootBottomTab.Screen
        name="HomeNav"
        component={HomeNavigator}
        options={{
          tabBarIcon: () => <Home fill="#1833DB" />,
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            color: '#1833DB',
            fontWeight: 'bold',
            fontSize: 12,
          },
        }}
      />
      <RootBottomTab.Screen
        name="ChatNav"
        component={ChatNavigator}
        options={{
          tabBarIcon: () => <Chat fill="#1833DB" />,
          tabBarLabel: 'Chat',
          tabBarLabelStyle: {
            color: '#1833DB',
            fontWeight: 'bold',
            fontSize: 12,
          },
        }}
      />
      <RootBottomTab.Screen
        name="Board"
        component={BoardScreen}
        options={{
          tabBarIcon: () => <Board fill="#1833DB" />,
          tabBarLabel: 'Board',
          tabBarLabelStyle: {
            color: '#1833DB',
            fontWeight: 'bold',
            fontSize: 12,
          },
        }}
      />
      <RootBottomTab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          tabBarIcon: () => <Setting fill="#1833DB" />,
          tabBarLabel: 'Settings',
          tabBarLabelStyle: {
            color: '#1833DB',
            fontWeight: 'bold',
            fontSize: 12,
          },
        }}
      />
    </RootBottomTab.Navigator>
  );
};

export default RootNavigator;
