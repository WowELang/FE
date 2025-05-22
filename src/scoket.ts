import {Client} from '@stomp/stompjs';
import {useEffect, useRef} from 'react';
import {useAuth} from './hooks/useAuth';

export const useStompClient = () => {
  const stompClientRef = useRef<Client | null>(null);
  const {userProfileQuery} = useAuth();
  const {data} = userProfileQuery;

  useEffect(() => {
    const stompClient = new Client({
      brokerURL: 'ws://3.39.215.81:8080/chat-websocket',
      connectHeaders: {
        'X-User-Id': 'usera',
      },
      // 이제 heartbeat 옵션은 무시해도 됩니다.
      reconnectDelay: 5000,
      connectionTimeout: 10000,
      debug: msg => console.log('STOMP:', msg),
    });

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
  }, [data.userId]);

  return stompClientRef.current;
};
