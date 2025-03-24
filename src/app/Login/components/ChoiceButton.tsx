import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface ChoiceButtonProps {
  title: [string, string];
  subTitle?: [string, string];
  icon?: [React.ReactNode, React.ReactNode];
  value: [string, string];
  state: string | undefined;
  onChangeFn: (value: string) => void;
}

const ChoiceButton = ({
  title,
  subTitle,
  icon,
  value,
  state,
  onChangeFn,
}: ChoiceButtonProps) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.button,
          state === value[0] && styles.selected,
          icon === undefined &&
            subTitle === undefined && {
              paddingTop: 46,
              paddingBottom: 46,
              justifyContent: 'center',
            },
          icon && {gap: 25},
        ]}
        onPress={() => {
          onChangeFn(value[0]);
        }}>
        {icon && icon[0]}
        <View style={{gap: 10}}>
          {subTitle && <Text style={styles.subTitle}>{subTitle[0]}</Text>}
          <Text style={styles.title}>{title[0]}</Text>
        </View>
      </Pressable>
      <Pressable
        style={[
          styles.button,
          state === value[1] && styles.selected,
          icon === undefined &&
            subTitle === undefined && {
              paddingTop: 46,
              paddingBottom: 46,
              justifyContent: 'center',
            },
          icon && {gap: 25},
        ]}
        onPress={() => {
          onChangeFn(value[1]);
        }}>
        {icon && icon[1]}
        <View style={{gap: 10}}>
          {subTitle && <Text style={styles.subTitle}>{subTitle[1]}</Text>}
          <Text style={styles.title}>{title[1]}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 15,
    width: '100%',
  },
  button: {
    paddingTop: 30,
    paddingBottom: 33,
    paddingHorizontal: 40,
    gap: 10,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#D0D0D2',
    flexDirection: 'row',
  },
  selected: {
    borderColor: '#1833DB',
    backgroundColor: 'rgba(24, 51, 219, 0.1)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1833DB',
  },
});

export default ChoiceButton;
