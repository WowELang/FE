import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Profile from '../../../components/Profile';
import Typography from '../../../components/Typography';
import {CHARACTERCOLOR, CHARACTERMASK} from '../../../constants/character';
import {colors} from '../../../constants/colors';
import {useProfile, useUser} from '../../../hooks/useUser';
import {ChatstackParamList} from '../../../navigators/ChatNavigator';
import {ChatRoomDto} from '../../../types/dto/ChatRoomDto';

interface ChatRoomProps {
  roomData: ChatRoomDto;
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
  roomData: {id, participants, updatedAt, lastMessage},
}: ChatRoomProps) => {
  const navigation =
    useNavigation<StackNavigationProp<ChatstackParamList, 'ChatRoomList'>>();
  const {myProfileQuery} = useUser();
  const {data: myData} = myProfileQuery;
  const otherId =
    parseInt(participants[0]) === myData?.userId
      ? participants[1]
      : participants[0];
  const {data: otherData} = useProfile(parseInt(otherId));

  useEffect(() => {
    console.log('partner', otherId, otherData);
  }, [otherData, otherId]);

  return (
    otherData && (
      <Pressable
        style={styles.container}
        onPress={() => {
          navigation.navigate('Chat', {
            roomId: id,
            partnerData: otherData.result,
          });
        }}>
        <Profile
          type={CHARACTERMASK[otherData?.result.character.maskId]}
          color={CHARACTERCOLOR[otherData?.result.character.colorId]}
          size={48}
        />
        <View style={styles.contentWrapper}>
          <View style={styles.roomInfo}>
            <View style={styles.userInfo}>
              <Typography size={12} bold>
                {otherData.result?.nickname}
              </Typography>
              <Typography size={10} color={colors.gray.primary}>
                {otherData.result?.countryOrMajor}
              </Typography>
            </View>
            <Typography size={12} color={colors.gray.primary}>
              {getLastTime(updatedAt)}
            </Typography>
          </View>
          <Typography size={12} numberOfLines={1}>
            {lastMessage.type === 'IMAGE' ? '(사진)' : lastMessage?.content}
          </Typography>
        </View>
      </Pressable>
    )
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
