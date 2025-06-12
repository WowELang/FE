import {UserType} from './UserSignupReqDto';

export type CharacterType = {
  colorId: number;
  maskId: number;
};

export type InterestType = {
  id: number;
  name: string;
};

export interface UserProfileDto {
  userId: number;
  nickname: string | null;
  character: CharacterType;
  interests: InterestType[];
  name: string;
  major: string;
  usertype: UserType;
  country: string;
}
