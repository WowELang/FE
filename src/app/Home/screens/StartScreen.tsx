import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {queryClient} from '../../../../App';
import {Back} from '../../../assets';
import ConfirmButton from '../../../components/ConfirmButton';
import Profile from '../../../components/Profile';
import Typography from '../../../components/Typography';
import {colors} from '../../../constants/colors';
import {LoginStackParamList} from '../../../navigators/LoginNavigator';

interface StartScreenProps {
  navigation: StackNavigationProp<LoginStackParamList, 'Start'>;
}
const StartScreen = ({navigation}: StartScreenProps) => {
  const nickname = '후비적거리는 홍냥이';

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}>
        <Back fill={colors.gray.primary} />
      </Pressable>
      <View style={styles.contentWrapper}>
        <View style={styles.contents}>
          <View style={styles.nicknameTitle}>
            <Typography size={28} bold>
              {nickname}
            </Typography>
            <Typography size={28}>님,</Typography>
          </View>
          <Profile type={'normal'} color="red" size={120} active />
          <View style={styles.welcomeMsg}>
            <Typography size={28} bold>
              와이랭에 오신걸
            </Typography>
            <Typography size={28} bold>
              환영해요!
            </Typography>
          </View>
          <Typography size={16}>지금부터 친구들을 만나러 가볼까요?</Typography>
        </View>

        <ConfirmButton
          title="시작하기"
          active
          handlerFn={() => {
            queryClient.invalidateQueries({queryKey: ['user', 'profile']});
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 38,
    paddingVertical: 36,
  },
  contentWrapper: {flex: 1, justifyContent: 'space-between', marginTop: 55},
  contents: {gap: 27, alignItems: 'center'},
  nicknameTitle: {flexDirection: 'row', marginBottom: 20},
  welcomeMsg: {alignItems: 'center', gap: 5},
});

export default StartScreen;
