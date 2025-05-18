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
  return (
    <View>
      <ChatRoom
        roomData={{
          id: 'af',
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
        }}
        onPressFn={() => {
          navigation.navigate('Chat', {roomId: 'af'});
        }}
      />
      <Divider color={colors.gray.secondary} />
    </View>
  );
};

export default ChatRoomListScreen;
