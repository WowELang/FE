type MessageType = 'TEXT' | 'IMAGE' | 'CORRECTION';

export interface ChatMessageDto {
  id: string;
  roomId: string;
  senderId: string;
  type: MessageType;
  content: string;
  s3Key: string | null;
  originalMessageText: string | null;
  correctedText: string | null;
  createdAt: string;
  deleted: boolean;
}
