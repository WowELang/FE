import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {View} from 'react-native';
import ConfirmButton from '../../../components/ConfirmButton';
import Typography from '../../../components/Typography';
import UnderlinedInput from '../../../components/UnderlinedInput';
import {colors} from '../../../constants/colors';
import {LoginStackParamList} from '../../../navigators/LoginNavigator';

type LoginScreenProps = {
  navigation: StackNavigationProp<LoginStackParamList, 'Login'>;
};

const LoginScreen = ({navigation}: LoginScreenProps) => {
  const [loginData, setLoginData] = useState({id: '', password: ''});
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 38,
        backgroundColor: '#fff',
        paddingTop: 120,
      }}>
      <View style={{alignItems: 'center', gap: 3}}>
        <Typography size={20} bold>
          Welcome to
        </Typography>
        <Typography size={28} color={colors.blue.primary} bold>
          와이랭
        </Typography>
      </View>
      <View style={{marginTop: 30}}>
        <UnderlinedInput
          value={loginData.id}
          onChangeFn={text => setLoginData({...loginData, id: text})}
          placeholder="아이디"
          type="id"
        />
        <UnderlinedInput
          value={loginData.password}
          onChangeFn={text => setLoginData({...loginData, password: text})}
          placeholder="비밀번호"
          type="password"
        />
      </View>
      <View style={{marginTop: 17}}>
        <View style={{gap: 8}}>
          <ConfirmButton
            title="로그인"
            handlerFn={() => {
              navigation.navigate('Interest');
            }}
            active
          />
          <ConfirmButton
            title="이메일 회원가입"
            handlerFn={() => {
              navigation.navigate('Terms');
            }}
            active
            style={{backgroundColor: '#989A9F'}}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: 30,
          }}>
          <Typography
            size={12}
            color={colors.gray.primary}
            style={{borderBottomWidth: 0.75, borderColor: colors.gray.primary}}>
            {'아이디 / 비밀번호 찾기 >'}
          </Typography>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
