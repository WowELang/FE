import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import {Back} from '../../../assets';
import ConfirmButton from '../../../components/ConfirmButton';
import Typography from '../../../components/Typography';
import UnderlinedInput from '../../../components/UnderlinedInput';
import {colors} from '../../../constants/colors';
import {useUser} from '../../../hooks/useUser';
import {InitialSelectStackParamList} from '../../../navigators/InitialSelectNavigator';

interface SelectNicknameScreenProps {
  navigation: StackNavigationProp<
    InitialSelectStackParamList,
    'SelectNickname'
  >;
}
const SelectNicknameScreen = ({navigation}: SelectNicknameScreenProps) => {
  const [nickname, setNickname] = useState('');

  const {nicknameMutation} = useUser();
  const {mutate: nicknameMutate} = nicknameMutation;
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
        <View style={{gap: 130}}>
          <View style={{gap: 25}}>
            <Typography size={28} bold>
              닉네임을 지어주세요.
            </Typography>
            <Typography size={12}>
              닉네임은 수정 불가하니 신중히 정해주세요.
            </Typography>
          </View>
          <UnderlinedInput
            value={nickname}
            onChangeFn={setNickname}
            placeholder="닉네임을 입력하세요"
            style={{fontSize: 20, fontWeight: 'bold'}}
          />
        </View>
        <ConfirmButton
          title="완료"
          active={!!nickname}
          handlerFn={() => {
            nicknameMutate(nickname);
            navigation.navigate('Start', {nickname: nickname});
          }}
        />
      </View>
    </View>
  );
};

export default SelectNicknameScreen;
