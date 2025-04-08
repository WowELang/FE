import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Pressable, StyleSheet, View} from 'react-native';
import {Back} from '../../../assets';
import ConfirmButton from '../../../components/ConfirmButton';
import Typography from '../../../components/Typography';
import {LoginStackParamList} from '../../../navigators/LoginNavigator';
import {UserSignupReqDto} from '../../../types/dto/UserSignupReqDto';
import IntroduceForm from '../components/IntroduceForm';
import ProgressBar from '../components/ProgressBar';
import RegisterForm from '../components/RegisterForm';

type RegisterScreenProps = {
  navigation: StackNavigationProp<LoginStackParamList, 'Register'>;
};

const RegisterScreen = ({navigation}: RegisterScreenProps) => {
  const defaultValues = {
    userType: undefined,
    country: '',
    name: '',
    gender: undefined,
    birthday: '',
    major: '',
    loginId: '',
    password: '',
    email: '',
  };
  const {
    control,
    handleSubmit,
    watch,
    resetField,
    formState: {errors},
  } = useForm<UserSignupReqDto>({
    defaultValues,
  });
  const fieldList = Object.keys(defaultValues) as (keyof UserSignupReqDto)[];
  const userData = watch();
  const [step, setStep] = useState(0);
  return (
    <View style={styles.container}>
      <ProgressBar progress={step / 10} />
      <View
        style={{
          paddingHorizontal: 38,
          paddingVertical: 30,
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <Pressable
          onPress={() => {
            if (step === 0) navigation.goBack();
            else {
              resetField(fieldList[step]);
              if (fieldList[step] === 'loginId')
                resetField(fieldList[step + 1]);
              if (fieldList[step] === 'email') setStep(step - 2);
              else setStep(step - 1);
            }
          }}>
          <Back fill="#000" />
        </Pressable>
        <View
          style={{
            flex: 1,
            gap: 70,
            marginTop: 50,
          }}>
          <Typography size={28} bold>
            {fieldList[step] === 'loginId'
              ? '회원가입'
              : '당신에 대해 알려주세요!'}
          </Typography>
          {fieldList[step] === 'loginId' ? (
            <RegisterForm
              control={control}
              idValue={userData.loginId}
              pwValue={userData.password}
            />
          ) : (
            <IntroduceForm
              field={fieldList[step]}
              control={control}
              data={userData}
            />
          )}
        </View>
        <ConfirmButton
          title={
            fieldList[step] === 'major'
              ? '내 소개 완료!'
              : fieldList[step] === 'loginId'
              ? '회원가입 완료!'
              : '다음'
          }
          handlerFn={() => {
            if (fieldList[step] === 'loginId') setStep(step + 2);
            else setStep(step + 1);
          }}
          active={
            fieldList[step] === 'loginId'
              ? !!(userData[fieldList[step]] && userData[fieldList[step + 1]])
              : !!userData[fieldList[step]]
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default RegisterScreen;
