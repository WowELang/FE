import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Email, Lock, Person} from '../assets';

type inputType = 'id' | 'password' | 'email';

interface UnderlinedInputProps {
  value: string;
  onChangeFn: (text: string) => void;
  placeholder?: string;
  type?: inputType;
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
}: UnderlinedInputProps) => {
  const [focus, setFocus] = useState(false);
  return (
    <View
      style={[
        styles.container,
        {borderColor: value || focus ? '#1833DB' : '#989A9F'},
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
