import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Back, Character} from '../../../assets';
import Divider from '../../../components/Divider';
import Typography from '../../../components/Typography';
import {colors} from '../../../constants/colors';
import {HomeStackParamList} from '../../../navigators/HomeNavigator';

type CharacterMenuScreenProps = {
  navigation: StackNavigationProp<HomeStackParamList, 'CharacterMenu'>;
};

const CharacterMenuScreen = ({navigation}: CharacterMenuScreenProps) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.goBack()}>
        <Back fill={colors.black.primary} />
      </Pressable>
      <View style={styles.title}>
        <Character fill={colors.black.primary} />
        <Typography size={28} bold>
          캐릭터 변경
        </Typography>
      </View>
      <View>
        <Pressable
          onPress={() =>
            navigation.navigate('CharacterChange', {type: 'color'})
          }
          style={({pressed}) => {
            return {
              backgroundColor: pressed
                ? 'rgba(24, 51, 219, 0.1)'
                : colors.white,
              padding: 35,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            };
          }}>
          <Typography size={16} bold>
            캐릭터 색 변경
          </Typography>
        </Pressable>
        <Divider color={colors.gray.secondary} />
        <Pressable
          onPress={() => navigation.navigate('CharacterChange', {type: 'face'})}
          style={({pressed}) => {
            return {
              backgroundColor: pressed
                ? 'rgba(24, 51, 219, 0.1)'
                : colors.white,
              padding: 35,
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
            };
          }}>
          <Typography size={16} bold>
            캐릭터 표정 변경
          </Typography>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {paddingHorizontal: 28, paddingTop: 24},
  title: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 40,
    marginBottom: 25,
  },
});

export default CharacterMenuScreen;
