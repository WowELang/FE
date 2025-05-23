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
          // 배열로 전달된 경우 (초기 메시지 로드)
          return [...message, ...prevMessages];
        } else {
          // 단일 메시지인 경우
          let updatedMessages = [...prevMessages];
          
          // 서버에서 온 실제 메시지인 경우 (temp-로 시작하지 않는 ID)
          if (!message.id.startsWith('temp-')) {
            // 같은 내용의 임시 메시지가 있다면 제거
            updatedMessages = updatedMessages.filter(existingMessage => 
              !(existingMessage.id.startsWith('temp-') && 
                existingMessage.content === message.content && 
                existingMessage.senderId === message.senderId)
            );
          }
          
          // 중복 체크 (동일한 ID 또는 매우 유사한 메시지)
          const isDuplicate = updatedMessages.some(existingMessage => 
            existingMessage.id === message.id
          );
          
          if (isDuplicate) {
            console.log('Duplicate message detected, skipping:', message);
            return prevMessages;
          }
          
          return [message, ...updatedMessages];
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
        const initialMessages = await getMessages(roomId, String(data?.userId || ''));
        if (initialMessages && initialMessages.length > 0) {
          setMessages(initialMessages);
        }
      } catch (error) {
        console.error('Error loading initial messages:', error);
      } finally {
      }
    };

    if (data?.userId) {
      loadInitialMessages();
    }
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
