import React, { useEffect } from 'react';
import TableOfContents from '../components/table-of-contents';
import AppHeader from '../components/app-header';
import Wallet from '../components/wallet';
import WalletMethods from '../components/wallet-methods';
import SigningMethods from '../components/signing';
import SendTransaction from '../components/send-transaction';
import Erc20Tokens from '../components/erc20-tokens';
import SmartContracts from '../components/contracts';
import NFTs from '../components/nfts';
import Links from '../components/links';
import Spacer from '../components/ui/spacer';
import HomePageBackground from '../images/main.svg';
import { Networks } from '../utils/networks';
import { useWeb3 } from '../contexts/Web3Context';
import { useUser } from '../contexts/UserContext';
import { logout } from '../utils/logout';

export default function Home() {
  const { user, setUser } = useUser();
  const { web3, setWeb3 } = useWeb3();
  const network = (localStorage.getItem('network') as Networks) || Networks.Sepolia;

  // Update state for newly connected wallet
  const handleDisconnect = () => {
    logout(setWeb3, setUser);
  };

  // Update state for newly connected wallet
  const handleAccountsChanged = (acc: any) => {
    console.log('New account:', acc);
    // If user disconnected wallet, logout & reset web3
    if (!acc[0]) {
      handleDisconnect();
    } else {
      localStorage.setItem('user', acc[0]);
      setUser(acc[0]);
    }
  };

  // Refresh the page when a user changes networks,
  const handleChainChanged = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (!web3 || !user) return;
    // Once a user is connected, check if the wallet is on the correct network
    (async function () {
      const userWalletChainId = await web3.eth.getChainId();
      const dappChainId = getChainIdForSetNetwork();
      if (Number(userWalletChainId) !== dappChainId) {
        alert(`Connected wallet is on the wrong network. Please switch to ${network} (chainId ${dappChainId})`);
      }
    })();

    // Listen for events emitted by third party wallets
    web3.currentProvider.on('accountsChanged', handleAccountsChanged);
    web3.currentProvider.on('chainChanged', handleChainChanged);
    return () => {
      web3.currentProvider.removeListener('accountsChanged', handleAccountsChanged);
      web3.currentProvider.removeListener('chainChanged', handleChainChanged);
    };
  }, [web3, user]);

  const getChainIdForSetNetwork = () => {
    switch (network) {
      case Networks.Polygon:
        return 80001;
      case Networks.Optimism:
        return 420;
      case Networks.Goerli:
        return 5;
      default:
        return 11155111;
    }
  };

  return (
    <div
      className="home-page"
      style={{
        backgroundImage: `url(${HomePageBackground})`,
      }}
    >
      <AppHeader />
      <Spacer size={20} />
      <Links />
      <Spacer size={125} />
      <TableOfContents />
      <div className="cards-container">
        <Wallet />
        <WalletMethods />
        <SendTransaction />
        <Erc20Tokens />
        <NFTs />
        <SmartContracts />
        <SigningMethods />
        <Spacer size={30} />
        <Links dark />
        <Spacer size={30} />
      </div>
    </div>
  );
}
