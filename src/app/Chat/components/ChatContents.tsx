import React, {useState} from 'react';
import {FlatList} from 'react-native';
import Typography from '../../../components/Typography';
import {colors} from '../../../constants/colors';
import {ChatMessageDto} from '../../../types/dto/ChatMessageDto';
import Message from './Message';

interface ChatContentsProps {
  onContentPress: () => void;
}

const ChatContents = ({onContentPress}: ChatContentsProps) => {
  const userId = 'UserId';
  const [messages, setMessages] = useState<ChatMessageDto[]>([].reverse());

  return (
    <FlatList
      style={{flex: 1}}
      contentContainerStyle={{paddingTop: 10, flexGrow: 1}}
      inverted
      onEndReached={() => {}}
      onTouchStart={onContentPress}
      data={messages}
      renderItem={({item, index}) => {
        const isHead =
          !messages[index + 1] ||
          messages[index + 1].senderId !== item.senderId;
        const messageDate = new Date(item.createdAt);
        const prevMessageDate =
          messages[index + 1] && new Date(messages[index + 1].createdAt);
        const isSameDate =
          !messages[index + 1] ||
          prevMessageDate.getFullYear() !== messageDate.getFullYear() ||
          prevMessageDate.getMonth() !== messageDate.getMonth() ||
          prevMessageDate.getDate() !== messageDate.getDate();

        return (
          <>
            <Message
              key={item.id}
              isMine={item.senderId === userId}
              head={isHead}
              text={item.content}
            />
            {isSameDate && (
              <Typography
                style={{alignSelf: 'center', marginTop: 18, marginBottom: 10}}
                size={12}
                color={colors.gray.primary}>{`${messageDate.getFullYear()}년 ${
                messageDate.getMonth() + 1
              }월 ${messageDate.getDate()}일`}</Typography>
            )}
          </>
        );
      }}
    />
  );
};

export default ChatContents;
