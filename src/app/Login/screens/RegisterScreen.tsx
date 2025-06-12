import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Back} from '../../../assets';
import ConfirmButton from '../../../components/ConfirmButton';
import Typography from '../../../components/Typography';
import {colors} from '../../../constants/colors';
import {LoginStackParamList} from '../../../navigators/LoginNavigator';
import {UserSignupReqDto} from '../../../types/dto/UserSignupReqDto';
import IntroduceForm from '../components/IntroduceForm';
import ProgressBar from '../components/ProgressBar';
import RegisterForm from '../components/RegisterForm';
import SchoolAuthentication from '../components/SchoolAuthentication';

type RegisterScreenProps = {
  navigation: StackNavigationProp<LoginStackParamList, 'Register'>;
};

const EDGE_THRESHOLD = 30; // 엣지로 간주할 X 좌표 범위
const SWIPE_THRESHOLD = 50;

const RegisterScreen = ({navigation}: RegisterScreenProps) => {
  const defaultValues = {
    usertype: undefined,
    country: '',
    name: '',
    gender: undefined,
    birthday: '',
    major: '',
    loginId: '',
    password: '',
    email: '',
    code: 0,
  };
  const {
    control,
    watch,
    resetField,
    setValue,
    handleSubmit,
    formState: {errors, isSubmitSuccessful},
  } = useForm<UserSignupReqDto>({
    defaultValues,
  });
  const fieldList = Object.keys(defaultValues) as (keyof UserSignupReqDto)[];
  const userData = watch();
  const [step, setStep] = useState(0);

  const stepRef = useRef(step);
  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  const panResponder = useRef(
    PanResponder.create({
      // 터치 시작 시 이 뷰가 응답할지 결정
      onStartShouldSetPanResponder: (evt: GestureResponderEvent) => {
        return evt.nativeEvent.pageX < EDGE_THRESHOLD;
      },
      // 터치가 이동할 때
      onPanResponderRelease: (
        _evt: GestureResponderEvent,
        gestureState: PanResponderGestureState,
      ) => {
        // 오른쪽으로 충분히 스와이프했다면
        if (gestureState.dx > SWIPE_THRESHOLD) {
          if (stepRef.current === 0) {
            navigation.goBack();
          } else {
            resetField(fieldList[stepRef.current]);
            if (fieldList[stepRef.current] === 'loginId')
              resetField(fieldList[stepRef.current + 1]);
            if (fieldList[stepRef.current] === 'email') setStep(s => s - 2);
            else setStep(s => s - 1);
          }
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (errors) console.log(errors);
    if (isSubmitSuccessful) navigation.navigate('Splash');
  }, [errors, isSubmitSuccessful]);

  useEffect(() => {
    console.log(userData);
  }, [userData]);
  useLayoutEffect(() => {
    navigation.setOptions({gestureEnabled: false});
  }, [navigation]);

  return (
    <View {...panResponder.panHandlers} style={styles.container}>
      <ProgressBar progress={step / 8} />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
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
            <Back fill={colors.gray.primary} />
          </Pressable>
          {step === 8 ? (
            <SchoolAuthentication
              control={control}
              handleSubmit={handleSubmit}
            />
          ) : (
            <View style={{flex: 1}}>
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
                    setValue={setValue}
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
                    ? !!(
                        userData[fieldList[step]] &&
                        userData[fieldList[step + 1]]
                      )
                    : !!userData[fieldList[step]]
                }
              />
            </View>
          )}
        </View>
      </ScrollView>
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
