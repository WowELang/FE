import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  NarrowStandingBin,
  NormalStandingBin,
  SingleStandingBin,
  TriangleStandingBin,
  WideStandingBin,
} from '../assets';
import {colors} from '../constants/colors';

export type characterFaceType =
  | 'normal'
  | 'narrow'
  | 'wide'
  | 'single'
  | 'triangle'
  | 'none';
export type characterColorType =
  | 'pink'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'brown'
  | 'red';

interface ProfileProps {
  type: characterFaceType;
  color: characterColorType;
  size: number;
  active?: boolean;
}

const Profile = ({type, color, size, active}: ProfileProps) => {
  return (
    <View>
      <View
        style={[
          styles.container,
          {
            width: size,
            height: size,
            borderRadius: size,
            backgroundColor: active
              ? colors.blue.primary
              : colors.gray.secondary,
          },
        ]}>
        {type === 'normal' && (
          <NormalStandingBin
            fill={colors.character[color]}
            style={{transform: [{translateY: size * 0.12}]}}
            width={size * 0.66}
          />
        )}
        {type === 'narrow' && (
          <NarrowStandingBin
            fill={colors.character[color]}
            style={{transform: [{translateY: size * 0.12}]}}
            width={size * 0.66}
          />
        )}
        {type === 'wide' && (
          <WideStandingBin
            fill={colors.character[color]}
            style={{transform: [{translateY: size * 0.12}]}}
            width={size * 0.66}
          />
        )}
        {type === 'single' && (
          <SingleStandingBin
            fill={colors.character[color]}
            style={{transform: [{translateY: size * 0.12}]}}
            width={size * 0.66}
          />
        )}
        {type === 'triangle' && (
          <TriangleStandingBin
            fill={colors.character[color]}
            style={{transform: [{translateY: size * 0.12}]}}
            width={size * 0.66}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});

export default Profile;
