import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Pressable, StyleSheet, View} from 'react-native';
import {Back} from '../../../assets';
import ConfirmButton from '../../../components/ConfirmButton';
import Typography from '../../../components/Typography';
import {UserSignupReqDto} from '../../../types/dto/UserSignupReqDto';
import FormInput from '../components/FormInput';
import ProgressBar from '../components/ProgressBar';

const RegisterScreen = () => {
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
            resetField(fieldList[step]);
            setStep(step - 1);
          }}>
          <Back fill="#000" />
        </Pressable>
        <View style={{flex: 1, gap: 70, marginTop: 50}}>
          <Typography size={28} bold>
            당신에 대해 알려주세요!
          </Typography>
          <FormInput
            field={fieldList[step]}
            control={control}
            data={userData}
          />
        </View>
        <ConfirmButton
          title="다음"
          handlerFn={() => {
            setStep(step + 1);
          }}
          active={!!userData[fieldList[step]]}
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
