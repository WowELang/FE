import axios from 'axios';
import {ChatMessageDto} from '../types/dto/ChatMessageDto';

export const getLastMessages = async (
  roomId: string,
  userId: string,
  before?: string,
) => {
  try {
    const {data} = await axios.get<ChatMessageDto[]>(
      `http://3.39.215.81:8080/rooms/${roomId}/messages}`,
      {
        headers: {'X-User-Id': userId},
      },
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
