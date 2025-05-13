import {ChatMessageDto} from './ChatMessageDto';

export interface ChatRoomDto {
  id: string;
  participants: string[];
  createdAt: string;
  updatedAt: string;
  lastMessage: ChatMessageDto;
  unreadCount: number;
}
