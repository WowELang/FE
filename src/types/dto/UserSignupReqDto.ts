type GenderType = 'MALE' | 'FEMALE';

export type UserType = 'NATIVE' | 'FOREIGN';
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
}
