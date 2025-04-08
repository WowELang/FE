import React, {useEffect, useState} from 'react';
import {Control, Controller} from 'react-hook-form';
import {Pressable, View} from 'react-native';
import Typography from '../../../components/Typography';
import UnderlinedInput from '../../../components/UnderlinedInput';
import {UserSignupReqDto} from '../../../types/dto/UserSignupReqDto';

interface RegisterFormProps {
  control: Control<UserSignupReqDto>;
  idValue: string;
  pwValue: string;
}

const RegisterForm = ({control, idValue, pwValue}: RegisterFormProps) => {
  const [loginInput, setLoginInput] = useState({
    id: idValue,
    pw: pwValue,
    confirmPw: pwValue,
  });
  return (
    <View style={{paddingTop: 80}}>
      <Controller
        control={control}
        name="loginId"
        render={({field: {value, onChange}}) => {
          useEffect(() => {
            if (loginInput.id !== value) onChange('');
          }, [loginInput.id]);
          return (
            <View
              style={{
                flexDirection: 'row',
                gap: 15,
                alignItems: 'center',
              }}>
              <View style={{flex: 1}}>
                <UnderlinedInput
                  type="id"
                  placeholder="아이디"
                  value={loginInput.id}
                  onChangeFn={text => {
                    setLoginInput({...loginInput, id: text});
                  }}
                />
              </View>
              <Pressable
                style={{
                  borderWidth: 1,
                  borderColor: '#79747E',
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                }}
                onPress={() => {
                  onChange(loginInput.id);
                }}>
                <Typography size={14}>중복 확인</Typography>
              </Pressable>
            </View>
          );
        }}
      />

      <UnderlinedInput
        type="password"
        placeholder="비밀번호"
        value={loginInput.pw}
        onChangeFn={text => setLoginInput({...loginInput, pw: text})}
      />
      <Controller
        control={control}
        name="password"
        render={({field: {onChange}}) => {
          useEffect(() => {
            if (loginInput.confirmPw === loginInput.pw)
              onChange(loginInput.confirmPw);
            else onChange('');
          }, [loginInput.confirmPw]);
          return (
            <UnderlinedInput
              type="password"
              placeholder="비밀번호 확인"
              value={loginInput.confirmPw}
              onChangeFn={text => {
                setLoginInput({...loginInput, confirmPw: text});
              }}
              errorMsg={
                loginInput.confirmPw && loginInput.confirmPw !== loginInput.pw
                  ? '비밀번호가 일치하지 않습니다.'
                  : ''
              }
            />
          );
        }}
      />
      <Typography size={12} style={{marginTop: 20}}>
        비밀번호는 영문, 숫자, 특수문자를 포함해 8자리 이상이어야 합니다.
      </Typography>
    </View>
  );
};

export default RegisterForm;
