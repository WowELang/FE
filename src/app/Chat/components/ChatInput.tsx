import React, {useEffect, useState} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Next, Picture} from '../../../assets';
import Profile from '../../../components/Profile';
import Typography from '../../../components/Typography';
import {CHARACTERCOLOR, CHARACTERFACE} from '../../../constants/character';
import {colors} from '../../../constants/colors';
import {useAuth} from '../../../hooks/useAuth';
import {useStompClient} from '../../../scoket';
import {ChatMessageDto} from '../../../types/dto/ChatMessageDto';
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
  addMessage,
}: ChatInputProps) => {
  const {correctMessage, removeMessage} = useMessageStore(state => state);
  const [input, setInput] = useState('');
  const [pictureModalOpen, setPictureModalOpen] = useState(false);

  const stompClient = useStompClient();
  const {userProfileQuery} = useAuth();
  const userId = userProfileQuery.data?.userId;

  function sendMessage(messagePayload: any) {
    console.log('sendMessage called with:', messagePayload);
    console.log('stompClient:', stompClient);
    console.log('stompClient.active:', stompClient?.active);
    console.log('roomId:', roomId);
    console.log('userId:', userId);
    
    // messagePayload는 아래 형식 중 하나
    if (stompClient && stompClient.active && roomId && userId) {
      console.log('Sending message to server...');
      stompClient.publish({
        destination: `/app/chat.send.${roomId}`, // 메시지를 보낼 목적지 주소
        headers: {'X-User-Id': String(userId)}, // 필요시 추가 헤더
        body: JSON.stringify(messagePayload),
      });
      console.log('Sent message:', messagePayload);
    } else {
      console.error('STOMP client not active or no room selected.');
      console.error('Conditions:', {
        'stompClient exists': !!stompClient,
        'stompClient.active': stompClient?.active,
        'roomId exists': !!roomId,
        'userId exists': !!userId
      });
    }
  }

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
          <Profile
            type={CHARACTERFACE[userProfileQuery.data?.character?.maskId || 0]}
            color={CHARACTERCOLOR[userProfileQuery.data?.character?.colorId || 0]}
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
            const messagePayload = {
              type: correctMessage ? 'CORRECTION' : 'TEXT',
              content: input,
              originalMessage: correctMessage?.content,
            };
            
            sendMessage(messagePayload);
            
            // UI 즉시 업데이트를 위해 임시 메시지 추가
            if (input.trim() && userId) {
              const tempMessage: ChatMessageDto = {
                id: `temp-${Date.now()}`,
                roomId: roomId,
                senderId: String(userId),
                type: (correctMessage ? 'CORRECTION' : 'TEXT') as 'CORRECTION' | 'TEXT',
                content: input,
                s3Key: null,
                originalMessage: correctMessage?.content || null,
                correctedText: null,
                createdAt: new Date().toISOString(),
                deleted: false,
              };
              addMessage(tempMessage);
            }
            
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
