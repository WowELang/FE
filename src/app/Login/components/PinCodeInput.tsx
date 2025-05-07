import React, {useEffect, useRef, useState} from 'react';
import {
  Keyboard,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';

interface PinCodeInputProps {
  onComplete?: (pin: string) => void;
  pinLength?: number;
  autoFocus?: boolean;
  secure?: boolean;
  onChangePin?: (pin: string) => void;
}

const PinCodeInput: React.FC<PinCodeInputProps> = ({
  pinLength = 6,
  autoFocus = true,
  secure = false,
  onChangePin,
}) => {
  const [pins, setPins] = useState<string[]>(Array(pinLength).fill(''));
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (autoFocus) {
      // 최초엔 첫 칸에 포커스
      inputRefs.current[0]?.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    onChangePin?.(pins.join(''));
  }, [pins, onChangePin]);

  // 새로 추가된 포커스 핸들러
  const handleFocus = () => {
    // 첫 번째 빈 칸 인덱스
    const firstEmptyIndex = pins.findIndex(pin => pin === '');
    // 빈 칸이 없으면(=모두 채워졌으면) 마지막 칸으로
    const focusIndex = firstEmptyIndex === -1 ? pinLength - 1 : firstEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleChange = (text: string, index: number) => {
    // 붙여넣기 처리
    if (text.length > 1) {
      const pasted = text
        .slice(0, pinLength)
        .split('')
        .filter(ch => /^\d$/.test(ch));
      const next = [...pins];
      pasted.forEach((ch, i) => {
        if (i + index < pinLength) next[i + index] = ch;
      });
      setPins(next);

      const last = Math.min(index + pasted.length, pinLength - 1);
      inputRefs.current[last]?.focus();

      if (next.every(ch => ch !== '')) {
        Keyboard.dismiss();
      }
      return;
    }

    // 단일 입력
    if (text && !/^\d$/.test(text)) return;
    const next = [...pins];
    next[index] = text;
    setPins(next);

    if (text) {
      if (index < pinLength - 1) {
        inputRefs.current[index + 1]?.focus();
      } else if (next.every(ch => ch !== '')) {
        Keyboard.dismiss();
      }
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === 'Backspace') {
      const next = [...pins];
      if (!pins[index] && index > 0) {
        next[index - 1] = '';
        setPins(next);
        inputRefs.current[index - 1]?.focus();
      } else {
        next[index] = '';
        setPins(next);
      }
    }
  };

  return (
    <View style={styles.pinContainer}>
      {pins.map((pin, index) => (
        <View key={index} style={styles.pinWrapper}>
          <TextInput
            ref={ref => {
              inputRefs.current[index] = ref;
            }}
            style={styles.pinInput}
            value={secure && pin ? '•' : pin}
            keyboardType="numeric"
            maxLength={pinLength}
            onChangeText={text => handleChange(text, index)}
            onKeyPress={e => handleKeyPress(e, index)}
            onFocus={handleFocus} // <-- 여기에 포커스 로직 연결
            caretHidden
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 52,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  pinWrapper: {
    position: 'relative',
    marginHorizontal: 8,
  },
  pinInput: {
    width: 37,
    height: 47,
    borderBottomWidth: 1,
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default PinCodeInput;
