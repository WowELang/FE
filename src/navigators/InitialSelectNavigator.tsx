import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SelectColorScreen from '../app/Home/screens/SelectColorScreen';
import SelectFaceScreen from '../app/Home/screens/SelectFaceScreen';
import SelectInterestScreen from '../app/Home/screens/SelectInterestScreen';
import NicknameScreen from '../app/Home/screens/SelectNicknameScreen';
import StartScreen from '../app/Home/screens/StartScreen';

export type InitialSelectStackParamList = {
  SelectInterest: undefined;
  SelecetColor: undefined;
  SelecetFace: {color: number};
  SelectNickname: undefined;
  Start: {nickname: string};
};
const InitialSelectStack = createStackNavigator<InitialSelectStackParamList>();
const InitialSelectNavigator = () => {
  return (
    <InitialSelectStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'SelectInterest'}>
      <InitialSelectStack.Screen
        name={'SelectInterest'}
        component={SelectInterestScreen}
      />
      <InitialSelectStack.Screen
        name={'SelecetColor'}
        component={SelectColorScreen}
      />
      <InitialSelectStack.Screen
        name={'SelecetFace'}
        component={SelectFaceScreen}
      />
      <InitialSelectStack.Screen
        name={'SelectNickname'}
        component={NicknameScreen}
      />
      <InitialSelectStack.Screen name={'Start'} component={StartScreen} />
    </InitialSelectStack.Navigator>
  );
};

export default InitialSelectNavigator;
