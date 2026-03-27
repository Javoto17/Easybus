import React from 'react';

import Layout from '@/components/organisms/Layout/Layout';
import { Text } from '@/tw';

const ErrorScreen = () => {
  return (
    <Layout className="items-center justify-center px-margin" withHeader>
      <Text className="text-center font-poppins text-body-large font-bold text-primary">
        Ups.. Something went wrong
      </Text>
    </Layout>
  );
};

export default ErrorScreen;
