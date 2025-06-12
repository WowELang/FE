import {LoginReqDto} from '../types/dto/LoginReqDto';
import {UserSignupReqDto} from '../types/dto/UserSignupReqDto';
import {axiosApiInstance} from './axios';

export const postLogin = async (loginData: LoginReqDto) => {
  const response = await axiosApiInstance.post('/auth/login', loginData);
  return response.data;
};

export const postRefresh = async (refreshToken: string) => {
  const response = await axiosApiInstance.post('/auth/refresh', {
    headers: {
      RefreshToken: refreshToken,
    },
  });
  console.log('refresh');
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
