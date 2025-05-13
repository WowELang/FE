import React from 'react';
import {StyleSheet, View} from 'react-native';
import Profile from '../../../components/Profile';
import Typography from '../../../components/Typography';
import {colors} from '../../../constants/colors';

type MessageProps = {
  isMine?: boolean;
  head?: boolean;
  text: string;
};

const Message = ({isMine, head, text}: MessageProps) => {
  return (
    <View
      style={[
        styles.profileContainer,
        {alignItems: isMine ? 'flex-end' : 'flex-start'},
      ]}>
      {!isMine && head && (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
          <Profile type="normal" color="pink" size={36} />
          <Typography size={12} bold>
            의문스러운 와우
          </Typography>
        </View>
      )}
      <View
        style={[
          styles.messageBox,
          {
            borderTopLeftRadius: !isMine && head ? 0 : 20,
            borderBottomRightRadius: isMine && head ? 0 : 20,
          },
        ]}>
        <Typography size={12}>{text}</Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    marginTop: 6,
    paddingHorizontal: 20,
  },
  messageBox: {
    marginLeft: 40,
    paddingHorizontal: 14,
    paddingVertical: 17,
    backgroundColor: colors.white,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    maxWidth: 240,
  },
});

export default Message;
