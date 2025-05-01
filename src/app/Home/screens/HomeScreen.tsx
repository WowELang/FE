import React from 'react';
import {View} from 'react-native';
import CharacterView from '../components/CharacterView';
import DailyKorean from '../components/DailyKorean';

const HomeScreen = () => {
  return (
    <View style={{paddingHorizontal: 18, paddingVertical: 20, gap: 20}}>
      <CharacterView />
      <DailyKorean />
    </View>
  );
};

export default HomeScreen;
