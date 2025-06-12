import React from 'react';
import {Pressable, View} from 'react-native';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {storage} from '../../../App';
import Profile from '../../components/Profile';
import Typography from '../../components/Typography';
import {CHARACTERCOLOR, CHARACTERMASK} from '../../constants/character';
import {colors} from '../../constants/colors';
import {useUser} from '../../hooks/useUser';
import {Tokens} from '../../types/dto/LoginReqDto';

const SettingScreen = () => {
  const [tokens, setTokens] = useMMKVStorage<Tokens>('tokens', storage);
  const {myProfileQuery} = useUser();
  const {data: userData} = myProfileQuery;

  return (
    <View
      style={{
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 28,
      }}>
      {userData ? (
        <View
          style={{
            backgroundColor: colors.white,
            padding: 18,
            borderRadius: 10,
            gap: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
              gap: 16,
            }}>
            <Profile
              color={CHARACTERCOLOR[userData.character.colorId]}
              type={CHARACTERMASK[userData.character.maskId]}
              size={65}
              active
            />
            <View style={{gap: 10, marginTop: 10}}>
              <Typography size={20} bold>
                {userData.name}
              </Typography>
              <Typography size={12} style={{}}>{`${
                userData.usertype === 'NATIVE'
                  ? `재학생 | ${userData.major}`
                  : `유학생 | ${userData.country}`
              }`}</Typography>
              <View style={{flexDirection: 'row'}}>
                {userData.interests.map(item => (
                  <Typography size={12} color={colors.blue.primary} bold>
                    {`# ${item.name}`}
                  </Typography>
                ))}
              </View>
            </View>
          </View>
          <Pressable
            style={{
              paddingHorizontal: 111,
              paddingVertical: 12,
              backgroundColor: colors.gray.primary,
              borderRadius: 10,
            }}
            onPress={() => setTokens({accessToken: '', refreshToken: ''})}>
            <Typography size={16} bold color={colors.white}>
              로그아웃
            </Typography>
          </Pressable>
        </View>
      ) : (
        <Pressable
          style={{
            paddingHorizontal: 111,
            paddingVertical: 12,
            backgroundColor: colors.gray.primary,
            borderRadius: 10,
          }}
          onPress={() => setTokens({accessToken: '', refreshToken: ''})}>
          <Typography size={16} bold color={colors.white}>
            로그아웃
          </Typography>
        </Pressable>
      )}
    </View>
  );
};

export default SettingScreen;
