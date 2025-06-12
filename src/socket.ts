import {Client} from '@stomp/stompjs';
import {useEffect, useRef} from 'react';
import {useUser} from './hooks/useUser';

export const useStompClient = () => {
  const stompClientRef = useRef<Client | null>(null);
  const {myProfileQuery} = useUser();
  const {data: userData} = myProfileQuery;

  useEffect(() => {
    if (!userData) {
      console.log('There is no user!');
      return;
    }
    const stompClient = new Client({
      brokerURL: 'ws://3.39.215.81:8080/chat-websocket',
      connectHeaders: {
        'X-User-Id': userData?.userId.toString(),
      },
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
  }, [userData]);

  return stompClientRef.current;
};
