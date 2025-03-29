import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Email, Lock, Person} from '../assets';

type inputType = 'id' | 'password' | 'email';

interface UnderlinedInputProps {
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
      <Text style={{color: '#ff0000', paddingLeft: 36}}>{errorMsg}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',

    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  input: {
    width: '100%',
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
