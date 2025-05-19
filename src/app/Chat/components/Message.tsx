import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Divider from '../../../components/Divider';
import Profile from '../../../components/Profile';
import Typography from '../../../components/Typography';
import {colors} from '../../../constants/colors';
import {ChatMessageDto} from '../../../types/dto/ChatMessageDto';
import {useMessageStore} from '../utils/messageStore';

type MessageProps = {
  isMine?: boolean;
  head?: boolean;
  message: ChatMessageDto;
  onLongPress: () => void;
};

const Message = ({isMine, head, message, onLongPress}: MessageProps) => {
  const correctMessage = useMessageStore(state => state.correctMessage);
  const addCorrectMessage = useMessageStore(state => state.addCorrectMessage);

  const correctState = correctMessage?.id === message.id;

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
            맛있는 돈카츠
          </Typography>
        </View>
      )}
      <View>
        <Pressable
          onLongPress={() => {
            !isMine && addCorrectMessage(message);
            onLongPress();
          }}
          style={[
            styles.messageBox,
            {
              borderTopLeftRadius: !isMine && head ? 0 : 20,
              borderBottomRightRadius: isMine && head ? 0 : 20,
              backgroundColor:
                correctState || message.type === 'CORRECTION'
                  ? colors.blue.secondary
                  : colors.white,
            },
            (correctState || message.type === 'CORRECTION') && {
              borderWidth: 1,
              borderColor: colors.blue.primary,
            },
          ]}>
          {message.type === 'CORRECTION' && (
            <View>
              <Typography size={10} bold style={{marginBottom: 3}}>
                의문스러운 와우의 채팅 교정
              </Typography>
              <Typography size={10} color={colors.gray.primary}>
                {message.content}
              </Typography>
              <Divider
                color={colors.gray.secondary}
                style={{marginVertical: 10}}
              />
            </View>
          )}
          <Typography
            size={12}
            color={
              message.type === 'CORRECTION'
                ? colors.blue.primary
                : colors.black.primary
            }>
            {message.type === 'CORRECTION'
              ? message.correctedText
              : message.content}
          </Typography>
        </Pressable>
        {correctState && (
          <Pressable
            style={{marginLeft: 40, marginTop: 5, alignItems: 'center'}}>
            <Typography size={12} color={colors.blue.primary}>
              교정 중
            </Typography>
          </Pressable>
        )}
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
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    maxWidth: 240,
  },
});

export default Message;
