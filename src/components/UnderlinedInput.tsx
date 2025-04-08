import React, {useState} from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import {Email, Lock, Person} from '../assets';
import Typography from './Typography';

type inputType = 'id' | 'password' | 'email';

interface UnderlinedInputProps extends TextInputProps {
  value: string;
  onChangeFn: (text: string) => void;
  placeholder?: string;
  type?: inputType;
  errorMsg?: string;
}

const InputIcon = ({type}: {type: inputType}) => {
  switch (type) {
    case 'id':
      return <Person width={24} height={24} fill="#000" />;
    case 'email':
      return <Email width={24} height={24} fill="#000" />;
    case 'password':
      return <Lock width={24} height={24} fill="#000" />;
  }
};

const UnderlinedInput = ({
  value,
  onChangeFn,
  placeholder,
  type,
  errorMsg,
}: UnderlinedInputProps) => {
  const [focus, setFocus] = useState(false);
  return (
    <View style={{height: 60}}>
      <View
        style={[
          styles.container,
          {
            borderColor: errorMsg
              ? '#ff0000'
              : value || focus
              ? '#1833DB'
              : '#989A9F',
          },
        ]}>
        {type && <InputIcon type={type} />}
        <TextInput
          value={value}
          style={styles.input}
          autoFocus={type === 'id'}
          placeholder={placeholder}
          placeholderTextColor="#989A9F"
          onChangeText={onChangeFn}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
          autoCapitalize="none"
          secureTextEntry={type === 'password'}
          inputMode={type === 'email' ? 'email' : 'none'}
        />
      </View>
      {
        <Typography color="#ff0000" size={16} style={{paddingLeft: 36}}>
          {errorMsg || ''}
        </Typography>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  input: {
    flex: 1,
    lineHeight: 18,
    textAlignVertical: 'center',
    paddingVertical: 12,
    paddingLeft: 12,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#231815',
  },
});

export default UnderlinedInput;
