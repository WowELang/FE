import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {colors} from '../constants/colors';
import Typography from './Typography';

interface TagProps {
  title: string;
  selected: boolean;
  onPressFn: () => void;
}

const Tag = ({title, selected, onPressFn}: TagProps) => {
  return (
    <Pressable
      style={[
        styles.container,
        {
          borderColor: selected ? colors.blue.primary : colors.gray.secondary,
          backgroundColor: selected ? colors.blue.secondary : colors.white,
        },
      ]}
      onPress={onPressFn}>
      <Typography size={14} color={colors.black.primary}>
        {title}
      </Typography>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
});

export default Tag;
