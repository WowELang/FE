import {RouteProp} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Keyboard, View} from 'react-native';
import {getMessages} from '../../../api/chat';
import {useAuth} from '../../../hooks/useAuth';
import {ChatstackParamList} from '../../../navigators/ChatNavigator';
import {useStompClient} from '../../../scoket';
import {ChatMessageDto} from '../../../types/dto/ChatMessageDto';
import ChatContents from '../components/ChatContents';
import ChatHeader from '../components/ChatHeader';
import ChatInput from '../components/ChatInput';

interface ChatScreenProps {
  route: RouteProp<ChatstackParamList, 'Chat'>;
}

const ChatScreen = ({route}: ChatScreenProps) => {
  const {roomId} = route.params;
  const {userProfileQuery} = useAuth();
  const {data} = userProfileQuery;
  const stompClient = useStompClient();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageDto[]>([]);

  const subscriptionRef = useRef<any>(null);

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
        if (Array.isArray(message)) {
          return [...message, ...prevMessages];
        } else {
          return [message, ...prevMessages];
        }
      });
    },
    [],
  );

  const reachStart = async () => {};

  // 초기 메시지 로드
  useEffect(() => {
    const loadInitialMessages = async () => {
      try {
        const initialMessages = await getMessages(roomId, 'usera');
        if (initialMessages && initialMessages.length > 0) {
          setMessages(initialMessages);
        }
      } catch (error) {
        console.error('Error loading initial messages:', error);
      } finally {
      }
    };

    loadInitialMessages();
  }, [roomId, data?.userId]);

  // STOMP 연결 및 구독
  useEffect(() => {
    if (!stompClient) {
      console.warn('STOMP client not available');
      return;
    }

    const setupSubscription = () => {
      // 이미 구독 중이면 먼저 해제
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }

      // 새로운 구독 설정
      subscriptionRef.current = stompClient.subscribe(
        `/topic/chat.${roomId}`,
        message => {
          try {
            const receivedMessage = JSON.parse(message.body);
            console.log('Received message:', receivedMessage);
            addMessage(receivedMessage);
          } catch (error) {
            console.error('Error parsing message:', error);
          }
        },
      );
    };

    // STOMP 클라이언트가 이미 연결되어 있는 경우
    if (stompClient.connected) {
      setupSubscription();
    } else {
      // 연결되지 않은 경우, onConnect 핸들러 설정
      stompClient.onConnect = () => {
        console.log('STOMP connected');
        setupSubscription();
      };

      // 연결 시도
      stompClient.activate();
    }

    // 클린업 함수
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
    };
  }, [roomId, stompClient, addMessage]);

  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <ChatHeader />
      <ChatContents
        onContentPress={closeMenu}
        messages={messages}
        reachFn={reachStart}
      />
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
