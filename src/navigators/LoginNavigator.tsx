import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import LoginScreen from '../app/Login/screens/LoginScreen';
import RegisterScreen from '../app/Login/screens/RegisterScreen';
import SplashScreen from '../app/Login/screens/SplashScreen';
import TermsScreen from '../app/Login/screens/TermsScreen';

export type LoginStackParamList = {
  Login: undefined;
  Register: undefined;
  Terms: undefined;

  Splash: undefined;
  Start: undefined;
};
const LoginStack = createStackNavigator<LoginStackParamList>();
const LoginNavigator = () => {
  return (
    <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
      <LoginStack.Navigator screenOptions={{headerShown: false}}>
        <LoginStack.Screen name={'Login'} component={LoginScreen} />
        <LoginStack.Screen name={'Register'} component={RegisterScreen} />
        <LoginStack.Screen name={'Terms'} component={TermsScreen} />
        <LoginStack.Screen name={'Splash'} component={SplashScreen} />
      </LoginStack.Navigator>
    </TouchableWithoutFeedback>
  );
};

export default LoginNavigator;
