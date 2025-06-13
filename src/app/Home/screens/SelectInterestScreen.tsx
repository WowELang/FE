import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import {Back} from '../../../assets';
import ConfirmButton from '../../../components/ConfirmButton';
import Tag from '../../../components/Tag';
import Typography from '../../../components/Typography';
import {colors} from '../../../constants/colors';
import {useUser} from '../../../hooks/useUser';
import {InitialSelectStackParamList} from '../../../navigators/InitialSelectNavigator';

interface InterestScreenProps {
  navigation: StackNavigationProp<
    InitialSelectStackParamList,
    'SelectInterest'
  >;
}

const InterestScreen = ({navigation}: InterestScreenProps) => {
  const [selectedInterests, setSelectedInterests] = useState<number[]>([]);

  const {interestQuery, interestMutation} = useUser();
  const {data: interestData} = interestQuery;
  const {mutate: interestMutate} = interestMutation;

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
            {interestData &&
              interestData.result.map(item => (
                <Tag
                  key={item.id}
                  title={item.name}
                  selected={selectedInterests.includes(item.id)}
                  onPressFn={() => {
                    if (selectedInterests.includes(item.id)) {
                      setSelectedInterests(
                        selectedInterests.filter(
                          interest => interest !== item.id,
                        ),
                      );
                    } else if (selectedInterests.length < 3) {
                      setSelectedInterests([...selectedInterests, item.id]);
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
            interestMutate(selectedInterests);
            navigation.navigate('SelecetColor');
          }}
        />
      </View>
    </View>
  );
};

export default InterestScreen;
