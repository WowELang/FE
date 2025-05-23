import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect} from 'react';
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
  const userId = userProfileQuery.data?.userId;
  const roomQuery = useChatRoom(userId ? String(userId) : '');
  const {data, refetch, isLoading, error} = roomQuery;
  
  useEffect(() => {
    console.log('ChatRoomListScreen - userId:', userId);
    console.log('ChatRoomListScreen - roomQuery data:', data);
    console.log('ChatRoomListScreen - roomQuery error:', error);
    console.log('ChatRoomListScreen - roomQuery isLoading:', isLoading);
  }, [userId, data, error, isLoading]);
  
  useFocusEffect(() => {
    if (userId) {
      refetch();
    }
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
