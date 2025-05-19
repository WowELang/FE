import React from 'react';
import Tabs from '../../../components/Tabs';
import FriendList from '../components/FriendList';
import RequestList from '../components/RequestList';

const FriendsScreens = () => {
  return (
    <Tabs
      titles={['친구 찾기', '받은 요청함']}
      contents={[<FriendList />, <RequestList />]}
    />
  );
};

export default FriendsScreens;
