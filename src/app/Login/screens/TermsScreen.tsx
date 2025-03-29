import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Check, Close} from '../../../assets';
import ConfirmButton from '../../../components/ConfirmButton';
import Typography from '../../../components/Typography';
import {LoginStackParamList} from '../../../navigators/LoginNavigator';

type TermsScreenProps = {
  navigation: StackNavigationProp<LoginStackParamList, 'Terms'>;
};

const TermsScreen = ({navigation}: TermsScreenProps) => {
  const [agreements, setAgreements] = useState({
    first: false,
    second: false,
    third: false,
  });
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}>
        <Close fill={'#989A9F'} />
      </Pressable>
      <View style={{gap: 60, marginBottom: 120}}>
        <View style={{gap: 5}}>
          <View style={{flexDirection: 'row'}}>
            <Typography size={28} bold>
              {`Welcome to${' '}`}
            </Typography>
            <Typography size={28} color="#1833DB" bold>
              와이랭
            </Typography>
            <Typography size={28} bold>
              !
            </Typography>
          </View>
          <Typography size={12}>아래 약관을 확인해주세요.</Typography>
        </View>
        <View style={{gap: 35}}>
          <View style={{flexDirection: 'row', gap: 20}}>
            <Pressable
              onPress={() =>
                setAgreements({...agreements, first: !agreements.first})
              }>
              <Check fill={agreements.first ? '#1833DB' : '#d0d0d2'} />
            </Pressable>
            <View style={{gap: 7}}>
              <Typography size={20} bold>
                매너있게 행동하기
              </Typography>
              <View>
                <Typography size={18}>
                  우리 모두 학교의 구성원입니다!
                </Typography>
                <Typography size={18}>
                  언제 어디서 만나게 될지 몰라요!
                </Typography>
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', gap: 20}}>
            <Pressable
              onPress={() =>
                setAgreements({...agreements, second: !agreements.second})
              }>
              <Check fill={agreements.second ? '#1833DB' : '#d0d0d2'} />
            </Pressable>
            <View style={{gap: 7}}>
              <Typography size={20} bold>
                매너있게 행동하기
              </Typography>
              <View>
                <Typography size={18}>
                  우리 모두 학교의 구성원입니다!
                </Typography>
                <Typography size={18}>
                  언제 어디서 만나게 될지 몰라요!
                </Typography>
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row', gap: 20}}>
            <Pressable
              onPress={() =>
                setAgreements({...agreements, third: !agreements.third})
              }>
              <Check fill={agreements.third ? '#1833DB' : '#d0d0d2'} />
            </Pressable>
            <View style={{gap: 7}}>
              <Typography size={20} bold>
                매너있게 행동하기
              </Typography>
              <View>
                <Typography size={18}>
                  우리 모두 학교의 구성원입니다!
                </Typography>
                <Typography size={18}>
                  언제 어디서 만나게 될지 몰라요!
                </Typography>
              </View>
            </View>
          </View>
        </View>
      </View>
      <ConfirmButton
        title="동의함"
        handlerFn={() => {
          navigation.replace('Register');
        }}
        active={agreements.first && agreements.second && agreements.third}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 30,
    justifyContent: 'space-between',
  },
});

export default TermsScreen;
