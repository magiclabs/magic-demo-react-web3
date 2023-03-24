import React, { useState } from 'react';
import AppHeader from '../components/app-header';
import Links from '../components/links';
import Network from '../components/network';
import ConnectButton from '../components/ui/connect-button';
import Spacer from '../components/ui/spacer';
import LoginPageBackground from '../images/login.svg';
import { useUser } from '../contexts/UserContext';
import { magic } from '../libs/magic';
import { useWeb3 } from '../contexts/Web3Context';
import { getWeb3 } from '../libs/web3';

const Login = () => {
  const { setUser } = useUser();
  const { setWeb3 } = useWeb3();
  const [disabled, setDisabled] = useState(false);

  const connect = async () => {
    try {
      setDisabled(true);
      const accounts = await magic.wallet.connectWithUI();
      setDisabled(false);
      console.log('Logged in user:', accounts[0]);
      localStorage.setItem('user', accounts[0]);

      // Once user is logged in, re-initialize web3 instance to use the new provider (if connected with third party wallet)
      const web3 = await getWeb3();
      setWeb3(web3);
      setUser(accounts[0]);
    } catch (error) {
      setDisabled(false);
      console.error(error);
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${LoginPageBackground})`,
      }}
    >
      <AppHeader />
      <Spacer size={30} />
      <Network />
      <Spacer size={20} />
      <ConnectButton onClick={connect} disabled={disabled} />
      <Links footer />
    </div>
  );
};

export default Login;
