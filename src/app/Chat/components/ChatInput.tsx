import React, {useEffect, useState} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
// import {TextInput} from 'react-native-gesture-handler'; // TextInput from react-native is preferred
import {Next, Picture} from '../../../assets';
import Profile from '../../../components/Profile';
import Typography from '../../../components/Typography';
import {colors} from '../../../constants/colors';
import {ChatMessageDto} from '../../../types/dto/ChatMessageDto';
import {useMessageStore} from '../utils/messageStore';

interface ChatInputProps {
  isMenuOpen: boolean;
  closeMenu: () => void;
  toggleMenu: () => void;
  addMessage: (message: ChatMessageDto) => void;
}

const ChatInput = ({
  isMenuOpen,
  closeMenu,
  toggleMenu,
  addMessage,
}: ChatInputProps) => {
  const {correctMessage} = useMessageStore(state => state);
  const [input, setInput] = useState('');
  const [pictureModalOpen, setPictureModalOpen] = useState(false);

  useEffect(() => {
    setInput(correctMessage ? correctMessage.content : '');
  }, [correctMessage]);

  return (
    <View style={styles.container}>
      <Modal
        visible={pictureModalOpen}
        transparent
        onRequestClose={() => {
          setPictureModalOpen(false);
        }}>
        <TouchableWithoutFeedback
          style={{}}
          onPress={() => {
            setPictureModalOpen(false);
          }}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,0.4)',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
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
                })}>
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
                })}>
                <Typography size={16} bold>
                  카메라 열기
                </Typography>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <View style={styles.contentWrapper}>
        <Pressable onPress={toggleMenu}>
          <Profile type="normal" color="blue" size={24} />
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
            addMessage({
              id: 'string122',
              roomId: 'string',
              senderId: 'UserId',
              type: 'CORRECTION',
              content: '안녕반가워어쩌구저쩌구',
              s3Key: 'string',
              originalMessageText: 'string',
              correctedText: 'string',
              createdAt: '2025-05-01',
              deleted: false,
            });
          }}>
          <Next fill={colors.gray.primary} width={24} height={24} />
        </Pressable>
      </View>
      {isMenuOpen && (
        <Pressable
          style={styles.pictureBtn}
          onPress={() => {
            setPictureModalOpen(true);
          }}>
          <Picture fill={colors.black.primary} />
          <Typography size={12} bold>
            사진 보내기
          </Typography>
        </Pressable>
      )}
    </View>
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

    padding: 0,
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
