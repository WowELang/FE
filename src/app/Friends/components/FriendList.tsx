import React from 'react';
import {FlatList} from 'react-native';
import FriendItem from './FriendItem';

const FriendList = () => {
  return (
    <FlatList
      data={[
        {
          name: '홍대앞 규동',
          dept: '일본',
          interests: ['춤', '산책', '등산'],
          date: '3/23',
        },
      ]}
      renderItem={({item}) => (
        <FriendItem
          name={item.name}
          dept={item.dept}
          interests={item.interests}
        />
      )}
    />
  );
};

export default FriendList;
