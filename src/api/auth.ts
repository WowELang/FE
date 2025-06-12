import {LoginReqDto} from '../types/dto/LoginReqDto';
import {
  CharacterType,
  InterestType,
  UserProfileDto,
} from '../types/dto/UserProfileDto';
import {UserSignupReqDto} from '../types/dto/UserSignupReqDto';
import {axiosApiInstance} from './axios';

export const postLogin = async (loginData: LoginReqDto) => {
  const response = await axiosApiInstance.post('/auth/login', loginData);
  return response.data;
};

export const postCheckId = async (id: string) => {
  const response = await axiosApiInstance.post('/user/check-login-id', {
    loginId: id,
  });
  return response.data;
};

export const postEmailVerification = async (emailData: string) => {
  const response = await axiosApiInstance.post('/user/email-verification', {
    email: emailData,
  });
  return response.data;
};

export const postEmailVerificationCode = async (
  signUpData: UserSignupReqDto,
) => {
  const response = await axiosApiInstance.patch('/user/complete', signUpData);
  return response.data;
};

export const getUserProfile = async (): Promise<UserProfileDto> => {
  const response = await axiosApiInstance.get('/user/me/profile');
  console.log('get user data');
  return response.data;
};

export const getInterests = async (): Promise<InterestType[]> => {
  const response = await axiosApiInstance.get('/interest');
  return response.data;
};

export const postInterests = async (interests: number[]) => {
  const response = await axiosApiInstance.post('/interest/me', {
    interestIds: interests,
  });
  return response.data;
};
export const postNickname = async (nickname: string) => {
  const response = await axiosApiInstance.post('/user/me/nickname', {
    nickname: nickname,
  });
  return response.data;
};
export const postCharacter = async (character: CharacterType) => {
  const response = await axiosApiInstance.post('/user/me/character', character);
  return response.data;
};
