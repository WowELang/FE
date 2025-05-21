import {Client} from '@stomp/stompjs';
import {useEffect, useRef} from 'react';
import {useUserStore} from './utils/userStore';

export const useStompClient = () => {
  const {userId} = useUserStore();
  const stompClientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!userId || userId.trim() === '') {
      console.warn('No valid userId available, skipping STOMP connection');
      return;
    }

    console.log('Initializing STOMP client with userId:', userId);
    const stompClient = new Client({
      brokerURL: 'ws://3.39.215.81:8080/chat-websocket',
      connectHeaders: {
        'X-User-Id': userId,
      },
      // 이제 heartbeat 옵션은 무시해도 됩니다.
      reconnectDelay: 5000,
      connectionTimeout: 10000,
      debug: msg => console.log('STOMP:', msg),
    });

    stompClient.onConnect = () => {
      console.log('stomp server connected');
    };
    stompClient.onStompError = frame => {
      console.error('STOMP Error:', frame.headers, frame.body);
    };
    stompClient.onWebSocketError = () => {
      console.log('웹소켓 에러');
    };

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      if (stompClient.active) {
        stompClient.deactivate();
      }
    };
  }, [userId]);

  return stompClientRef.current;
};
