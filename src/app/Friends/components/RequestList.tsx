import React, {useState} from 'react';

import {FlatList, StyleSheet} from 'react-native';
import RequestItem from './RequestItem';
import RequestModal, {RequestModalProps} from './RequestModal';

const RequestList = () => {
  const [modalState, setModalState] = useState<
    Omit<RequestModalProps, 'closeFn'>
  >({
    isOpen: false,
    name: '',
    type: undefined,
  });

  const requestModalHandler = ({
    isOpen,
    name,
    type,
  }: Omit<RequestModalProps, 'closeFn'>) => {
    setModalState({isOpen: isOpen, name: name, type: type});
  };

  return (
    <>
      <RequestModal
        isOpen={modalState.isOpen}
        closeFn={() => {
          setModalState({...modalState, isOpen: false});
        }}
        name={modalState.name}
        type={modalState.type}
      />
      <FlatList
        contentContainerStyle={styles.container}
        data={[
          {
            name: '맛있는 돈카츠',
            dept: '일본',
            interests: ['노래방', '맛집', '여행', '요리'],
            date: '5/18',
          },
        ]}
        renderItem={({item, index}) => (
          <RequestItem
            key={`${item}-${index}`}
            name={item.name}
            dept={item.dept}
            interests={item.interests}
            date={item.date}
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
