export type MessageType = 'TEXT' | 'IMAGE' | 'CORRECTION';

export interface ChatMessageDto {
  id: string;
  roomId: string;
  senderId: string;
  type: MessageType;
  content: string;
  s3Key: string | null;
  originalMessage: string | null;
  correctedText: string | null;
  createdAt: string;
  deleted: boolean;
}

export type SendMessage = TextMessage | CorrectionMessage | ImageMessage;

type TextMessage = {
  type: 'TEXT';
  content: ChatMessageDto['content'];
};
type CorrectionMessage = {
  type: 'CORRECTION';
  content: ChatMessageDto['content'];
  originalMessage: ChatMessageDto['originalMessage'];
};
type ImageMessage = {
  type: 'IMAGE';
  s3Key: ChatMessageDto['s3Key'];
};
