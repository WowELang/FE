import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Control, Controller} from 'react-hook-form';
import {View} from 'react-native';
import ConfirmButton from '../../../components/ConfirmButton';
import Typography from '../../../components/Typography';
import UnderlinedInput from '../../../components/UnderlinedInput';
import {LoginStackParamList} from '../../../navigators/LoginNavigator';
import {UserSignupReqDto} from '../../../types/dto/UserSignupReqDto';
import PinCodeInput from './PinCodeInput';

interface SchoolAuthenticationProps {
  control: Control<UserSignupReqDto>;
}
const SchoolAuthentication = ({control}: SchoolAuthenticationProps) => {
  const navigation = useNavigation<StackNavigationProp<LoginStackParamList>>();
  const [email, setEmail] = useState('');
  const [pins, setPins] = useState('');
  return (
    <View style={{flex: 1, paddingTop: 55}}>
      <View style={{gap: 18, paddingBottom: 140}}>
        <Typography size={28} bold>
          학교 인증
        </Typography>
        <Typography size={12}>
          재학생 인증을 위해 학교 이메일을 입력해주세요.
        </Typography>
      </View>
      <Controller
        control={control}
        name="email"
        render={({field: {value, onChange}}) =>
          value.length ? (
            <View style={{gap: 52}}>
              <PinCodeInput
                pinLength={6}
                onChangePin={setPins}
                onComplete={() => {}}
              />
              <ConfirmButton
                title="인증하기"
                active={pins.length === 6}
                handlerFn={() => {
                  navigation.navigate('Splash');
                }}
              />
            </View>
          ) : (
            <View style={{gap: 52}}>
              <UnderlinedInput
                type="email"
                value={email}
                onChangeFn={setEmail}
                placeholder="ex) ilovehongik@g.hongik.ac.kr"
                errorMsg={
                  !email.length || /.+@g\.hongik\.ac\.kr$/.test(email)
                    ? ''
                    : '올바른 형식의 이메일이 아닙니다.'
                }
              />
              <ConfirmButton
                title="인증번호 받기"
                active={/.+@g\.hongik\.ac\.kr$/.test(email)}
                handlerFn={() => {
                  onChange(email);
                }}
              />
            </View>
          )
        }
      />
    </View>
  );
};

export default SchoolAuthentication;
