import {create} from 'zustand';
import {ChatMessageDto} from '../types/dto/ChatMessageDto';

interface MessageStore {
  correctMessage: ChatMessageDto | null;
  addCorrectMessage: (message: ChatMessageDto) => void;
  removeMessage: () => void;
}

export const useMessageStore = create<MessageStore>(set => ({
  correctMessage: null,
  addCorrectMessage: (message: ChatMessageDto) =>
    set({correctMessage: message}),
  removeMessage: () => {
    set({correctMessage: null});
  },
}));
