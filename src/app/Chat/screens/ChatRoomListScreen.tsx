import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';
import Divider from '../../../components/Divider';
import {colors} from '../../../constants/colors';
import {ChatstackParamList} from '../../../navigators/ChatNavigator';
import ChatRoom from '../components/ChatRoom';

const ChatRoomListScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<ChatstackParamList, 'ChatRoomList'>>();
  const rooms = [
    {
      id: '682061e130f1a002640836eb',
      participants: ['usera', 'userb'],
      createdAt: '2025-05-11T08:37:53.181Z',
      updatedAt: '2025-05-11T08:37:53.190Z',
      lastMessage: null,
      unreadCount: 0,
    },
    {
      id: 'afa',
      participants: ['민수', '준수'],
      createdAt: '',
      updatedAt: '2025-05-09T10:10:53.099Z',
      lastMessage: {
        id: '1',
        roomId: 'string',
        senderId: 'string',
        type: 'TEXT',
        content: '안녕 홍냥아!!!!!',
        s3Key: 'string',
        originalMessageText: 'string',
        correctedText: 'string',
        createdAt: 'string',
        deleted: true,
      },
      unreadCount: 0,
    },
  ];
  return (
    <View>
      {rooms.map((item, idx) => (
        <ChatRoom
          key={`${item}-${idx}`}
          roomData={item}
          onPressFn={() => {
            navigation.navigate('Chat', {roomId: item.id});
          }}
        />
      ))}

      <Divider color={colors.gray.secondary} />
    </View>
  );
};

export default ChatRoomListScreen;
