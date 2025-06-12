import {useMutation, useQuery} from '@tanstack/react-query';
import {useEffect} from 'react';
import {queryClient} from '../../App';
import {axiosApiInstance, axiosChatInstance} from '../api/axios';
import {
  getInterests,
  getMyProfile,
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

  const myProfileQuery = useQuery({
    queryKey: ['user', 'profile', 'mine'],
    queryFn: getMyProfile,
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
    if (myProfileQuery.isSuccess && myProfileQuery.data?.userId) {
      axiosChatInstance.defaults.headers.common['X-User-Id'] =
        myProfileQuery.data.userId.toString();
    }
  }, [myProfileQuery.isSuccess, myProfileQuery.data?.userId]);

  return {
    myProfileQuery,
    interestQuery,
    interestMutation,
    changeCharacterMutation,
    characterMutation,
    nicknameMutation,
  };
};

export const useProfile = (userId: number) => {
  const userProfileQuery = useQuery({
    queryKey: ['user', 'profile', userId],
    queryFn: () => getUserProfile(userId),
    enabled: !!axiosApiInstance.defaults.headers.common.Authorization,
  });
  return userProfileQuery;
};
