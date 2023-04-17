import React, { useState } from 'react';
import Loading from '../../images/loading.svg';
import { useUser } from '../../contexts/UserContext';
import { useWeb3 } from '../../contexts/Web3Context';
import { logout } from '../../utils/logout';

const Disconnect = () => {
  const { setUser } = useUser();
  const { setWeb3 } = useWeb3();
  const [disabled, setDisabled] = useState(false);

  const disconnect = async () => {
    try {
      setDisabled(true);
      await logout(setWeb3, setUser);
    } catch (error) {
      setDisabled(false);
      console.error(error);
    }
  };

  return (
    <div className="wallet-method-container">
      <button className="wallet-method" onClick={disconnect} disabled={disabled}>
        {disabled ? (
          <div className="loadingContainer" style={{ width: '115px' }}>
            <img className="loading" alt="loading" src={Loading} />
          </div>
        ) : (
          'disconnect()'
        )}
      </button>
      <div className="wallet-method-desc">Disconnects user from dApp.</div>
    </div>
  );
};

export default Disconnect;
