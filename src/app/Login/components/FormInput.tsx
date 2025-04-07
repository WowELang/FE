import React from 'react';
import {Control, Controller} from 'react-hook-form';
import {Pressable, View} from 'react-native';
import {Foreign, Native} from '../../../assets';
import Dropdown from '../../../components/Dropdown';
import Typography from '../../../components/Typography';
import UnderlinedInput from '../../../components/UnderlinedInput';
import {COUNTRIES} from '../../../constants/countries';
import {UserSignupReqDto} from '../../../types/dto/UserSignupReqDto';
import ChoiceButton from './ChoiceButton';
import DateInput from './DateInput';

interface FormInputProps {
  field: keyof UserSignupReqDto;
  control: Control<UserSignupReqDto>;
  data: UserSignupReqDto;
}

const FormInput = ({field, control, data}: FormInputProps) => {
  return (
    <Controller
      key={field}
      name={field}
      control={control}
      render={({field: {value, onChange}}) => {
        switch (field) {
          case 'userType':
            return (
              <View style={{marginBottom: 168}}>
                <ChoiceButton
                  title={['유학생 튜티', '재학생 튜터']}
                  subTitle={['TUTEE', 'TUTOR']}
                  icon={[<Foreign fill="#000" />, <Native fill="#000" />]}
                  value={['foreign', 'native']}
                  state={typeof value === 'string' ? value : ''}
                  onChangeFn={onChange}
                />
              </View>
            );
          case 'country':
            return (
              <View style={{gap: 44, marginBottom: 315}}>
                <Typography size={28} color="#1833DB" bold>
                  국적
                </Typography>
                <Dropdown
                  title="국적"
                  menuItems={COUNTRIES}
                  value={typeof value === 'string' ? value : ''}
                  handleFn={onChange}
                />
              </View>
            );
          case 'name':
            return (
              <View
                style={{
                  gap: 44,
                }}>
                <Typography size={28} color="#1833DB" bold>
                  이름
                </Typography>
                <UnderlinedInput
                  value={typeof value === 'string' ? value : ''}
                  onChangeFn={onChange}
                  placeholder="본명을 입력하세요."
                />
              </View>
            );
          case 'gender':
            return (
              <View style={{marginBottom: 168}}>
                <ChoiceButton
                  title={['여성', '남성']}
                  value={['FEMALE', 'MALE']}
                  state={typeof value === 'string' ? value : undefined}
                  onChangeFn={onChange}
                />
              </View>
            );
          case 'birthday':
            return (
              <View style={{gap: 44, marginBottom: 315}}>
                <Typography size={28} color="#1833DB" bold>
                  생년월일
                </Typography>
                <DateInput value={value} onChangeFn={onChange} />
              </View>
            );
          case 'major':
            return (
              <View style={{gap: 44, marginBottom: 315}}>
                <Typography size={28} color="#1833DB" bold>
                  전공
                </Typography>
                <Dropdown
                  title="전공"
                  menuItems={[
                    '컴퓨터공학과',
                    '도시공학과',
                    '기계시스템디자인학부',
                    '산업데이터공학과',
                    '국어국문학과',
                  ]}
                  value={
                    typeof value === 'string' && value !== 'none' ? value : ''
                  }
                  handleFn={onChange}
                />
                {data.userType === 'foreign' && (
                  <Pressable
                    style={{
                      backgroundColor: '#fff',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderRadius: 8,
                      paddingVertical: 14,
                      paddingHorizontal: 12,
                      position: 'relative',
                      zIndex: 0,
                      borderColor: value === 'none' ? '#1833DB' : '#9d9d9d',
                      borderWidth: value === 'none' ? 2 : 1,
                    }}
                    onPress={() => {
                      onChange('none');
                    }}>
                    <Typography size={16}>전공이 없어요</Typography>
                  </Pressable>
                )}
              </View>
            );
          default:
            return <></>;
        }
      }}
    />
  );
};

export default FormInput;
