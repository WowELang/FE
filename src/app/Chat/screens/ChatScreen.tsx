import React, {useState} from 'react';
import {Keyboard, View} from 'react-native';
import {ChatMessageDto} from '../../../types/dto/ChatMessageDto';
import ChatContents from '../components/ChatContents';
import ChatHeader from '../components/ChatHeader';
import ChatInput from '../components/ChatInput';

const ChatScreen = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageDto[]>(
    [
      {
        id: 'string',
        roomId: 'string',
        senderId: 'string',
        type: 'TEXT',
        content: '안녕 반가워 나는 김준수라고 해 오늘 축제라서 기분이 좋아~~',
        s3Key: 'string',
        originalMessageText: 'string',
        correctedText: 'string',
        createdAt: '2025-05-01',
        deleted: false,
      },
    ].reverse(),
  );

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    if (Keyboard.isVisible()) Keyboard.dismiss();
    setIsMenuOpen(prev => !prev);
  };

  const addMessage = (message: ChatMessageDto) => {
    setMessages([...messages.reverse(), message].reverse());
  };

  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <ChatHeader />
      <ChatContents onContentPress={closeMenu} messages={messages} />
      <ChatInput
        isMenuOpen={isMenuOpen}
        closeMenu={closeMenu}
        toggleMenu={toggleMenu}
        addMessage={addMessage}
      />
    </View>
  );
};

export default ChatScreen;
