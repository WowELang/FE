import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {HongikLogo} from '../../../assets';
import Typography from '../../../components/Typography';
import {colors} from '../../../constants/colors';
import {LoginStackParamList} from '../../../navigators/LoginNavigator';

interface SplashScreenProps {
  navigation: StackNavigationProp<LoginStackParamList, 'Splash'>;
}

const SplashScreen = ({navigation}: SplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2500);
    return () => clearTimeout(timer);
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.blue.primary,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 65,
        paddingTop: 190,
      }}>
      <View style={{gap: 36, alignItems: 'center', paddingHorizontal: 90}}>
        <View
          style={{
            width: 182,
            height: 182,
            borderRadius: 91,
            backgroundColor: colors.white,
          }}
        />
        <Typography
          size={30}
          bold
          color={colors.white}
          numberOfLines={2}
          lineBreakStrategyIOS="hangul-word"
          style={{textAlign: 'center'}}>
          가입이 완료되었습니다!
        </Typography>
      </View>
      <HongikLogo />
    </View>
  );
};

export default SplashScreen;
