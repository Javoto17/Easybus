import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Text, TouchableOpacity, View } from '@/tw';

import TextField from '@/components/atoms/TextField/TextField';
import Modal from '@/components/molecules/Modal/Modal';

interface StopModalProps {
  visible: boolean;
  onPressCancel: () => void;
  onPressConfirm: (value: string | undefined) => void;
}

const StopModal = ({
  onPressCancel,
  onPressConfirm,
  visible,
}: StopModalProps) => {
  const [value, setValue] = useState<string | undefined>(undefined);

  const handleChangeText = (text: string) => {
    setValue(text);
  };

  return (
    <Modal visible={visible}>
      <View className="relative w-full flex-1 flex-col items-center justify-center">
        <TouchableWithoutFeedback onPress={() => onPressCancel()}>
          <View className="bg-backdrop absolute inset-0 h-full w-full" />
        </TouchableWithoutFeedback>
        <View className="mx-margin">
          <View className="z-50 flex w-full rounded-lg bg-card p-4 shadow-md">
            <Text className="text-ce mb-4 text-body-large font-semibold text-primary">
              Save stop as favorite with a custom name
            </Text>
            <TextField
              placeholder="Nombre de la parada"
              onChangeText={handleChangeText}
              type="text"
              value={value}
              className="text-body-large"
            />
            <View className="mt-4 flex flex-row items-center justify-between">
              <View className="flex basis-1/2 flex-row items-center justify-center">
                <TouchableOpacity
                  onPress={() => {
                    if (typeof onPressCancel === 'function') {
                      onPressCancel();
                    }
                    setValue('');
                  }}
                >
                  <View className="flex-row items-center justify-center">
                    <Text className="text-center text-body-large font-semibold text-primary">
                      Cancel
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View className="flex basis-1/2 flex-row items-center justify-center">
                <TouchableOpacity
                  onPress={() => {
                    if (typeof onPressConfirm === 'function') {
                      onPressConfirm(value);
                    }
                    setValue('');
                  }}
                >
                  <View className="flex-row items-center justify-center px-2 py-2">
                    <Text className="text-center text-body-large font-semibold text-active">
                      Save
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default StopModal;
