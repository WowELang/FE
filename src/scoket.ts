import {Client} from '@stomp/stompjs';
import {useEffect, useRef} from 'react';
import {useAuth} from './hooks/useAuth';

export const useStompClient = () => {
  const stompClientRef = useRef<Client | null>(null);
  const {userProfileQuery} = useAuth();
  const {data} = userProfileQuery;

  useEffect(() => {
    if (!data?.userId) {
      console.warn('No userId available, skipping STOMP connection');
      return;
    }

    console.log('Initializing STOMP client with userId:', data.userId);
    
    const stompClient = new Client({
      brokerURL: 'ws://3.39.215.81:8080/chat-websocket',
      connectHeaders: {
        'X-User-Id': String(data.userId),
      },
      // 이제 heartbeat 옵션은 무시해도 됩니다.
      reconnectDelay: 5000,
      connectionTimeout: 10000,
      debug: msg => console.log('STOMP:', msg),
    });

    stompClient.onConnect = () => {
      console.log('STOMP connected successfully');
    };

    stompClient.onStompError = frame => {
      console.error('STOMP Error:', frame.headers, frame.body);
    };
    
    stompClient.onWebSocketError = (error) => {
      console.error('WebSocket Error:', error);
    };

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      if (stompClient.active) {
        console.log('Deactivating STOMP client');
        stompClient.deactivate();
      }
    };
  }, [data?.userId]);

  return stompClientRef.current;
};
