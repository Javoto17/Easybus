import { View } from '@/tw';
import { Card, SkeletonGroup } from 'heroui-native';
import React from 'react';

const HomeLoadingState = () => {
  return (
    <View className="px-margin pt-2">
      {[1, 2, 3].map((item) => {
        return (
          <Card
            key={`home-loading-${item}`}
            className="border-border mb-3 rounded-2xl border"
          >
            <SkeletonGroup isLoading className="gap-3 p-4" isSkeletonOnly>
              <View className="flex-row items-center gap-3">
                <SkeletonGroup.Item className="size-10 rounded-lg" />
                <View className="flex-1 gap-2">
                  <SkeletonGroup.Item className="h-4 w-40 rounded-md" />
                  <SkeletonGroup.Item className="h-3 w-56 rounded-md" />
                </View>
              </View>
              <View className="flex-row gap-2">
                <SkeletonGroup.Item className="h-7 w-12 rounded-full" />
                <SkeletonGroup.Item className="h-7 w-12 rounded-full" />
                <SkeletonGroup.Item className="h-7 w-12 rounded-full" />
              </View>
            </SkeletonGroup>
          </Card>
        );
      })}
    </View>
  );
};

export default HomeLoadingState;
