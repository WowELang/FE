import React, {useEffect, useState} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Next, Picture} from '../../../assets';
import Profile from '../../../components/Profile';
import Typography from '../../../components/Typography';
import {CHARACTERCOLOR, CHARACTERMASK} from '../../../constants/character';
import {colors} from '../../../constants/colors';
import {useAuth} from '../../../hooks/useAuth';
import {useSendImage} from '../../../hooks/useChat';
import {useStompClient} from '../../../socket';
import {ChatMessageDto, SendMessage} from '../../../types/dto/ChatMessageDto';
import {useMessageStore} from '../../../utils/messageStore';

interface ChatInputProps {
  isMenuOpen: boolean;
  roomId: string;
  closeMenu: () => void;
  toggleMenu: () => void;
  addMessage: (message: ChatMessageDto) => void;
}

const ChatInput = ({
  isMenuOpen,
  roomId,
  closeMenu,
  toggleMenu,
}: ChatInputProps) => {
  const {correctMessage, removeMessage} = useMessageStore(state => state);
  const [input, setInput] = useState('');
  const [ImageModalOpen, setImageModalOpen] = useState(false);

  const stompClient = useStompClient();
  const {userProfileQuery} = useAuth();
  const {data: userData} = userProfileQuery;
  const imageMutation = useSendImage();
  const {data: imageUrl, mutate: imageMutate} = imageMutation;

  const sendMessage = (messagePayload: SendMessage) => {
    if (stompClient && stompClient.active && roomId && userData) {
      stompClient.publish({
        destination: `/app/chat.send.${roomId}`,
        body: JSON.stringify(messagePayload),
      });
      console.log('Sent message:', messagePayload);
    }
  };

  const openGallery = () => {
    launchImageLibrary({mediaType: 'mixed', selectionLimit: 1}, response => {
      if (response.assets) imageMutate(response.assets[0]);
    });
  };
  const openCamera = () => {
    launchCamera({mediaType: 'mixed'}, response => {
      if (response.assets) imageMutate(response.assets[0]);
    });
  };

  useEffect(() => {
    setInput(correctMessage ? correctMessage.content : '');
  }, [correctMessage]);

  useEffect(() => {
    sendMessage({type: 'IMAGE', s3Key: imageUrl});
  }, [imageUrl]);

  return (
    userData && (
      <View style={styles.container}>
        <Modal
          visible={ImageModalOpen}
          transparent
          onRequestClose={() => {
            setImageModalOpen(false);
          }}>
          <TouchableWithoutFeedback
            style={{}}
            onPress={() => {
              setImageModalOpen(false);
            }}>
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,0.4)',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {
                <View style={{backgroundColor: colors.white, borderRadius: 20}}>
                  <Pressable
                    style={({pressed}) => ({
                      paddingHorizontal: 82,
                      paddingVertical: 26,
                      backgroundColor: pressed
                        ? colors.blue.secondary
                        : colors.white,
                      borderTopRightRadius: 20,
                      borderTopLeftRadius: 20,
                    })}
                    onPress={openGallery}>
                    <Typography size={16} bold>
                      사진첩 열기
                    </Typography>
                  </Pressable>
                  <Pressable
                    style={({pressed}) => ({
                      paddingHorizontal: 82,
                      paddingVertical: 26,
                      backgroundColor: pressed
                        ? colors.blue.secondary
                        : colors.white,
                      borderBottomRightRadius: 20,
                      borderBottomLeftRadius: 20,
                    })}
                    onPress={openCamera}>
                    <Typography size={16} bold>
                      카메라 열기
                    </Typography>
                  </Pressable>
                </View>
              }
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <View style={styles.contentWrapper}>
          <Pressable onPress={toggleMenu}>
            <Profile
              type={CHARACTERMASK[userData.character.maskId]}
              color={CHARACTERCOLOR[userData.character.colorId]}
              size={24}
            />
          </Pressable>
          <View style={styles.divider} />
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={text => {
              setInput(text);
            }}
            multiline
            placeholder="채팅을 입력하세요."
            placeholderTextColor={colors.gray.primary}
            onFocus={closeMenu}
          />
          <Pressable
            onPress={() => {
              sendMessage({
                type: correctMessage ? 'CORRECTION' : 'TEXT',
                content: input,
                originalMessage: correctMessage && correctMessage.content,
              });
              setInput('');
              removeMessage();
            }}>
            <Next fill={colors.gray.primary} width={24} height={24} />
          </Pressable>
        </View>
        {isMenuOpen && (
          <Pressable
            style={styles.pictureBtn}
            onPress={() => {
              setImageModalOpen(true);
            }}>
            <Picture fill={colors.black.primary} />
            <Typography size={12} bold>
              사진 보내기
            </Typography>
          </Pressable>
        )}
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue.secondary,
    paddingVertical: 10,
    paddingHorizontal: 18,
    gap: 16,
  },
  contentWrapper: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  divider: {
    height: 14,
    width: 1,
    backgroundColor: colors.black.primary,
  },
  input: {
    flex: 1,
    fontSize: 12,
    paddingBottom: 5,
  },
  pictureBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 5,
    paddingVertical: 28,
  },
});

export default ChatInput;
