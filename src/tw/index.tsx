import { Link as RouterLink } from 'expo-router';
import React from 'react';
import {
  FlatList as RNFlatList,
  Pressable as RNPressable,
  ScrollView as RNScrollView,
  Text as RNText,
  TextInput as RNTextInput,
  TouchableOpacity as RNTouchableOpacity,
  View as RNView,
} from 'react-native';
import { useCssElement } from 'react-native-css';

type WithClassName = {
  className?: string;
};

type LinkProps = React.ComponentProps<typeof RouterLink> & WithClassName;

type FlatListProps<T> = React.ComponentProps<typeof RNFlatList<T>> &
  WithClassName & {
    contentContainerClassName?: string;
    ListHeaderComponentClassName?: string;
  };

export const Link = (props: LinkProps) => {
  return useCssElement(RouterLink, props, { className: 'style' });
};

Link.Trigger = RouterLink.Trigger;
Link.Menu = RouterLink.Menu;
Link.MenuAction = RouterLink.MenuAction;
Link.Preview = RouterLink.Preview;

export const View = (
  props: React.ComponentProps<typeof RNView> & WithClassName
) => {
  return useCssElement(RNView, props, { className: 'style' });
};

export const Text = (
  props: React.ComponentProps<typeof RNText> & WithClassName
) => {
  return useCssElement(RNText, props, { className: 'style' });
};

export const ScrollView = (
  props: React.ComponentProps<typeof RNScrollView> & {
    className?: string;
    contentContainerClassName?: string;
  }
) => {
  return useCssElement(RNScrollView, props, {
    className: 'style',
    contentContainerClassName: 'contentContainerStyle',
  });
};

export const Pressable = (
  props: React.ComponentProps<typeof RNPressable> & WithClassName
) => {
  return useCssElement(RNPressable, props, { className: 'style' });
};

export const TextInput = (
  props: React.ComponentProps<typeof RNTextInput> & WithClassName
) => {
  return useCssElement(RNTextInput, props, { className: 'style' });
};

export const TouchableOpacity = (
  props: React.ComponentProps<typeof RNTouchableOpacity> & WithClassName
) => {
  return useCssElement(RNTouchableOpacity, props, { className: 'style' });
};

export const FlatList = <T,>(props: FlatListProps<T>) => {
  return useCssElement(RNFlatList<T>, props, {
    className: 'style',
    contentContainerClassName: 'contentContainerStyle',
    ListHeaderComponentClassName: 'ListHeaderComponentStyle',
  });
};
