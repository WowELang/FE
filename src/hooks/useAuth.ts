import {useMutation, useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {storage} from '../../App';
import {
  getInterests,
  getUserProfile,
  postCharacter,
  postCheckId,
  postEmailVerification,
  postEmailVerificationCode,
  postInterests,
  postLogin,
  postNickname,
} from '../api/auth';
import {axiosApiInstance, axiosChatInstance} from '../api/axios';

export const useAuth = () => {
  const [token, setToken] = useMMKVStorage('token', storage, '');
  const loginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: ({result}) => {
      setToken(result.accessToken);
      axiosApiInstance.defaults.headers.common.Authorization = `Bearer ${result.accessToken}`;
    },
    onError: error => {
      console.log(error);
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

  const interestMutation = useMutation({
    mutationFn: postInterests,
    onError: error => {
      console.log(error);
    },
  });

  const characterMutation = useMutation({
    mutationFn: postCharacter,
    onError: error => {
      console.log(error);
    },
  });

  const userProfileQuery = useQuery({
    queryKey: ['user', 'auth', 'profile'],
    queryFn: getUserProfile,
    enabled: !!axiosApiInstance.defaults.headers.common.Authorization,
  });

  const interestQuery = useQuery({
    queryKey: ['user', 'interest'],
    queryFn: getInterests,
    enabled: !!axiosApiInstance.defaults.headers.common.Authorization,
  });
  const nicknameMutation = useMutation({
    mutationFn: postNickname,
    onError: error => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (!userProfileQuery.isLoading) {
      if (userProfileQuery.isSuccess && token) {
        axiosChatInstance.defaults.headers.common['X-User-Id'] =
          userProfileQuery.data.userId.toString();
      } else {
        setToken('');
      }
    }
  }, [userProfileQuery, token, setToken]);

  return {
    loginMutation,
    checkIdMutation,
    emailMutation,
    emailCodeMutation,
    userProfileQuery,
    interestQuery,
    interestMutation,
    characterMutation,
    nicknameMutation,
  };
};
