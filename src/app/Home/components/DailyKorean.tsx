import React from 'react';
import {StyleSheet, View} from 'react-native';
import Divider from '../../../components/Divider';
import Typography from '../../../components/Typography';

const DailyKorean = () => {
  return (
    <View style={styles.container}>
      <Typography size={12} bold color="#1833DB">
        오늘의 한국어 한마디
      </Typography>
      <Divider color={'rgba(24, 51, 219, 0.4)'} />
      <View style={{gap: 10}}>
        <Typography
          size={22}
          bold
          color="#231815"
          style={{alignSelf: 'center'}}>
          이거 되? 이거 돼?
        </Typography>
        <Typography size={12} color="#231815" style={{lineHeight: 20}}>
          규범 표기로는 '되다'만 쓰입니다. 다만, '돼' 형태가 '되어'의 준말에서
          나타나며, 그 예로 '겨울이 되어, 되어서, 되었다.'에서 '되어'가 '돼'로
          줄어 '겨울이 돼, 돼서, 됐다.'로 쓰이는 것을 들 수 있습니다.
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 27,
    paddingVertical: 20,
    gap: 10,
  },
});

export default DailyKorean;
