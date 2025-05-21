import React, {useState} from 'react';
import {FlatList, Keyboard} from 'react-native';
import {ChatMessageDto} from '../../../types/dto/ChatMessageDto';

import {useMessageStore} from '../../../utils/messageStore';
import {useUserStore} from '../../../utils/userStore';
import Message from './Message';

interface ChatContentsProps {
  onContentPress: () => void;
  messages: ChatMessageDto[];
}

const ChatContents = ({onContentPress, messages}: ChatContentsProps) => {
  const {userId} = useUserStore();
  const removeCorrectMessage = useMessageStore(state => state.removeMessage);
  const [isScrolling, setIsScrolling] = useState(false);

  const [skipTouch, setSkipTouch] = useState(false);

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
      renderItem={({item, index}) => {
        const isHead =
          !messages[index + 1] ||
          messages[index + 1].senderId !== item.senderId;

        return (
          <Message
            key={item.id}
            isMine={item.senderId === userId}
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
