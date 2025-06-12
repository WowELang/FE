import {useMutation, useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import {queryClient} from '../../App';
import {axiosApiInstance, axiosChatInstance} from '../api/axios';
import {
  getInterests,
  getUserProfile,
  postCharacter,
  postInterests,
  postNickname,
  putCharacter,
} from '../api/user';

export const useUser = () => {
  const interestMutation = useMutation({
    mutationFn: postInterests,
    onError: error => {
      console.log(error);
    },
  });

  const userProfileQuery = useQuery({
    queryKey: ['user', 'profile'],
    queryFn: getUserProfile,
    enabled: !!axiosApiInstance.defaults.headers.common.Authorization,
  });

  const interestQuery = useQuery({
    queryKey: ['user', 'interest'],
    queryFn: getInterests,
    enabled: !!axiosApiInstance.defaults.headers.common.Authorization,
  });
  const characterMutation = useMutation({
    mutationFn: postCharacter,
    onError: error => {
      console.log(error);
    },
  });
  const changeCharacterMutation = useMutation({
    mutationFn: putCharacter,
    onError: error => {
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['user', 'profile']});
    },
  });
  const nicknameMutation = useMutation({
    mutationFn: postNickname,
    onError: error => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (userProfileQuery.isSuccess && userProfileQuery.data?.userId) {
      axiosChatInstance.defaults.headers.common['X-User-Id'] =
        userProfileQuery.data.userId.toString();
    }
  }, [userProfileQuery.isSuccess, userProfileQuery.data?.userId]);

  return {
    userProfileQuery,
    interestQuery,
    interestMutation,
    changeCharacterMutation,
    characterMutation,
    nicknameMutation,
  };
};
