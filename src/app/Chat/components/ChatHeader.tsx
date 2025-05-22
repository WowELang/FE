import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Back} from '../../../assets';
import Profile from '../../../components/Profile';
import Typography from '../../../components/Typography';
import {colors} from '../../../constants/colors';
import {ChatstackParamList} from '../../../navigators/ChatNavigator';

const ChatHeader = () => {
  const navigation =
    useNavigation<StackNavigationProp<ChatstackParamList, 'Chat'>>();
  return (
    <View style={styles.container}>
      <Pressable onPress={navigation.goBack}>
        <Back fill={colors.gray.primary} />
      </Pressable>
      <View style={styles.profile}>
        <Profile type="normal" color="red" size={48} />
        <Typography size={16} bold>
          userb
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    paddingTop: 24,
    paddingBottom: 16,
    paddingHorizontal: 28,
    backgroundColor: colors.white,
  },
  profile: {flexDirection: 'row', gap: 14, alignItems: 'center'},
});

export default ChatHeader;
