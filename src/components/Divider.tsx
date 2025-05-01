import React from 'react';
import {ColorValue, View} from 'react-native';

interface DividerProps {
  color: ColorValue;
}

const Divider = ({color}: DividerProps) => {
  return <View style={{borderTopWidth: 1, borderTopColor: color}} />;
};
export default Divider;
