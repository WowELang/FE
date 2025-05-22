import {useMutation, useQuery} from '@tanstack/react-query';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {storage} from '../../App';
import {getUserProfile, postLogin} from '../api/auth';
import {axiosInstance} from '../api/axios';

export const useAuth = () => {
  const [token, setToken] = useMMKVStorage('token', storage, '');

  const loginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: async ({result}) => {
      setToken(result);
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${result}`;
    },
  });

  const userProfileQuery = useQuery({
    queryKey: ['auth', 'user'],
    queryFn: getUserProfile,
    enabled: !!axiosInstance.defaults.headers.common.Authorization,
  });

  return {loginMutation, userProfileQuery};
};
