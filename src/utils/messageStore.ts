import {create} from 'zustand';
import {ChatMessageDto} from '../types/dto/ChatMessageDto';

interface MessageStore {
  correctMessage: ChatMessageDto | undefined;
  addCorrectMessage: (message: ChatMessageDto) => void;
  removeMessage: () => void;
}

export const useMessageStore = create<MessageStore>(set => ({
  correctMessage: undefined,
  addCorrectMessage: (message: ChatMessageDto) =>
    set({correctMessage: message}),
  removeMessage: () => {
    set({correctMessage: undefined});
  },
}));
