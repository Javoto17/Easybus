import React, { useState } from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

import { tv } from 'tailwind-variants';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

interface TextFieldProps extends TextInputProps {
  label?: string;
  type: 'search' | 'text';
}

const inputContainer = tv({
  base: 'flex flex-row rounded-full bg-primary py-2 px-2 items-center border-[1px] border-primary',
  variants: {
    type: {
      text: '',
      search: 'pr-5',
    },
    focus: {
      true: 'border-active',
    },
  },
});

const input = tv({
  base: 'flex-1 h-10 placeholder:text-placeholder text-secondary',
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
  ...props
}) => {
  const [isFocus, setFocus] = useState(false);

  return (
    <View className="flex flex-col">
      {label && <Text className="mb-2 pl-3 text-sm">{label}</Text>}
      <View className={inputContainer({ type, focus: isFocus })}>
        <TextInput
          {...props}
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
        {type === 'search' && <FontAwesome5 name="search" size={18} />}
      </View>
    </View>
  );
};

export default TextField;
