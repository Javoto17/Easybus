import { vars } from 'nativewind';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { tv } from '@/styles/tv';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  withHeader?: boolean;
}

const layoutStyle = tv({
  base: 'flex-1 bg-primary pt-[--safe-top]',
  variants: {
    header: {
      true: 'pt-0',
    },
  },
});

const Layout: React.FC<LayoutProps> = ({
  children,
  className,
  withHeader = false,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex flex-1" style={vars({ '--safe-top': insets?.top })}>
      <View
        className={layoutStyle({
          class: className,
          header: withHeader,
        })}
      >
        {children}
      </View>
    </View>
  );
};

export default Layout;
