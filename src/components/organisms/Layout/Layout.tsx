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
  base: 'flex flex-1 bg-primary',
  variants: {
    header: {
      false: 'pt-[--safe-top]',
      true: 'pt-0',
    },
  },
});

const wrapperStyle = tv({
  base: 'flex flex-1 bg-primary',
});

const Layout: React.FC<LayoutProps> = ({
  children,
  className,
  withHeader = false,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={vars({ '--safe-top': insets?.top })}
      className={layoutStyle({
        header: withHeader,
      })}
    >
      <View
        className={wrapperStyle({
          class: className,
        })}
      >
        {children}
      </View>
    </View>
  );
};

export default Layout;
