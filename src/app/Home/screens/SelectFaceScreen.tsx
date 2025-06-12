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
import {useAuth} from '../../../hooks/useAuth';
import {InitialSelectStackParamList} from '../../../navigators/InitialSelectNavigator';

interface SelectFaceScreenProps {
  navigation: StackNavigationProp<InitialSelectStackParamList, 'SelecetFace'>;
  route: RouteProp<InitialSelectStackParamList, 'SelecetFace'>;
}
const SelectFaceScreen = ({navigation, route}: SelectFaceScreenProps) => {
  const selectedColor = route.params.color;
  const [selectedFace, setSelectedFace] = useState(-1);
  const {characterMutation} = useAuth();
  const {mutate: characterMutate} = characterMutation;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: 38,
        paddingVertical: 36,
      }}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}>
        <Back fill={colors.gray.primary} />
      </Pressable>
      <View style={{flex: 1, justifyContent: 'space-between', marginTop: 55}}>
        <View style={{gap: 30}}>
          <View style={{gap: 25}}>
            <Typography size={28} bold>
              표정을 골라주세요
            </Typography>
            <Typography size={12}>나중에 설정에서 수정 가능합니다.</Typography>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 15,
              justifyContent: 'center',
            }}>
            {CHARACTERMASK.map((item, idx) => (
              <Pressable
                key={`${item}-${idx}`}
                onPress={() => {
                  setSelectedFace(idx);
                }}>
                <Profile
                  type={item}
                  color={CHARACTERCOLOR[selectedColor]}
                  size={118}
                  active={selectedFace === idx}
                />
              </Pressable>
            ))}
          </View>
        </View>
        <ConfirmButton
          title="완료"
          active={!!selectedFace}
          handlerFn={() => {
            characterMutate({colorId: selectedColor, maskId: selectedFace});
            navigation.navigate('SelectNickname');
          }}
        />
      </View>
    </View>
  );
};

export default SelectFaceScreen;
