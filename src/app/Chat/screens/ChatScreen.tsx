import React, {useState} from 'react';
import {View} from 'react-native';
import ChatContents from '../components/ChatContents';
import ChatHeader from '../components/ChatHeader';
import ChatInput from '../components/ChatInput';

const ChatScreen = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <View style={{flex: 1, justifyContent: 'space-between'}}>
      <ChatHeader />
      <ChatContents onContentPress={closeMenu} />
      <ChatInput
        isMenuOpen={isMenuOpen}
        closeMenu={closeMenu}
        toggleMenu={toggleMenu}
      />
    </View>
  );
};

export default ChatScreen;
