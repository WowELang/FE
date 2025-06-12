import {
  CharacterType,
  InterestType,
  UserProfileDto,
} from '../types/dto/UserProfileDto';
import {axiosApiInstance} from './axios';

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

export const putCharacter = async (character: CharacterType) => {
  const response = await axiosApiInstance.put('/user/me/character', character);
  return response.data;
};
