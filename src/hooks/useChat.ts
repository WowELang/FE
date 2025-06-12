import {useMutation, useQuery} from '@tanstack/react-query';
import {queryClient} from '../../App';
import {
  getFriendList,
  getFriendRequestList,
  getImage,
  getMessages,
  getRoomList,
  postFriendRequest,
  postFriendResponse,
  postImage,
} from '../api/chat';
import {MessageType} from '../types/dto/ChatMessageDto';
import {useUser} from './useUser';

export const useChatMessages = (roomId: string, before?: string) => {
  const {myProfileQuery} = useUser();
  const {data: userData} = myProfileQuery;
  const messageQuery = useQuery({
    queryKey: ['chat', 'messages'],
    queryFn: () => getMessages(roomId, before),
    enabled: !!roomId && !!userData?.userId,
  });
  return messageQuery;
};

export const useChatRoom = () => {
  const {myProfileQuery} = useUser();
  const {data: userData} = myProfileQuery;
  const roomQuery = useQuery({
    queryKey: ['chat', 'room'],
    queryFn: () => getRoomList(),
    enabled: !!userData?.userId,
  });
  return roomQuery;
};

export const useSendImage = () => {
  return useMutation({
    mutationFn: postImage,
  });
};

export const useReceiveImage = (type: MessageType, imageUrl: string) => {
  return useQuery({
    queryKey: ['chat', 'message', 'image', imageUrl],
    queryFn: () => getImage(imageUrl),
    enabled: type === 'IMAGE',
  });
};

export const useFriend = () => {
  const {myProfileQuery} = useUser();
  const {data: userData} = myProfileQuery;

  const frienListQuery = useQuery({
    queryKey: ['friend'],
    queryFn: () => getFriendList(userData.userId, userData.usertype),
    enabled: !!userData,
  });

  const friendListRequestQuery = useQuery({
    queryKey: ['friend', 'request'],
    queryFn: getFriendRequestList,
    enabled: !!userData,
  });

  const friendRequestMutation = useMutation({
    mutationFn: postFriendRequest,
  });
  const friendResponseMutation = useMutation({
    mutationFn: postFriendResponse,
    onError(error, variables, context) {
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['chat', 'room']});
    },
  });

  return {
    frienListQuery,
    friendListRequestQuery,
    friendRequestMutation,
    friendResponseMutation,
  };
};
