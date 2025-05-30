import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View} from 'react-native';
import Divider from '../../../components/Divider';
import {colors} from '../../../constants/colors';
import {useAuth} from '../../../hooks/useAuth';
import {useChatRoom} from '../../../hooks/useChat';
import {ChatstackParamList} from '../../../navigators/ChatNavigator';
import ChatRoom from '../components/ChatRoom';

const ChatRoomListScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<ChatstackParamList, 'ChatRoomList'>>();
  const {userProfileQuery} = useAuth();
  const roomQuery = useChatRoom(userProfileQuery.data?.userId);
  const {data, refetch} = roomQuery;

  useFocusEffect(() => {
    refetch();
  });
  return (
    <View>
      {data &&
        data.map((item, idx) => (
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
