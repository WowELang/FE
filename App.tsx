/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import LanguageScreen from './src/app/Login/screens/LanguageScreen';
import LoginNavigator from './src/navigators/LoginNavigator';
import RootNavigator from './src/navigators/RootNavigator';

function App(): React.JSX.Element {
  const languageChosen = true;
  const isLogined = false;
  return (
    <SafeAreaProvider>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
          <SafeAreaView style={{flex: 1}}>
            <NavigationContainer>
              {languageChosen ? (
                isLogined ? (
                  <RootNavigator />
                ) : (
                  <LoginNavigator />
                )
              ) : (
                <LanguageScreen />
              )}
            </NavigationContainer>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
}

export default App;
