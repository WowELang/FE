type GenderType = 'MALE' | 'FEMALE';

type UserType = 'native' | 'foreign';
export type DateType = {year: string; month: string; day: string};
export interface UserSignupReqDto {
  loginId: string;
  email: string;
  password: string;
  name: string;
  birthday: string;
  major: string;
  gender: GenderType;
  userType: UserType;
  country: string;
}
