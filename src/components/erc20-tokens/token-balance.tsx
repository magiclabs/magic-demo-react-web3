import React, { useEffect, useState } from 'react';
import Loading from '../../images/loading.svg';
import CardLabel from '../ui/card-label';
import { getTokenContractAddress } from '../../utils/contracts';
import { magicTestTokenAbi } from '../../utils/contract-abis';
import { useUser } from '../../contexts/UserContext';
import { useWeb3 } from '../../contexts/Web3Context';

const TokenBalance = () => {
  const { user } = useUser();
  const { web3 } = useWeb3();
  const [balance, setBalance] = useState('0');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getTestTokenBalance = async () => {
    if (!isRefreshing) {
      const contractAddress = getTokenContractAddress();
      const contract = new web3.eth.Contract(magicTestTokenAbi, contractAddress);
      const balance = await contract.methods.balanceOf(user).call();
      setBalance(web3.utils.fromWei(balance));
    }
  };

  useEffect(() => {
    if (!user || !web3) return;
    getTestTokenBalance();
  }, [user, web3]);

  return (
    <div>
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
                getTestTokenBalance();
              }}
            >
              Refresh
            </div>
          )
        }
      />
      <div className="code">{balance.substring(0, 7)} MTT</div>
    </div>
  );
};

export default TokenBalance;
