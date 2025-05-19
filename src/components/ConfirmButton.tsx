import React from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleProp,
  Text,
  ViewStyle,
} from 'react-native';

interface ConfirmButtonProps {
  title: string;
  handlerFn: (event: GestureResponderEvent) => void;
  active?: boolean;
  style?: StyleProp<ViewStyle>;
}

const ConfirmButton = ({
  title,
  handlerFn,
  active,
  style,
}: ConfirmButtonProps) => {
  return (
    <Pressable
      onPress={handlerFn}
      style={[
        {
          backgroundColor: active ? '#1833DB' : '#D0D0D2',
          height: 48,
          borderRadius: 40,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 15,
          paddingHorizontal: 57,
        },
        style,
      ]}
      disabled={!active}>
      <Text style={{fontSize: 16, fontWeight: 'bold', color: '#fff'}}>
        {title}
      </Text>
    </Pressable>
  );
};

export default ConfirmButton;
