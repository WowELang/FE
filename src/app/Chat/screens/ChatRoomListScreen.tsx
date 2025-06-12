import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';
import Divider from '../../../components/Divider';
import Typography from '../../../components/Typography';
import {colors} from '../../../constants/colors';
import {useChatRoom} from '../../../hooks/useChat';
import {ChatstackParamList} from '../../../navigators/ChatNavigator';
import ChatRoom from '../components/ChatRoom';

const ChatRoomListScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<ChatstackParamList, 'ChatRoomList'>>();

  const roomQuery = useChatRoom();
  const {data, refetch} = roomQuery;

  useFocusEffect(() => {
    refetch();
  });

  return roomQuery.isSuccess ? (
    <View>
      {data &&
        data.map((item, idx) => (
          <ChatRoom key={`${item}-${idx}`} roomData={item} />
        ))}

      <Divider color={colors.gray.secondary} />
    </View>
  ) : (
    <View>
      <Typography size={30}>에러 발생!</Typography>
    </View>
  );
};

export default ChatRoomListScreen;
