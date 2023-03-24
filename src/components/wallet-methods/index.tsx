import React from 'react';
import Disconnect from './disconnect';
import GetWalletInfo from './get-info';
import RequestUserInfo from './request-user-info';
import ShowUI from './show-ui';
import Divider from '../ui/divider';
import Card from '../ui/card';
import CardHeader from '../ui/card-header';

const WalletMethods = () => {
  return (
    <Card>
      <CardHeader id="wallet-methods">Wallet Methods</CardHeader>
      <ShowUI />
      <Divider />
      <GetWalletInfo />
      <Divider />
      <RequestUserInfo />
      <Divider />
      <Disconnect />
    </Card>
  );
};

export default WalletMethods;
