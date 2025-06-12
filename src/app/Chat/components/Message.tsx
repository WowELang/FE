import React, {useEffect, useRef, useState} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import Divider from '../../../components/Divider';
import Profile from '../../../components/Profile';
import Typography from '../../../components/Typography';
import {colors} from '../../../constants/colors';
import {useReceiveImage} from '../../../hooks/useChat';
import {ChatMessageDto} from '../../../types/dto/ChatMessageDto';
import {useMessageStore} from '../../../utils/messageStore';

type MessageProps = {
  isMine?: boolean;
  head?: boolean;
  message: ChatMessageDto;
  onLongPress: () => void;
};

const MAX_IMAGE_WIDTH = 200;

const Message = ({isMine, head, message, onLongPress}: MessageProps) => {
  const correctMessage = useMessageStore(state => state.correctMessage);
  const addCorrectMessage = useMessageStore(state => state.addCorrectMessage);

  const correctState = correctMessage?.id === message.id;
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const imageDimensionsRef = useRef(new Map());

  const {data: imageData} = useReceiveImage(message.type, message.s3Key);
  useEffect(() => {
    if (imageData && !imageDimensionsRef.current.has(imageData.data.url)) {
      Image.getSize(
        imageData.data.url,
        (width, height) => {
          const aspectRatio = height / width;
          let displayWidth = Math.min(width, MAX_IMAGE_WIDTH);
          let displayHeight = displayWidth * aspectRatio;

          // 높이가 너무 길면 높이 기준으로 재조정
          const MAX_HEIGHT = 400;
          if (displayHeight > MAX_HEIGHT) {
            displayHeight = MAX_HEIGHT;
            displayWidth = displayHeight / aspectRatio;
          }
          imageDimensionsRef.current.set(imageData.data.url, {
            width: displayWidth,
            height: displayHeight,
          });

          setImageDimensions({
            width: displayWidth,
            height: displayHeight,
          });
        },
        // ... error callback
      );
    } else if (imageDimensionsRef.current.has(imageData?.data.url)) {
      setImageDimensions(imageDimensionsRef.current.get(imageData?.data.url));
    }
  }, [imageData]);
  useEffect(() => {
    console.log('message::::::::', message);
  });
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
            {message.senderId}
          </Typography>
        </View>
      )}
      {imageData ? (
        <Image
          src={imageData.data.url}
          style={{
            width: imageDimensions?.width,
            height: imageDimensions?.height,
            maxHeight: 500,
            borderRadius: 5,
          }}
          resizeMode="contain"
        />
      ) : (
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
                  {message.senderId}의 채팅 교정
                </Typography>
                <Typography size={10} color={colors.gray.primary}>
                  {message.originalMessage}
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
              {message.content}
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
      )}
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
