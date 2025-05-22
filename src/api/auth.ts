import axios from 'axios';
import {LoginReqDto} from '../types/dto/LoginReqDto';
import {UserProfileDto} from '../types/dto/UserProfileDto';
import {UserSignupReqDto} from '../types/dto/UserSignupReqDto';
import {axiosInstance} from './axios';

export const postSignUp = async (signUpData: UserSignupReqDto) => {
  try {
    const response = await axiosInstance.post('/user', signUpData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // 응답이 있는 경우 (서버에서 에러 응답이 온 경우)
      if (error.response) {
        console.error('에러 응답:', error.response.data);
        console.error('에러 상태:', error.response.status);
        return {
          error: true,
          status: error.response.status,
          data: error.response.data,
        };
      }
      // 요청이 전송됐으나 응답이 없는 경우 (네트워크 에러 등)
      else if (error.request) {
        console.error('요청 에러:', error.request);
        return {error: true, message: '서버에서 응답이 없습니다.'};
      }
      // 요청 설정 중 에러가 발생한 경우
      else {
        console.error('에러 메시지:', error.message);
        return {error: true, message: error.message};
      }
    } else {
      // Axios 에러가 아닌 경우
      console.error('알 수 없는 에러:', error);
      return {error: true, message: '알 수 없는 에러가 발생했습니다.'};
    }
  }
};

export const postLogin = async (loginData: LoginReqDto) => {
  try {
    const response = await axiosInstance.post('/auth/login', loginData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // 응답이 있는 경우 (서버에서 에러 응답이 온 경우)
      if (error.response) {
        console.error('에러 응답:', error.response.data);
        console.error('에러 상태:', error.response.status);
        return {
          error: true,
          status: error.response.status,
          data: error.response.data,
        };
      }
      // 요청이 전송됐으나 응답이 없는 경우 (네트워크 에러 등)
      else if (error.request) {
        console.error('요청 에러:', error.request);
        return {error: true, message: '서버에서 응답이 없습니다.'};
      }
      // 요청 설정 중 에러가 발생한 경우
      else {
        console.error('에러 메시지:', error.message);
        return {error: true, message: error.message};
      }
    } else {
      // Axios 에러가 아닌 경우
      console.error('알 수 없는 에러:', error);
      return {error: true, message: '알 수 없는 에러가 발생했습니다.'};
    }
  }
};

export const getUserProfile = async (): Promise<UserProfileDto> => {
  const response = await axiosInstance.get('/user/me/profile');
  console.log(response);
  return response.data;
};
