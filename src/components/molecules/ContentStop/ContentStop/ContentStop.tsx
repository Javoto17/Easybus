import React, { Suspense } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { useWindowDimensions } from 'react-native';
import { Text, View } from '@/tw';

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
    <View className="overflow-hidden rounded-lg bg-secondary px-4 py-4 shadow-md">
      {children}
    </View>
  );
};

ContentStop.Title = ({ children }: ContentStopTitleProps) => {
  return <Text className="z-10 mb-3 text-h400 text-primary">{children}</Text>;
};

ContentStop.Content = ({ children, className }: ContentStopContentProps) => {
  const Dimensions = useWindowDimensions();

  return <View className={className}>{children}</View>;
};
