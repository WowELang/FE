import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import InterestScreen from '../app/Login/screens/InterestScreen';
import LoginScreen from '../app/Login/screens/LoginScreen';
import NicknameScreen from '../app/Login/screens/NicknameScreen';
import RegisterScreen from '../app/Login/screens/RegisterScreen';
import SelectColorScreen from '../app/Login/screens/SelectColorScreen';
import SelectFaceScreen from '../app/Login/screens/SelectFaceScreen';
import SplashScreen from '../app/Login/screens/SplashScreen';
import StartScreen from '../app/Login/screens/StartScreen';
import TermsScreen from '../app/Login/screens/TermsScreen';

export type LoginStackParamList = {
  Login: undefined;
  Register: undefined;
  Terms: undefined;
  Interest: undefined;
  Splash: undefined;
  SelecetColor: undefined;
  SelecetFace: undefined;
  Nickname: undefined;
  Start: undefined;
};
const LoginStack = createStackNavigator<LoginStackParamList>();
const LoginNavigator = () => {
  return (
    <LoginStack.Navigator screenOptions={{headerShown: false}}>
      <LoginStack.Screen name={'Login'} component={LoginScreen} />
      <LoginStack.Screen name={'Register'} component={RegisterScreen} />
      <LoginStack.Screen name={'Terms'} component={TermsScreen} />
      <LoginStack.Screen name={'Splash'} component={SplashScreen} />
      <LoginStack.Screen name={'Interest'} component={InterestScreen} />
      <LoginStack.Screen name={'SelecetColor'} component={SelectColorScreen} />
      <LoginStack.Screen name={'SelecetFace'} component={SelectFaceScreen} />
      <LoginStack.Screen name={'Nickname'} component={NicknameScreen} />
      <LoginStack.Screen name={'Start'} component={StartScreen} />
    </LoginStack.Navigator>
  );
};

export default LoginNavigator;
