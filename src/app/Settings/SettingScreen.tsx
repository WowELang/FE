import React from 'react';
import {Button, View} from 'react-native';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {storage} from '../../../App';

const SettingScreen = () => {
  const [token, setToken] = useMMKVStorage('token', storage, '');
  return (
    <View>
      <Button title="로그아웃" onPress={() => setToken('')} />
    </View>
  );
};

export default SettingScreen;
