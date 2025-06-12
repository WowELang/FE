import {useMutation, useQuery} from '@tanstack/react-query';
import {getImage, getMessages, getRoomList, postImage} from '../api/chat';
import {MessageType} from '../types/dto/ChatMessageDto';
import {useAuth} from './useAuth';

export const useChatMessages = (roomId: string, before?: string) => {
  const {userProfileQuery} = useAuth();
  const {data: userData} = userProfileQuery;
  const messageQuery = useQuery({
    queryKey: ['chat', 'messages'],
    queryFn: () => getMessages(roomId, before),
    enabled: !!roomId && !!userData?.userId,
  });
  return messageQuery;
};

export const useChatRoom = () => {
  const {userProfileQuery} = useAuth();
  const {data: userData} = userProfileQuery;
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
