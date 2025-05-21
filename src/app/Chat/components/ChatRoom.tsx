import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Profile from '../../../components/Profile';
import Typography from '../../../components/Typography';
import {colors} from '../../../constants/colors';
import {ChatRoomDto} from '../../../types/dto/ChatRoomDto';

interface ChatRoomProps {
  roomData: ChatRoomDto;
  onPressFn: () => void;
}

const getLastTime = (isoTime: string) => {
  const today = new Date();
  const lastDay = new Date(isoTime);

  if (today.getDate() === lastDay.getDate())
    return `${lastDay.getHours()}:${lastDay.getMinutes()}`;
  else {
    return lastDay.getFullYear() === today.getFullYear()
      ? `${lastDay.getMonth() + 1}/${lastDay.getDate()}`
      : `${lastDay.getFullYear()}/${
          lastDay.getMonth() + 1
        }/${lastDay.getDate()}`;
  }
};

const ChatRoom = ({
  roomData: {updatedAt, lastMessage},
  onPressFn,
}: ChatRoomProps) => {
  return (
    <Pressable style={styles.container} onPress={onPressFn}>
      <Profile type="normal" color="red" size={48} />
      <View style={styles.contentWrapper}>
        <View style={styles.roomInfo}>
          <View style={styles.userInfo}>
            <Typography size={12} bold>
              후비적거리는 홍냥이
            </Typography>
            <Typography size={10} color={colors.gray.primary}>
              시각디자인과
            </Typography>
          </View>
          <Typography size={12} color={colors.gray.primary}>
            {getLastTime(updatedAt)}
          </Typography>
        </View>
        <Typography size={12} numberOfLines={1}>
          {lastMessage?.content}
        </Typography>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 18,
    gap: 18,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  contentWrapper: {gap: 10, flex: 1},
  roomInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userInfo: {flexDirection: 'row', alignItems: 'flex-end', gap: 10},
});

export default ChatRoom;
