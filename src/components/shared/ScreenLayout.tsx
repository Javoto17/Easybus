import { FlatList, View } from '@/tw';
import { ReactNode } from 'react';
import {
  FlatListProps,
  RefreshControlProps,
  ScrollView,
  ScrollViewProps,
  ViewStyle,
} from 'react-native';

type InsetEdges = 'top' | 'bottom' | 'left' | 'right';

type BaseProps = {
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  edges?: InsetEdges[];
  style?: ViewStyle;
};

type FlatListScreenLayoutProps<T> = BaseProps & {
  variant: 'flatlist';
  data: T[];
  renderItem: FlatListProps<T>['renderItem'];
  keyExtractor: FlatListProps<T>['keyExtractor'];
  stickyHeaderIndices?: FlatListProps<T>['stickyHeaderIndices'];
  refreshControl?: React.ReactElement<RefreshControlProps>;
  showsVerticalScrollIndicator?: boolean;
  ItemSeparatorComponent?: FlatListProps<T>['ItemSeparatorComponent'];
  ListHeaderComponent?: FlatListProps<T>['ListHeaderComponent'];
  ListFooterComponent?: FlatListProps<T>['ListFooterComponent'];
};

type ScrollScreenLayoutProps = BaseProps & {
  variant: 'scroll';
  scrollProps?: Omit<ScrollViewProps, 'children'>;
};

type ScreenLayoutProps<T = unknown> =
  | FlatListScreenLayoutProps<T>
  | ScrollScreenLayoutProps;

export function ScreenLayout<T>(props: ScreenLayoutProps<T>) {
  const { children, className = '', contentClassName, style } = props;

  // For flatlist variant
  if (props.variant === 'flatlist') {
    const {
      data,
      renderItem,
      keyExtractor,
      stickyHeaderIndices,
      refreshControl,
      showsVerticalScrollIndicator = false,
      ItemSeparatorComponent,
      ListHeaderComponent,
      ListFooterComponent,
    } = props;

    return (
      <FlatList
        data={data}
        className={className}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerClassName={contentClassName}
        stickyHeaderIndices={stickyHeaderIndices}
        refreshControl={refreshControl}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
      />
    );
  }

  if (props.variant === 'scroll') {
    return (
      <ScrollView
        className={className}
        contentContainerClassName={contentClassName}
        refreshControl={props.scrollProps?.refreshControl}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={
          props.scrollProps?.showsVerticalScrollIndicator
        }
      >
        {children}
      </ScrollView>
    );
  }

  // Scroll/View variant
  return (
    <View className={`flex-1 bg-surface ${className}`} style={style}>
      {children}
    </View>
  );
}

export type {
  ScreenLayoutProps,
  FlatListScreenLayoutProps,
  ScrollScreenLayoutProps,
};
