import {useMutation} from '@tanstack/react-query';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {storage} from '../../App';
import {
  postCheckId,
  postEmailVerification,
  postEmailVerificationCode,
  postLogin,
  postRefresh,
} from '../api/auth';
import {axiosApiInstance} from '../api/axios';
import {Tokens} from '../types/dto/LoginReqDto';

export const useAuth = () => {
  const [tokens, setTokens] = useMMKVStorage<Tokens>('tokens', storage, {
    accessToken: '',
    refreshToken: '',
  });

  const loginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: ({result}) => {
      setTokens({
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });
      axiosApiInstance.defaults.headers.common.Authorization = `Bearer ${result.accessToken}`;
    },
    onError: error => {
      console.log(error);
    },
  });

  const refreshMutation = useMutation({
    mutationFn: postRefresh,
    onSuccess: ({result}) => {
      setTokens({
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      });
      axiosApiInstance.defaults.headers.common.Authorization = `Bearer ${result.accessToken}`;
    },
    onError: () => {
      setTokens({accessToken: '', refreshToken: ''});
    },
  });

  const checkIdMutation = useMutation({
    mutationFn: postCheckId,
    onError: error => {
      console.log(error);
    },
  });

  const emailMutation = useMutation({
    mutationFn: postEmailVerification,
    onError: error => {
      console.log(error);
    },
  });

  const emailCodeMutation = useMutation({
    mutationFn: postEmailVerificationCode,
    onError: error => {
      console.log(error);
    },
  });

  return {
    loginMutation,
    checkIdMutation,
    emailMutation,
    emailCodeMutation,
  };
};
