import React from 'react';
import {ColorValue, StyleProp, View, ViewStyle} from 'react-native';

interface DividerProps {
  color: ColorValue;
  style?: StyleProp<ViewStyle>;
}

const Divider = ({color, style}: DividerProps) => {
  return <View style={[{borderTopWidth: 1, borderTopColor: color}, style]} />;
};
export default Divider;
