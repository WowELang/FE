import React from 'react';
import {GestureResponderEvent, Pressable, Text} from 'react-native';

interface ConfirmButtonProps {
  title: string;
  handlerFn: (event: GestureResponderEvent) => void;
  active: boolean;
}

const ConfirmButton = ({title, handlerFn, active}: ConfirmButtonProps) => {
  return (
    <Pressable
      onPress={handlerFn}
      style={{
        backgroundColor: active ? '#1833DB' : '#D0D0D2',
        width: 300,
        height: 48,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      disabled={!active}>
      <Text style={{fontSize: 16, fontWeight: 'bold', color: '#fff'}}>
        {title}
      </Text>
    </Pressable>
  );
};

export default ConfirmButton;
