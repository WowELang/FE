import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {useFriend} from '../../../hooks/useChat';
import FriendItem from './FriendItem';

const FriendList = () => {
  const {frienListQuery} = useFriend();
  const {data, error} = frienListQuery;
  useEffect(() => {
    console.log(data);
    console.log(error);
  });
  return (
    <FlatList
      data={data}
      renderItem={({item}) => (
        <FriendItem
          id={item.userId}
          name={item.nickname}
          major={item.major}
          interests={item.interest}
          character={{colorId: item.color, maskId: item.mask}}
        />
      )}
    />
  );
};

export default FriendList;
