import React, {ReactNode, useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {colors} from '../constants/colors';
import Typography from './Typography';

interface TabsProps {
  titles: string[];
  contents: ReactNode[];
}

const Tabs = ({titles, contents}: TabsProps) => {
  const [value, setValue] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.tabList}>
        {titles.map((item, idx) => (
          <Pressable
            key={`${item}-${idx}`}
            style={[
              styles.tabListItem,
              {
                borderColor:
                  value === idx ? colors.blue.primary : colors.gray.secondary,
              },
            ]}
            onPress={() => {
              setValue(idx);
            }}>
            <Typography size={16} bold>
              {item}
            </Typography>
          </Pressable>
        ))}
      </View>
      {contents[value]}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  tabList: {flexDirection: 'row', backgroundColor: colors.white},
  tabListItem: {
    flex: 1,
    paddingVertical: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
  },
});

export default Tabs;
