import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import {Back} from '../../../assets';
import ConfirmButton from '../../../components/ConfirmButton';
import Tag from '../../../components/Tag';
import Typography from '../../../components/Typography';
import {colors} from '../../../constants/colors';
import {INTERESTS} from '../../../constants/interests';
import {LoginStackParamList} from '../../../navigators/LoginNavigator';

interface InterestScreenProps {
  navigation: StackNavigationProp<LoginStackParamList, 'Interest'>;
}

const InterestScreen = ({navigation}: InterestScreenProps) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

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
              어떤 것에 관심이 있나요?
            </Typography>
            <Typography size={12}>3개를 선택해주세요.</Typography>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 8,
            }}>
            {INTERESTS.map(item => (
              <Tag
                key={item}
                title={item}
                selected={selectedInterests.includes(item)}
                onPressFn={() => {
                  if (selectedInterests.includes(item)) {
                    setSelectedInterests(
                      selectedInterests.filter(interest => interest !== item),
                    );
                  } else if (selectedInterests.length < 3) {
                    setSelectedInterests([...selectedInterests, item]);
                  }
                }}
              />
            ))}
          </View>
        </View>
        <ConfirmButton
          title="완료"
          active={selectedInterests.length === 3}
          handlerFn={() => {
            navigation.navigate('SelecetColor');
          }}
        />
      </View>
    </View>
  );
};

export default InterestScreen;
