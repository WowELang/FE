import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../app/Login/screens/LoginScreen';
import RegisterScreen from '../app/Login/screens/RegisterScreen';
import TermsScreen from '../app/Login/screens/TermsScreen';

export type LoginStackParamList = {
  Login: undefined;
  Register: undefined;
  Terms: undefined;
};
const LoginStack = createStackNavigator<LoginStackParamList>();
const LoginNavigator = () => {
  return (
    <LoginStack.Navigator screenOptions={{headerShown: false}}>
      <LoginStack.Screen name={'Login'} component={LoginScreen} />
      <LoginStack.Screen name={'Register'} component={RegisterScreen} />
      <LoginStack.Screen name={'Terms'} component={TermsScreen} />
    </LoginStack.Navigator>
  );
};

export default LoginNavigator;
