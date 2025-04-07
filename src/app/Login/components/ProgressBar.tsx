import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, StyleSheet, View} from 'react-native';

interface ProgressBarProps {
  progress: number; // 0 ~ 1 사이 값
}

const ProgressBar = ({progress}: ProgressBarProps) => {
  const deviceWidth = Dimensions.get('window').width;

  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const widthInterpolated = animatedWidth.interpolate({
    inputRange: [0, 1],
    outputRange: [0, deviceWidth],
  });

  return (
    <View style={styles.background}>
      <Animated.View style={[styles.bar, {width: widthInterpolated}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    height: 8,
    backgroundColor: '#EEEEF0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  bar: {
    height: 8,
    backgroundColor: '#69EBFF',
  },
});

export default ProgressBar;
