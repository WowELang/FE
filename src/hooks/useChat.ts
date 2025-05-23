import {useQuery} from '@tanstack/react-query';
import {getMessages, getRoomList} from '../api/chat';

export const useChatMessages = (
  roomId: string,
  userId: string,
  before?: string,
) => {
  const messageQuery = useQuery({
    queryKey: ['chat', 'messages'],
    queryFn: () => getMessages(roomId, userId, before),
    enabled: !!roomId && !!userId,
  });
  return messageQuery;
};

export const useChatRoom = (userId: string) => {
  const roomQuery = useQuery({
    queryKey: ['chat', 'room', userId],
    queryFn: () => getRoomList(userId),
    enabled: !!userId && userId.trim() !== '',
  });
  return roomQuery;
};
