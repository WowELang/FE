import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Modal, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {TwoBins} from '../../../assets';
import ConfirmButton from '../../../components/ConfirmButton';
import Typography from '../../../components/Typography';
import {colors} from '../../../constants/colors';
import {ChatstackParamList} from '../../../navigators/ChatNavigator';
import {RootStackParamList} from '../../../navigators/RootNavigator';

export type RequestModalType = 'Accept' | 'Reject' | undefined;

export interface RequestModalProps {
  isOpen: boolean;
  nickname: string;
  type: RequestModalType;
  closeFn: () => void;
}

const RequestModal = ({isOpen, closeFn, nickname, type}: RequestModalProps) => {
  const navigation =
    useNavigation<
      CompositeNavigationProp<
        BottomTabNavigationProp<RootStackParamList, 'Friends'>,
        StackNavigationProp<ChatstackParamList>
      >
    >();
  return (
    <Modal visible={isOpen} transparent onRequestClose={closeFn}>
      <TouchableWithoutFeedback onPress={closeFn}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {
              <Typography size={12} bold color={colors.blue.primary}>
                {type === 'Accept' ? '새로운 매칭!' : '새로운 친구'}
              </Typography>
            }
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                }}>
                <Typography size={24} bold>
                  {nickname + ' '}
                </Typography>
                <Typography size={16} style={{}}>
                  님{type === 'Accept' ? '과' : '의'}
                </Typography>
              </View>
              <Typography size={16} style={{}}>
                {type === 'Accept'
                  ? '친구가 되었어요!'
                  : '친구 요청을 거절하시겠어요?'}
              </Typography>
            </View>
            {type === 'Accept' && (
              <View style={styles.accecptImageBox}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Typography size={12}>이제 </Typography>
                  <Typography size={12} bold>
                    채팅 목록
                  </Typography>
                  <Typography size={12}>에서</Typography>
                </View>
                <Typography size={12}>
                  {nickname}님을 찾을 수 있어요.
                </Typography>
                <TwoBins />
              </View>
            )}
            {type === 'Accept' ? (
              <ConfirmButton
                title="채팅 바로 시작하기"
                active
                handlerFn={() => {
                  closeFn();
                  setTimeout(() => {
                    navigation.navigate('ChatNav', {screen: 'ChatRoomList'});
                  }, 200);
                }}
              />
            ) : (
              <View style={{gap: 10}}>
                <ConfirmButton
                  title="다시 한 번 생각해볼게요."
                  active
                  handlerFn={() => {}}
                />
                <ConfirmButton
                  title="네, 친구를 거부할게요."
                  handlerFn={() => {}}
                />
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: 'center',
    gap: 22,
  },
  accecptImageBox: {
    paddingHorizontal: 20,
    paddingTop: 13,
    backgroundColor: colors.gray.secondary,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default RequestModal;
