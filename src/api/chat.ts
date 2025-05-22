import axios from 'axios';
import {ChatMessageDto} from '../types/dto/ChatMessageDto';
import {ChatRoomDto} from '../types/dto/ChatRoomDto';

export const getMessages = async (
  roomId: string,
  userId: string,
  before?: string,
): Promise<ChatMessageDto[]> => {
  const {data} = await axios.get(
    `http://3.39.215.81:8080/rooms/${roomId}/messages${
      before ? `?before=${before}` : ''
    }`,
    {
      headers: {'X-User-Id': userId},
    },
  );
  return data;
};

export const getRoomList = async (userId: string): Promise<ChatRoomDto[]> => {
  const {data} = await axios.get(`http://3.39.215.81:8080/rooms`, {
    headers: {'X-User-Id': userId},
  });
  return data;
};
