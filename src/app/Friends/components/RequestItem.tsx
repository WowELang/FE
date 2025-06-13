import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {queryClient} from '../../../../App';
import Profile from '../../../components/Profile';
import Typography from '../../../components/Typography';
import {CHARACTERCOLOR, CHARACTERMASK} from '../../../constants/character';
import {colors} from '../../../constants/colors';
import {useFriend} from '../../../hooks/useChat';
import {useProfile} from '../../../hooks/useUser';
import {RequestModalProps} from './RequestModal';

interface RequestItemProps {
  requestId: string;
  userId: number;
  date: string;
  modalHandler: ({
    isOpen,
    nickname,
    type,
  }: Omit<RequestModalProps, 'closeFn'>) => void;
}

const RequestItem = ({
  requestId,
  userId,
  date,
  modalHandler,
}: RequestItemProps) => {
  const {friendResponseMutation} = useFriend();
  const {mutate} = friendResponseMutation;
  const {data} = useProfile(userId);
  const translatedDate = new Date(date);

  return (
    data && (
      <View style={styles.box}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', gap: 22}}>
            <Profile
              size={60}
              color={CHARACTERCOLOR[data.result.character.colorId]}
              type={CHARACTERMASK[data.result.character.maskId]}
            />
            <View style={{gap: 10}}>
              <Typography size={16} bold numberOfLines={1} style={{width: 180}}>
                {data.result.nickname}
              </Typography>
              <Typography size={16} color={colors.gray.primary}>
                {data.result?.countryOrMajor}
              </Typography>
              <View style={{flexDirection: 'row', gap: 2}}>
                {data.result.interests.map((item, idx) => (
                  <Typography
                    key={`${item.name}-${idx}`}
                    size={10}
                    style={styles.tag}>
                    {item.name}
                  </Typography>
                ))}
              </View>
            </View>
          </View>
          <Typography size={12} color={colors.gray.primary}>
            {`${translatedDate.getMonth() + 1}/${translatedDate.getDate()}`}
          </Typography>
        </View>
        <View style={{flexDirection: 'row', gap: 4}}>
          <Pressable
            style={[styles.button, {backgroundColor: colors.blue.primary}]}
            onPress={() => {
              mutate({requestId: requestId, state: 'accept'});
              modalHandler({
                isOpen: true,
                nickname: data.result.nickname,
                type: 'Accept',
              });
            }}>
            <Typography size={12} color={colors.white} bold>
              수락
            </Typography>
          </Pressable>
          <Pressable
            style={[styles.button, {backgroundColor: colors.gray.primary}]}
            onPress={() => {
              mutate({requestId: requestId, state: 'reject'});
              queryClient.invalidateQueries({queryKey: ['friend', 'request']});
              modalHandler({
                isOpen: true,
                nickname: data.result.nickname,
                type: 'Reject',
              });
            }}>
            <Typography size={12} color={colors.white} bold>
              거부
            </Typography>
          </Pressable>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: colors.white,
    gap: 16,
  },
  tag: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.blue.secondary,
    borderRadius: 20,
  },
  button: {
    flexDirection: 'row',
    paddingHorizontal: 62,
    paddingVertical: 10,
    borderRadius: 10,
  },
});

export default RequestItem;
