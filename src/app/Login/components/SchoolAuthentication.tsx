import React, {useState} from 'react';
import {Control, Controller, UseFormHandleSubmit} from 'react-hook-form';
import {View} from 'react-native';
import ConfirmButton from '../../../components/ConfirmButton';
import Typography from '../../../components/Typography';
import UnderlinedInput from '../../../components/UnderlinedInput';
import {colors} from '../../../constants/colors';
import {useAuth} from '../../../hooks/useAuth';
import {UserSignupReqDto} from '../../../types/dto/UserSignupReqDto';
import PinCodeInput from './PinCodeInput';

interface SchoolAuthenticationProps {
  control: Control<UserSignupReqDto>;
  handleSubmit: UseFormHandleSubmit<UserSignupReqDto, UserSignupReqDto>;
}
const SchoolAuthentication = ({
  control,
  handleSubmit,
}: SchoolAuthenticationProps) => {
  const [email, setEmail] = useState('');
  const [pins, setPins] = useState('');

  const {emailMutation, emailCodeMutation} = useAuth();
  const {isSuccess: emailSuccess, mutate: emailMutate} = emailMutation;
  const {mutate: codeMutate, error: codeError} = emailCodeMutation;

  const onSubmit = (data: UserSignupReqDto) => {
    codeMutate(data);
  };

  return (
    <View style={{flex: 1, paddingTop: 55}}>
      <View style={{gap: 18, paddingBottom: 140}}>
        <Typography size={28} bold>
          이메일 인증
        </Typography>
        <Typography size={12}>
          본인 인증을 위해 이메일을 입력해주세요.
        </Typography>
      </View>
      {email.length !== 0 && emailSuccess ? (
        <Controller
          control={control}
          name="code"
          render={({field: {onChange}}) => (
            <View style={{gap: 52}}>
              <PinCodeInput pinLength={4} onChangePin={setPins} />
              <ConfirmButton
                title="인증하기"
                active={pins.length === 4}
                handlerFn={() => {
                  onChange(parseInt(pins));
                  handleSubmit(onSubmit)();
                }}
              />
              {codeError && (
                <Typography size={12} color={colors.red}>
                  잘못된 인증번호입니다.
                </Typography>
              )}
            </View>
          )}
        />
      ) : (
        <Controller
          control={control}
          name="email"
          render={({field: {onChange}}) => (
            <View style={{gap: 52}}>
              <UnderlinedInput
                type="email"
                value={email}
                onChangeFn={setEmail}
                placeholder="ex) ilovehongik@g.hongik.ac.kr"
                errorMsg={
                  !email.length || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)
                    ? ''
                    : '올바른 형식의 이메일이 아닙니다.'
                }
              />
              <ConfirmButton
                title="인증번호 받기"
                active={/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)}
                handlerFn={() => {
                  onChange(email);
                  emailMutate(email);
                }}
              />
            </View>
          )}
        />
      )}
    </View>
  );
};

export default SchoolAuthentication;
