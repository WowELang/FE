import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ChatRoomListScreen from '../app/Chat/screens/ChatRoomListScreen';
import ChatScreen from '../app/Chat/screens/ChatScreen';
import {OtherUserProfileResponse} from '../types/dto/UserProfileDto';

export type ChatstackParamList = {
  ChatRoomList: undefined;
  Chat: {roomId: string; partnerData: OtherUserProfileResponse};
};
const ChatStack = createStackNavigator<ChatstackParamList>();
const ChatNavigator = () => {
  return (
    <ChatStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="ChatRoomList">
      <ChatStack.Screen name={'ChatRoomList'} component={ChatRoomListScreen} />
      <ChatStack.Screen name={'Chat'} component={ChatScreen} />
    </ChatStack.Navigator>
  );
};

export default ChatNavigator;
