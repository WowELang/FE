import React, {useState} from 'react';
import {FlatList, Keyboard} from 'react-native';
import {ChatMessageDto} from '../../../types/dto/ChatMessageDto';

import {useAuth} from '../../../hooks/useAuth';
import {useMessageStore} from '../../../utils/messageStore';
import Message from './Message';

interface ChatContentsProps {
  onContentPress: () => void;
  messages: ChatMessageDto[];
  reachFn: () => void;
}

const ChatContents = ({
  onContentPress,
  messages,
  reachFn,
}: ChatContentsProps) => {
  const removeCorrectMessage = useMessageStore(state => state.removeMessage);
  const [isScrolling, setIsScrolling] = useState(false);

  const [skipTouch, setSkipTouch] = useState(false);

  const {userProfileQuery} = useAuth();
  const {data} = userProfileQuery;

  const handleScrollBegin = () => {
    setIsScrolling(true);
  };
  const handleScrollEnd = () => {
    setIsScrolling(false);
  };

  const handleTouchEnd = () => {
    if (!isScrolling && !skipTouch && !Keyboard.isVisible()) {
      onContentPress();
      removeCorrectMessage();
    }
    setSkipTouch(false);
  };

  return (
    <FlatList
      contentContainerStyle={{paddingTop: 10, flexGrow: 1}}
      inverted
      onScrollBeginDrag={handleScrollBegin}
      onScrollEndDrag={handleScrollEnd}
      onTouchEnd={handleTouchEnd}
      data={messages}
      onEndReached={reachFn}
      renderItem={({item, index}) => {
        const isHead =
          !messages[index + 1] ||
          messages[index + 1].senderId !== item.senderId;

        return (
          <Message
            key={item.id}
            isMine={item.senderId === data?.userId.toString()}
            head={isHead}
            message={item}
            onLongPress={() => setSkipTouch(true)}
          />
        );
      }}
    />
  );
};

export default ChatContents;
