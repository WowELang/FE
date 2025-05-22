/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {useEffect} from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {MMKVLoader, useMMKVStorage} from 'react-native-mmkv-storage';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {axiosInstance} from './src/api/axios';
import LanguageScreen from './src/app/Login/screens/LanguageScreen';
import LoginNavigator from './src/navigators/LoginNavigator';
import RootNavigator from './src/navigators/RootNavigator';

const TextEncodingPolyfill = require('text-encoding');

Object.assign('global', {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
});

export const storage = new MMKVLoader().withEncryption().initialize();
const queryClient = new QueryClient();
function App(): React.JSX.Element {
  const languageChosen = true;
  const [token, setToken] = useMMKVStorage('token', storage);
  const isLoggedin = !!token;
  useEffect(() => {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  });
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
