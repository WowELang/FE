/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import LanguageScreen from './src/app/Login/screens/LanguageScreen';
import LoginNavigator from './src/navigators/LoginNavigator';

function App(): React.JSX.Element {
  const languageChosen = true;
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <NavigationContainer>
          {languageChosen ? <LoginNavigator /> : <LanguageScreen />}
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
