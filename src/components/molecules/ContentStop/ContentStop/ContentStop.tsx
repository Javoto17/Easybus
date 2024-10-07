import React from 'react';
import { View, Text } from 'react-native';

interface ContentStopProps {
  children: React.ReactNode;
}

export const ContentStop = ({ children }: ContentStopProps) => {
  return <View className="content-stop">{children}</View>;
};

interface ContentStopCardProps {
  children: React.ReactNode;
}

interface ContentStopTitleProps {
  children: React.ReactNode;
}

interface ContentStopContentProps {
  children: React.ReactNode;
  className?: string;
}

ContentStop.Card = ({ children }: ContentStopCardProps) => {
  return (
    <View className="bg-secondary overflow-hidden rounded-lg px-2 py-2 shadow-md">
      {children}
    </View>
  );
};

ContentStop.Title = ({ children }: ContentStopTitleProps) => {
  return <Text className="text-primary z-10 mb-3 text-h400">{children}</Text>;
};

ContentStop.Content = ({ children, className }: ContentStopContentProps) => {
  return <View className={className}>{children}</View>;
};
