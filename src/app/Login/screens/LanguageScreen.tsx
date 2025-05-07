import React, {useState} from 'react';
import {Text, View} from 'react-native';
import ConfirmButton from '../../../components/ConfirmButton';
import ChoiceButton from '../components/ChoiceButton';

const LanguageScreen = () => {
  const [language, setLanguage] = useState<string>();
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 38,
        paddingBottom: 30,
        justifyContent: 'space-between',
      }}>
      <View style={{gap: 10, marginTop: 110}}>
        <Text style={{fontSize: 28, fontWeight: 'bold'}}>
          사용 언어를 골라주세요.
        </Text>
        <Text style={{fontSize: 12}}>Choose the language you want to use.</Text>
      </View>
      <ChoiceButton
        title={['ENGLISH', 'KOREAN']}
        subTitle={['영어', '한국어']}
        value={['english', 'korean']}
        state={language}
        onChangeFn={value => {
          setLanguage(value);
        }}
      />
      <ConfirmButton
        title="다음"
        handlerFn={() => {}}
        active={!!language}
        style={{marginTop: 168}}
      />
    </View>
  );
};

export default LanguageScreen;
