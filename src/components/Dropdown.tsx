import React, {useEffect, useRef, useState} from 'react';
import {Animated, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {ArrowDown} from '../assets';
import Typography from './Typography';

interface DropdownProps {
  title: string;
  menuItems: string[];
  value: string;
  handleFn: (value: string) => void;
}

const Dropdown = ({title, menuItems, value, handleFn}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={{gap: 5, position: 'relative'}}>
      <Pressable
        style={[
          styles.container,
          {
            borderColor: isOpen || value ? '#1833DB' : '#9d9d9d',
            borderWidth: isOpen || value ? 2 : 1,
          },
        ]}
        onPress={() => setIsOpen(prev => !prev)}>
        <Typography size={16}>{value ? value : title}</Typography>
        <Animated.View style={{transform: [{rotate}]}}>
          <ArrowDown />
        </Animated.View>
      </Pressable>

      {isOpen && (
        <View style={[styles.dropdownShadow]}>
          <View style={styles.dropdownMenu}>
            <ScrollView>
              {menuItems.map(item => (
                <Pressable
                  style={({pressed}) => [
                    styles.button,
                    {
                      backgroundColor: pressed
                        ? 'rgba(24, 51, 219, 0.1)'
                        : '#fff',
                    },
                  ]}
                  key={item}
                  onPress={() => {
                    handleFn(item);
                    setIsOpen(false);
                  }}>
                  <Typography size={16}>{item}</Typography>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 12,
    position: 'relative',
    zIndex: 2,
  },
  button: {
    paddingVertical: 16.5,
    paddingHorizontal: 12,
  },
  dropdownShadow: {
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 8,
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    top: 62,
  },
  dropdownMenu: {
    borderRadius: 10,
    height: 209,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
});

export default Dropdown;
