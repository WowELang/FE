import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import {Back} from '../../../assets';
import ConfirmButton from '../../../components/ConfirmButton';
import Profile from '../../../components/Profile';
import Typography from '../../../components/Typography';
import {CHARACTERCOLOR} from '../../../constants/character';
import {colors} from '../../../constants/colors';
import {LoginStackParamList} from '../../../navigators/LoginNavigator';

interface SelectColorScreenProps {
  navigation: StackNavigationProp<LoginStackParamList, 'SelecetColor'>;
}
const SelectColorScreen = ({navigation}: SelectColorScreenProps) => {
  const [selectedColor, setSelectedColor] = useState('');

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
              캐릭터를 골라주세요
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
            {CHARACTERCOLOR.map(item => (
              <Pressable
                key={item}
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
            ))}
          </View>
        </View>
        <ConfirmButton
          title="완료"
          active={!!selectedColor}
          handlerFn={() => {
            navigation.navigate('SelecetFace');
          }}
        />
      </View>
    </View>
  );
};

export default SelectColorScreen;
