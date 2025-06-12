import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import {Back} from '../../../assets';
import ConfirmButton from '../../../components/ConfirmButton';
import Profile from '../../../components/Profile';
import Typography from '../../../components/Typography';
import {CHARACTERCOLOR, CHARACTERMASK} from '../../../constants/character';
import {colors} from '../../../constants/colors';
import {useUser} from '../../../hooks/useUser';
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
  const {myProfileQuery, changeCharacterMutation} = useUser();
  const {data: userData} = myProfileQuery;
  const {mutate: changeCharacterMutate} = changeCharacterMutation;
  const [selectedColor, setSelectedColor] = useState(
    userData?.character.colorId,
  );
  const [selectedFace, setSelectedFace] = useState(userData?.character.maskId);

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
          ? CHARACTERCOLOR.map((item, idx) => (
              <Pressable
                key={`${item}-${idx}`}
                onPress={() => {
                  setSelectedColor(idx);
                }}>
                <Profile
                  type="normal"
                  color={item}
                  size={118}
                  active={selectedColor === idx}
                />
              </Pressable>
            ))
          : CHARACTERMASK.map((item, idx) => (
              <Pressable
                key={`${item}-${idx}`}
                onPress={() => {
                  setSelectedFace(idx);
                }}>
                <Profile
                  type={item}
                  color="pink"
                  size={118}
                  active={selectedFace === idx}
                />
              </Pressable>
            ))}
      </View>
      <ConfirmButton
        title="변경하기"
        active={
          type === 'color'
            ? selectedColor !== userData?.character.colorId
            : selectedFace !== userData?.character.maskId
        }
        handlerFn={() => {
          changeCharacterMutate({colorId: selectedColor, maskId: selectedFace});
          navigation.reset({index: 0, routes: [{name: 'Home'}]});
        }}
      />
    </View>
  );
};

export default CharacterChangeScreen;
