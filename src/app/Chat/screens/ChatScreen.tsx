import {RouteProp} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {Keyboard, View} from 'react-native';
import {getLastMessages} from '../../../api/chat';
import {ChatstackParamList} from '../../../navigators/ChatNavigator';
import {useStompClient} from '../../../scoket';
import {ChatMessageDto} from '../../../types/dto/ChatMessageDto';
import {useUserStore} from '../../../utils/userStore';
import ChatContents from '../components/ChatContents';
import ChatHeader from '../components/ChatHeader';
import ChatInput from '../components/ChatInput';

interface ChatScreenProps {
  route: RouteProp<ChatstackParamList, 'Chat'>;
}
const ChatScreen = ({route}: ChatScreenProps) => {
  const {roomId} = route.params;
  const {userId} = useUserStore();
  const stompClient = useStompClient();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageDto[]>([].reverse());

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    if (Keyboard.isVisible()) Keyboard.dismiss();
    setIsMenuOpen(prev => !prev);
  };

  const addMessage = useCallback(
    (message: ChatMessageDto | ChatMessageDto[]) => {
      setMessages(prevMessages => {
        if (Array.isArray(message)) return [...message, ...prevMessages];
        else return [message, ...prevMessages];
      });
    },
    [],
  );

  useEffect(() => {
    if (!stompClient) {
      console.warn('STOMP client not available');
      return;
    }
    const getMessages = async () => {
      const lastMessages = await getLastMessages(roomId, userId);
      lastMessages && addMessage(lastMessages);
      console.log(lastMessages);
    };
    getMessages();

    stompClient.onConnect = () => {
      stompClient.subscribe(`/topic/chat.${roomId}`, message => {
        try {
          const receivedMessage = JSON.parse(message.body);
          console.log(receivedMessage);
          addMessage(receivedMessage);
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      });
    };
  }, [roomId, stompClient, addMessage, userId]);

  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <ChatHeader />
      <ChatContents onContentPress={closeMenu} messages={messages} />
      <ChatInput
        isMenuOpen={isMenuOpen}
        roomId={roomId}
        closeMenu={closeMenu}
        toggleMenu={toggleMenu}
        addMessage={addMessage}
      />
    </View>
  );
};

export default ChatScreen;
