import { Stop } from '@/modules/stops/domain/Stop';
import React from 'react';
import { FlatList } from 'react-native';

interface ListOfStops {
  data: Stop[];
}

const ListOfStops = ({ data }: ListOfStops) => {
  return <FlatList data={data} />;
};

export default ListOfStops;
