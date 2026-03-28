import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { tv } from '@/styles/tv';
import { View } from '@/tw';
import { useCSSVariable } from 'uniwind';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  withHeader?: boolean;
}

const layoutStyle = tv({
  base: 'flex flex-1 bg-primary',
  variants: {
    header: {
      false: '',
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
  const safeTopValue = useCSSVariable('--safe-top') ?? insets.top;

  return (
    <View
      style={{ paddingTop: withHeader ? 0 : safeTopValue }}
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
