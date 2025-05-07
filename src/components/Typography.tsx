import React from 'react';
import {StyleProp, Text, TextProps, TextStyle} from 'react-native';
import {colors} from '../constants/colors';

interface TypographyProps extends TextProps {
  children: string | string[];
  size: number;
  color?: string;
  bold?: boolean;
  style?: StyleProp<TextStyle>;
}

const Typography = ({
  children,
  size,
  color = colors.black.primary,
  bold,
  style,
  ...props
}: TypographyProps) => {
  return (
    <Text
      style={[
        {
          fontSize: size,
          color: color,
          fontWeight: bold ? 'bold' : 'regular',
        },
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

export default Typography;
