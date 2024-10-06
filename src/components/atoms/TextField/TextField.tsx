import React from 'react';
import { View, Text, TextInput, TextInputProps } from 'react-native';

import { tv } from 'tailwind-variants';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

interface TextFieldProps extends TextInputProps {
  label?: string;
  type: 'search' | 'text';
}

const inputContainer = tv({
  base: 'flex flex-row rounded-full bg-secondary-bg py-2 px-2 items-center hover:bg-primary-bg',
  variants: {
    type: {
      text: '',
      search: 'pr-5',
    },
  },
});

const input = tv({
  base: 'flex-1 h-10 placeholder:text-gray-1000',
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
  return (
    <View className="flex flex-col">
      {label && <Text className="mb-2 pl-3 text-sm">{label}</Text>}
      <View className={inputContainer({ type })}>
        <TextInput
          {...props}
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
