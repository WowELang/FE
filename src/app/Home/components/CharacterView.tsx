import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, Pressable, StyleSheet, View} from 'react-native';
import {Character, Cloud, Dress, NormalShakingBin, Sun} from '../../../assets';
import ConfirmButton from '../../../components/ConfirmButton';
import Typography from '../../../components/Typography';
import {HomeStackParamList} from '../../../navigators/HomeNavigator';

const {width} = Dimensions.get('window');

interface AnimatedCloudProps {
  x: number;
  y: number;
  delay: number;
}

const AnimatedCloud = ({x, y, delay}: AnimatedCloudProps) => {
  const translateX = useRef(new Animated.Value(x)).current;
  const animatedOpacity = translateX.interpolate({
    inputRange: [x, x + width * 0.9, x + width],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    const startAnimation = () => {
      translateX.setValue(x);

      Animated.timing(translateX, {
        toValue: x + width,
        duration: 15000,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => startAnimation(), delay);
      });
    };

    startAnimation();
  }, []);
  return (
    <Animated.View
      style={[
        {position: 'absolute', top: y},
        {
          transform: [{translateX}],
          opacity: animatedOpacity,
        },
      ]}>
      <Cloud />
    </Animated.View>
  );
};

const CharacterView = () => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  return (
    <View style={styles.container}>
      <NormalShakingBin
        fill={'red'}
        style={{position: 'absolute', zIndex: 2, top: 90, left: 43}}
      />
      <View style={styles.sky}>
        <View style={styles.header}>
          <Typography size={16} bold color="#989A9F">
            후비적거리는 홍냥이
          </Typography>
          <View style={{flexDirection: 'row', gap: 8}}>
            <Dress fill={'#989A9F'} />
            <Pressable
              onPress={() => {
                navigation.navigate('CharacterMenu');
              }}>
              <Character fill={'#989A9F'} />
            </Pressable>
          </View>
        </View>
        <Sun
          fill={'#FFDA83'}
          style={{position: 'absolute', top: 70, right: 50}}
        />
        <AnimatedCloud x={-190} y={50} delay={1000} />
        <AnimatedCloud x={-100} y={100} delay={500} />
      </View>
      <View style={styles.ground}>
        <View style={{flexDirection: 'row', gap: 15}}>
          <Typography size={28} bold>
            혼기쿠
          </Typography>
          <Typography size={20}>교환학생 | 일본</Typography>
        </View>
        <ConfirmButton
          title="교정 보관함 들어가기"
          active
          handlerFn={() => {}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {position: 'relative', overflow: 'hidden'},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sky: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#67EBFF',
    height: 250,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  ground: {
    backgroundColor: '#FFB700',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 15,
    gap: 15,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
});

export default CharacterView;
