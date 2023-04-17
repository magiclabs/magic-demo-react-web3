import React, { useState } from 'react';
import Loading from '../../images/loading.svg';
import ErrorText from '../ui/error';
import Spacer from '../ui/spacer';
import { magic } from '../../libs/magic';
import { logout } from '../../utils/logout';
import { useWeb3 } from '../../contexts/Web3Context';
import { useUser } from '../../contexts/UserContext';

const ShowUI = () => {
  const { setWeb3 } = useWeb3();
  const { setUser } = useUser();
  const [disabled, setDisabled] = useState(false);
  const [showUIError, setShowUIError] = useState(false);

  const showUI = async () => {
    try {
      setDisabled(true);
      setShowUIError(false);
      const { walletType } = await magic.wallet.getInfo();
      if (walletType !== 'magic') {
        setDisabled(false);
        setShowUIError(true);
        return;
      }
      (magic.wallet.showUI() as any)
        .on('disconnect', () => {
          logout(setWeb3, setUser);
        })
        .then(() => setDisabled(false));
    } catch (error) {
      setDisabled(false);
      console.error(error);
    }
  };

  return (
    <div className="wallet-method-container">
      <button className="wallet-method" onClick={showUI} disabled={disabled}>
        {disabled ? (
          <div className="loadingContainer" style={{ width: '76px' }}>
            <img className="loading" alt="loading" src={Loading} />
          </div>
        ) : (
          'showUI()'
        )}
      </button>
      <div className="wallet-method-desc">
        Opens wallet view to manage assets, purchase/send/receive crypto, and access recovery phrase.
      </div>
      {showUIError ? (
        <div style={{ marginBottom: '-10px' }}>
          <Spacer size={20} />
          <ErrorText>Method not supported for third party wallets.</ErrorText>
        </div>
      ) : null}
    </div>
  );
};

export default ShowUI;
