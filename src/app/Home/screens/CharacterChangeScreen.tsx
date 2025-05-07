import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import {Back} from '../../../assets';
import ConfirmButton from '../../../components/ConfirmButton';
import Profile from '../../../components/Profile';
import Typography from '../../../components/Typography';
import {CHARACTERCOLOR, CHARACTERFACE} from '../../../constants/character';
import {colors} from '../../../constants/colors';
import {HomeStackParamList} from '../../../navigators/HomeNavigator';

type CharacterChangeScreenProps = {
  navigation: StackNavigationProp<HomeStackParamList, 'CharacterChange'>;
  route: RouteProp<HomeStackParamList, 'CharacterChange'>;
};

const CharacterChangeScreen = ({
  navigation,
  route,
}: CharacterChangeScreenProps) => {
  const type = route.params.type;

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedFace, setSelectedFace] = useState('');
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 28,
        paddingVertical: 36,
      }}>
      <Pressable onPress={() => navigation.goBack()}>
        <Back fill={colors.black.primary} />
      </Pressable>
      <Typography size={28} bold>
        캐릭터 {type === 'color' ? '색' : '표정'} 변경
      </Typography>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 15,
        }}>
        {type === 'color'
          ? CHARACTERCOLOR.map(item => (
              <Pressable
                onPress={() => {
                  setSelectedColor(item);
                }}>
                <Profile
                  type="normal"
                  color={item}
                  size={118}
                  active={selectedColor === item}
                />
              </Pressable>
            ))
          : CHARACTERFACE.map(item => (
              <Pressable
                onPress={() => {
                  setSelectedFace(item);
                }}>
                <Profile
                  type={item}
                  color="pink"
                  size={118}
                  active={selectedFace === item}
                />
              </Pressable>
            ))}
      </View>
      <ConfirmButton
        title="변경하기"
        active={type === 'color' ? !!selectedColor : !!selectedFace}
        handlerFn={() => {}}
      />
    </View>
  );
};

export default CharacterChangeScreen;
