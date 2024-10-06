import { vars } from 'nativewind';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { tv } from 'tailwind-variants';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const layoutStyle = tv({
  base: 'bg-primary-bg flex-1 pt-[--safe-top]',
});

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex flex-1" style={vars({ '--safe-top': insets?.top })}>
      <View
        className={layoutStyle({
          class: className,
        })}
      >
        {children}
      </View>
    </View>
  );
};

export default Layout;
