import React, {useEffect, useRef, useState} from 'react';
import {TextInput, View} from 'react-native';
import Typography from '../../../components/Typography';

interface DateInputProps {
  value: string;
  onChangeFn: (text: string) => void;
}

const DateInput = ({value, onChangeFn}: DateInputProps) => {
  const yearRef = useRef<TextInput>(null);
  const monthRef = useRef<TextInput>(null);
  const dayRef = useRef<TextInput>(null);

  const [date, setDate] = useState({
    year: value.slice(0, 4),
    month: value.slice(5, 7),
    day: value.slice(8, 10),
  });
  useEffect(() => {
    if (
      date.year.length === 4 &&
      date.month.length === 2 &&
      date.day.length === 2
    )
      onChangeFn(`${date.year}-${date.month}-${date.day}`);
  }, [date]);
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: '#989A9F',
          paddingVertical: 10,
          paddingHorizontal: 5,
        }}>
        <TextInput
          keyboardType="numeric"
          maxLength={4}
          ref={yearRef}
          placeholder="YYYY"
          placeholderTextColor={'#989A9F'}
          value={date.year}
          onChangeText={text => {
            if (text.length === 4) monthRef.current?.focus();
            setDate({...date, year: text});
          }}
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            letterSpacing: 15,
            textAlignVertical: 'center',
            paddingLeft: 15,
            width: 130,
          }}
        />
        <Typography size={20} color="#989A9F" bold>
          /
        </Typography>
        <TextInput
          keyboardType="numeric"
          maxLength={2}
          ref={monthRef}
          placeholder="MM"
          placeholderTextColor={'#989A9F'}
          value={date.month}
          onChangeText={text => {
            if (text.length === 2) dayRef.current?.focus();
            setDate({...date, month: text});
          }}
          onKeyPress={e => {
            if (e.nativeEvent.key === 'Backspace' && date.month === '') {
              setDate(prev => {
                return {...date, year: prev.year.slice(0, -1)};
              });
              yearRef.current?.focus();
            }
          }}
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            letterSpacing: 15,
            textAlignVertical: 'center',
            paddingLeft: 15,
            width: 80,
          }}
        />
        <Typography size={20} color="#989A9F" bold>
          /
        </Typography>
        <TextInput
          keyboardType="numeric"
          maxLength={2}
          ref={dayRef}
          value={date.day}
          onChangeText={text => {
            setDate({...date, day: text});
          }}
          onKeyPress={e => {
            if (e.nativeEvent.key === 'Backspace' && date.day === '') {
              setDate(prev => {
                return {...date, month: prev.month.slice(0, -1)};
              });
              monthRef.current?.focus();
            }
          }}
          placeholder="DD"
          placeholderTextColor={'#989A9F'}
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            letterSpacing: 15,
            textAlignVertical: 'center',
            paddingLeft: 15,
            width: 80,
          }}
        />
      </View>
      <Typography size={20}>{date.year + date.month + date.day}</Typography>
    </>
  );
};

export default DateInput;
