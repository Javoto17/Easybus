import { Modal as ModalRN, View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

interface ModalProps {
  visible: boolean;
  children: React.ReactNode;
}

const Modal = ({ visible, children }: ModalProps) => {
  return (
    <ModalRN animationType="fade" transparent={true} visible={visible}>
      {children}
    </ModalRN>
  );
};

export default Modal;
