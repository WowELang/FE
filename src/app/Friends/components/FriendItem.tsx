import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Mail, MailCheck} from '../../../assets';
import Profile from '../../../components/Profile';
import Typography from '../../../components/Typography';
import {colors} from '../../../constants/colors';

interface FriendItemProps {
  name: string;
  dept: string;
  interests: string[];
}

const FriendItem = ({name, dept, interests}: FriendItemProps) => {
  const [isSent, setIsSent] = useState(false);

  return (
    <View style={styles.box}>
      <View style={{flexDirection: 'row', gap: 22}}>
        <Profile type="normal" color="brown" size={60} />
        <View style={{gap: 10}}>
          <Typography size={16} bold>
            {name}
          </Typography>
          <Typography size={16} color={colors.gray.primary}>
            {dept}
          </Typography>
          <View style={{flexDirection: 'row', gap: 2}}>
            {interests.map((item, idx) => (
              <Typography key={`${item}-${idx}`} size={10} style={styles.tag}>
                {item}
              </Typography>
            ))}
          </View>
        </View>
      </View>
      {isSent ? (
        <View style={{alignItems: 'center'}}>
          <MailCheck fill={colors.blue.primary} />
          <Typography size={8} color={colors.blue.primary} bold>
            신청완료
          </Typography>
        </View>
      ) : (
        <Pressable
          style={{alignItems: 'center'}}
          onPress={() => {
            setIsSent(true);
          }}>
          <Mail fill={colors.gray.primary} />
          <Typography size={8} color={colors.gray.primary} bold>
            채팅신청
          </Typography>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 22,
    borderBottomWidth: 1,
    borderColor: colors.gray.primary,
    backgroundColor: colors.white,
  },
  tag: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.blue.secondary,
    borderRadius: 20,
  },
});

export default FriendItem;
