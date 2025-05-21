/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import LanguageScreen from './src/app/Login/screens/LanguageScreen';
import LoginNavigator from './src/navigators/LoginNavigator';
import RootNavigator from './src/navigators/RootNavigator';
import {useUserStore} from './src/utils/userStore';

const TextEncodingPolyfill = require('text-encoding');

Object.assign('global', {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
});

function App(): React.JSX.Element {
  const languageChosen = true;
  const {isLoggedin} = useUserStore();
  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <SafeAreaView style={{flex: 1}}>
          <NavigationContainer>
            {languageChosen ? (
              isLoggedin ? (
                <RootNavigator />
              ) : (
                <LoginNavigator />
              )
            ) : (
              <LanguageScreen />
            )}
          </NavigationContainer>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}

export default App;
