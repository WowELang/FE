import {UserType} from './UserSignupReqDto';

type CharacterType = {
  colorId: number;
  maskId: number;
};

type InterestType = {
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
