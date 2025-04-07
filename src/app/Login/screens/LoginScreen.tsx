import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import ConfirmButton from '../../../components/ConfirmButton';
import UnderlinedInput from '../../../components/UnderlinedInput';
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
        justifyContent: 'center',
        paddingTop: 115,
        paddingBottom: 300,
      }}>
      <View style={{alignItems: 'center', gap: 3}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Welcome to</Text>
        <Text style={{fontSize: 28, fontWeight: 'bold', color: '#1833DB'}}>
          와이랭
        </Text>
      </View>
      <View style={{marginTop: 30}}>
        <UnderlinedInput
          value={loginData.id}
          onChangeFn={text => setLoginData({...loginData, id: text})}
          placeholder="아이디"
          type="id"
          errorMsg="잘못된 아이디입니다."
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
          <ConfirmButton title="로그인" handlerFn={() => {}} active />
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
          <Text
            style={{
              fontSize: 12,
              color: '#989A9F',
              borderBottomWidth: 0.75,
              borderBottomColor: '#989A9F',
            }}>
            {'아이디 / 비밀번호 찾기 >'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
