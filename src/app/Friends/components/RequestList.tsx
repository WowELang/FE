import React, {useEffect, useState} from 'react';

import {FlatList, StyleSheet} from 'react-native';
import {useFriend} from '../../../hooks/useChat';
import RequestItem from './RequestItem';
import RequestModal, {RequestModalProps} from './RequestModal';

const RequestList = () => {
  const [modalState, setModalState] = useState<
    Omit<RequestModalProps, 'closeFn'>
  >({
    isOpen: false,
    nickname: '',
    type: undefined,
  });

  const requestModalHandler = ({
    isOpen,
    nickname,
    type,
  }: Omit<RequestModalProps, 'closeFn'>) => {
    setModalState({isOpen: isOpen, nickname: nickname, type: type});
  };

  const {friendListRequestQuery} = useFriend();
  const {data} = friendListRequestQuery;

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <RequestModal
        isOpen={modalState.isOpen}
        closeFn={() => {
          setModalState({...modalState, isOpen: false});
        }}
        nickname={modalState.nickname}
        type={modalState.type}
      />
      <FlatList
        contentContainerStyle={styles.container}
        data={data}
        renderItem={({item, index}) => (
          <RequestItem
            key={`${item.id}-${index}`}
            userId={item.requesterId}
            requestId={item.id}
            date={item.createdAt}
            modalHandler={requestModalHandler}
          />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 18,
    gap: 12,
  },
});

export default RequestList;
