import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';

import { tv } from '@/styles/tv';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

interface TextFieldProps extends TextInputProps {
  label?: string;
  type: 'search' | 'text';
  onPressSubmit?: () => void;
}

const inputContainer = tv({
  base: 'flex flex-row items-center rounded-full border-[1px] border-primary bg-primary px-2 py-2',
  variants: {
    type: {
      text: '',
      search: 'pr-2',
    },
    focus: {
      true: 'border-active',
    },
  },
});

const input = tv({
  base: 'h-10 flex-1 text-secondary placeholder:text-placeholder',
  variants: {
    type: {
      text: '',
      search: 'pl-2',
    },
  },
});

const TextField: React.FC<TextFieldProps> = ({
  label,
  placeholder,
  type = 'text',
  onPressSubmit,
  ...props
}) => {
  const [isFocus, setFocus] = useState(false);
  const ref = useRef<TextInput>(null);

  return (
    <View className="flex flex-col">
      {label && <Text className="mb-2 pl-3 text-sm">{label}</Text>}
      <View className={inputContainer({ type, focus: isFocus })}>
        <TextInput
          {...props}
          ref={ref}
          onFocus={(e) => {
            setFocus(true);

            if (typeof props?.onFocus === 'function') {
              props?.onFocus(e);
            }
          }}
          onBlur={(e) => {
            setFocus(false);

            if (typeof props?.onBlur === 'function') {
              props?.onBlur(e);
            }
          }}
          placeholder={placeholder}
          className={input({
            type,
          })}
        />
        {type === 'search' && (
          <TouchableOpacity
            className="rounded-full bg-active p-3"
            onPress={() => {
              typeof onPressSubmit === 'function' && onPressSubmit();
            }}
          >
            <FontAwesome5 name="search" size={16} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TextField;
