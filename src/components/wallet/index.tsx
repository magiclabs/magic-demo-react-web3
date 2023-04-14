import React, { useEffect, useState } from 'react';
import Divider from '../ui/divider';
import Loading from '../../images/loading.svg';
import Network from '../network';
import CardLabel from '../ui/card-label';
import Card from '../ui/card';
import CardHeader from '../ui/card-header';
import { Networks } from '../../utils/networks';
import { useUser } from '../../contexts/UserContext';
import { useWeb3 } from '../../contexts/Web3Context';
import { logout } from '../../utils/logout';

const UserInfo = () => {
  const { user, setUser } = useUser();
  const { web3, setWeb3 } = useWeb3();
  const [balance, setBalance] = useState('...');
  const [copied, setCopied] = useState('Copy');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const network = localStorage.getItem('network');
  const tokenSymbol = network === Networks.Polygon ? 'MATIC' : 'ETH';

  const copy = () => {
    if (user && copied === 'Copy') {
      setCopied('Copied!');
      navigator.clipboard.writeText(user);
      setTimeout(() => {
        setCopied('Copy');
      }, 1000);
    }
  };

  const getBalance = async () => {
    if (user && web3) {
      try {
        const balance = await web3.eth.getBalance(user);
        setBalance(web3.utils.fromWei(balance));
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (!web3 || !user) return;
    getBalance();
  }, [web3, user]);

  return (
    <Card>
      <CardHeader id="wallet">Wallet</CardHeader>
      <CardLabel
        leftHeader="Status"
        rightAction={<div onClick={() => logout(setWeb3, setUser)}>Disconnect</div>}
        isDisconnect
      />
      <div className="flex-row">
        <div className="green-dot" />
        <div className="connected">Connected</div>
      </div>
      <Divider />
      <CardLabel leftHeader="Network" />
      <Network />
      <Divider />
      <CardLabel leftHeader="Address" rightAction={<div onClick={copy}>{copied}</div>} />
      <div className="code">{user}</div>
      <Divider />
      <CardLabel
        style={{ height: '20px' }}
        leftHeader="Balance"
        rightAction={
          isRefreshing ? (
            <div className="loading-container">
              <img className="loading" alt="loading" src={Loading} />
            </div>
          ) : (
            <div
              onClick={() => {
                setIsRefreshing(true);
                setTimeout(() => {
                  setIsRefreshing(false);
                }, 500);
                getBalance();
              }}
            >
              Refresh
            </div>
          )
        }
      />
      <div className="code">
        {balance.substring(0, 7)} {tokenSymbol}
      </div>
    </Card>
  );
};

export default UserInfo;
