import React, {useEffect, useState} from 'react';
import {Control, Controller} from 'react-hook-form';
import {Pressable, View} from 'react-native';
import Typography from '../../../components/Typography';
import UnderlinedInput from '../../../components/UnderlinedInput';
import {colors} from '../../../constants/colors';
import {useAuth} from '../../../hooks/useAuth';
import {UserSignupReqDto} from '../../../types/dto/UserSignupReqDto';

interface RegisterFormProps {
  control: Control<UserSignupReqDto>;
  idValue: string;
  pwValue: string;
  setValue: (
    name: keyof UserSignupReqDto,
    value: UserSignupReqDto[keyof UserSignupReqDto],
  ) => void;
}

const RegisterForm = ({
  control,
  idValue,
  pwValue,
  setValue,
}: RegisterFormProps) => {
  const [loginInput, setLoginInput] = useState({
    id: idValue,
    password: pwValue,
    confirmPassword: pwValue,
  });
  const [isIdError, setIsIdError] = useState(false);

  const {checkIdMutation} = useAuth();
  const {mutate, isError, isPending, status} = checkIdMutation;

  useEffect(() => {
    if (!isPending) {
      if (isError) setIsIdError(true);
      else setValue('loginId', loginInput.id);
    }
  }, [isPending, isError]);
  return (
    <View style={{paddingTop: 80, paddingBottom: 150}}>
      <Controller
        control={control}
        name="loginId"
        render={({field: {value, onChange}}) => {
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
                    if (value !== text) {
                      setIsIdError(false);
                      onChange('');
                    }
                    console.log('error', isIdError, status);
                    setLoginInput({...loginInput, id: text});
                  }}
                  errorMsg={isIdError ? '중복되는 아이디입니다.' : undefined}
                />
              </View>
              <Pressable
                style={{
                  borderWidth: 1,
                  borderColor:
                    value.length === 0 && !isIdError
                      ? '#79747E'
                      : isIdError
                      ? colors.red
                      : colors.blue.primary,
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                }}
                onPress={() => {
                  if (value.length === 0 && !isIdError) mutate(loginInput.id);
                }}>
                <Typography
                  size={14}
                  color={
                    value.length === 0 && !isIdError
                      ? '#79747E'
                      : isIdError
                      ? colors.red
                      : colors.blue.primary
                  }>
                  {value.length === 0 && !isIdError
                    ? '중복 확인'
                    : isIdError
                    ? '사용 불가'
                    : '사용 가능'}
                </Typography>
              </Pressable>
            </View>
          );
        }}
      />

      <Controller
        control={control}
        name="password"
        render={({field: {onChange}}) => {
          return (
            <>
              <UnderlinedInput
                type="password"
                placeholder="비밀번호"
                value={loginInput.password}
                onChangeFn={text =>
                  setLoginInput({...loginInput, password: text})
                }
                errorMsg={
                  !loginInput.password.length ||
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/.test(
                    loginInput.password,
                  )
                    ? ''
                    : '형식에 맞지 않는 비밀번호입니다.'
                }
              />
              <UnderlinedInput
                type="password"
                placeholder="비밀번호 확인"
                value={loginInput.confirmPassword}
                onChangeFn={text => {
                  setLoginInput({...loginInput, confirmPassword: text});
                  if (
                    loginInput.password === text &&
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,}$/.test(
                      loginInput.password,
                    )
                  )
                    onChange(text);
                  else onChange('');
                }}
                errorMsg={
                  loginInput.password !== loginInput.confirmPassword &&
                  loginInput.confirmPassword.length !== 0
                    ? '비밀번호가 일치하지 않습니다.'
                    : ''
                }
              />
            </>
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
