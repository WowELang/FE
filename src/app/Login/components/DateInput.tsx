import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Typography from '../../../components/Typography';
import {colors} from '../../../constants/colors';

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
  const integerDate = {
    year: parseInt(date.year),
    month: parseInt(date.month),
    day: parseInt(date.day),
  };

  const lastdate = new Date(integerDate.year, integerDate.month, 0).getDate();

  const dateValidation =
    integerDate.year > new Date().getFullYear() ||
    (date.month.length === 2 &&
      (integerDate.month < 1 || integerDate.month > 12)) ||
    (date.day.length === 2 &&
      (integerDate.day < 1 || integerDate.day > lastdate));

  useEffect(() => {
    if (
      date.year.length === 4 &&
      date.month.length === 2 &&
      date.day.length === 2 &&
      !dateValidation
    )
      onChangeFn(`${date.year}-${date.month}-${date.day}`);
    else onChangeFn('');
  }, [date, onChangeFn, dateValidation]);
  return (
    <>
      <View style={styles.container}>
        <View
          style={[
            styles.dateInputWrapper,
            {
              borderBottomColor: dateValidation
                ? colors.red
                : colors.gray.secondary,
            },
          ]}>
          <TextInput
            keyboardType="numeric"
            maxLength={4}
            ref={yearRef}
            placeholder="YYYY"
            placeholderTextColor={colors.gray.secondary}
            value={date.year}
            onChangeText={text => {
              if (text.length === 4) monthRef.current?.focus();
              setDate({...date, year: text});
            }}
            style={[styles.dateText, {width: 130}]}
          />
          <Typography size={20} color="#989A9F" bold>
            /
          </Typography>
          <TextInput
            keyboardType="numeric"
            maxLength={2}
            ref={monthRef}
            placeholder="MM"
            placeholderTextColor={colors.gray.secondary}
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
            style={[styles.dateText, {width: 80}]}
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
            placeholderTextColor={colors.gray.secondary}
            style={[styles.dateText, {width: 80}]}
          />
        </View>
        {dateValidation && (
          <Typography size={12} color={colors.red} style={styles.errMsg}>
            잘못된 날짜 형식입니다.
          </Typography>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {gap: 10},
  dateInputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 15,
    textAlignVertical: 'bottom',
    paddingLeft: 15,
  },
  errMsg: {paddingLeft: 20},
});

export default DateInput;
