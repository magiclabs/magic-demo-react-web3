import React, { useEffect, useState } from 'react';
import Divider from '../ui/divider';
import FormButton from '../ui/form-button';
import FormInput from '../ui/form-input';
import CardLabel from '../ui/card-label';
import ErrorText from '../ui/error';
import { getStorageContractAddress } from '../../utils/contracts';
import { storageContractAbi } from '../../utils/contract-abis';
import { useUser } from '../../contexts/UserContext';
import { useWeb3 } from '../../contexts/Web3Context';

const StorageContract = () => {
  const { user } = useUser();
  const { web3 } = useWeb3();
  const [newNumber, setNewNumber] = useState('');
  const [storedNumber, setStoredNumber] = useState('');
  const [disabled, setDisabled] = useState(!newNumber);
  const [newNumberError, setNewNumberError] = useState(false);

  const getStoredNumber = async () => {
    try {
      const contractAddress = getStorageContractAddress();
      const contract = new web3.eth.Contract(storageContractAbi, contractAddress);
      const number = await contract.methods.number().call();
      setStoredNumber(number);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setDisabled(!newNumber);
    setNewNumberError(false);
  }, [newNumber]);

  const updateNumber = () => {
    if (isNaN(Number(newNumber))) return setNewNumberError(true);
    setDisabled(true);
    const contractAddress = getStorageContractAddress();
    const contract = new web3.eth.Contract(storageContractAbi, contractAddress);
    contract.methods
      .store(Number(newNumber))
      .send({ from: user })
      .on('transactionHash', (hash: string) => {
        console.log('Transaction hash:', hash);
      })
      .then((receipt: any) => {
        setNewNumber('');
        setDisabled(false);
        getStoredNumber();
        console.log('Transaction receipt:', receipt);
      })
      .catch((error: any) => {
        console.error(error);
        setDisabled(false);
      });
  };

  useEffect(() => {
    if (!web3) return;
    getStoredNumber();
  }, [web3]);

  return (
    <div>
      <CardLabel leftHeader="Number stored in contract" />
      <div className="code">{storedNumber}</div>
      <Divider />
      <CardLabel leftHeader="Update number stored in contract" />
      <FormInput value={newNumber} onChange={(e: any) => setNewNumber(e.target.value)} placeholder="New number" />
      {newNumberError ? <ErrorText>Invalid number</ErrorText> : null}
      <FormButton onClick={updateNumber} disabled={!newNumber || disabled}>
        Call Contract
      </FormButton>
    </div>
  );
};

export default StorageContract;
