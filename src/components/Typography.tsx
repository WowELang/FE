import React from 'react';
import {StyleProp, Text, TextProps, TextStyle} from 'react-native';

interface TypographyProps extends TextProps {
  children: string;
  size: number;
  color?: string;
  bold?: boolean;
  style?: StyleProp<TextStyle>;
}

const Typography = ({
  children,
  size,
  color = '#231815',
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
