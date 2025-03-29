import React from 'react';
import {Text} from 'react-native';

interface TypographyProps {
  children: string;
  size: number;
  color?: string;
  bold?: boolean;
}

const Typography = ({
  children,
  size,
  color = '#231815',
  bold,
}: TypographyProps) => {
  return (
    <Text
      style={{
        fontSize: size,
        color: color,
        fontWeight: bold ? 'bold' : 'regular',
      }}>
      {children}
    </Text>
  );
};

export default Typography;
