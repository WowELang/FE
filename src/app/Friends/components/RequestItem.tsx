import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Profile from '../../../components/Profile';
import Typography from '../../../components/Typography';
import {colors} from '../../../constants/colors';
import {RequestModalProps} from './RequestModal';

interface RequestItemProps {
  name: string;
  dept: string;
  interests: string[];
  date: string;
  modalHandler: ({
    isOpen,
    name,
    type,
  }: Omit<RequestModalProps, 'closeFn'>) => void;
}

const RequestItem = ({
  name,
  dept,
  interests,
  date,
  modalHandler,
}: RequestItemProps) => {
  return (
    <View style={styles.box}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', gap: 22}}>
          <Profile size={60} color="pink" type="normal" />
          <View style={{gap: 10}}>
            <Typography size={16} bold>
              {name}
            </Typography>
            <Typography size={16} color={colors.gray.primary}>
              {dept}
            </Typography>
            <View style={{flexDirection: 'row', gap: 2}}>
              {interests.map((item, idx) => (
                <Typography key={`${item}-${idx}`} size={10} style={styles.tag}>
                  {item}
                </Typography>
              ))}
            </View>
          </View>
        </View>
        <Typography size={12} color={colors.gray.primary}>
          {date}
        </Typography>
      </View>
      <View style={{flexDirection: 'row', gap: 4}}>
        <Pressable
          style={[styles.button, {backgroundColor: colors.blue.primary}]}
          onPress={() => {
            modalHandler({isOpen: true, name: name, type: 'Accept'});
          }}>
          <Typography size={12} color={colors.white} bold>
            수락
          </Typography>
        </Pressable>
        <Pressable
          style={[styles.button, {backgroundColor: colors.gray.primary}]}
          onPress={() => {
            modalHandler({isOpen: true, name: name, type: 'Reject'});
          }}>
          <Typography size={12} color={colors.white} bold>
            거부
          </Typography>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: colors.white,
    gap: 16,
  },
  tag: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.blue.secondary,
    borderRadius: 20,
  },
  button: {
    flexDirection: 'row',
    paddingHorizontal: 62,
    paddingVertical: 10,
    borderRadius: 10,
  },
});

export default RequestItem;
