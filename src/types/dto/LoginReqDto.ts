export interface LoginReqDto {
  loginId: string;
  password: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
