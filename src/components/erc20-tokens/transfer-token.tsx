import React, { useEffect, useState } from 'react';
import FormButton from '../ui/form-button';
import FormInput from '../ui/form-input';
import CardLabel from '../ui/card-label';
import ErrorText from '../ui/error';
import { getTokenContractAddress } from '../../utils/contracts';
import { magicTestTokenAbi } from '../../utils/contract-abis';
import { useUser } from '../../contexts/UserContext';
import { useWeb3 } from '../../contexts/Web3Context';

const TransferToken = () => {
  const { user } = useUser();
  const { web3 } = useWeb3();
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [disabled, setDisabled] = useState(!toAddress || !amount);
  const [toAddressError, setToAddressError] = useState(false);
  const [amountError, setAmountError] = useState(false);

  useEffect(() => {
    setDisabled(!toAddress || !amount);
    setAmountError(false);
    setToAddressError(false);
  }, [amount, toAddress]);

  const transferTestTokens = () => {
    if (!web3.utils.isAddress(toAddress)) return setToAddressError(true);
    if (isNaN(Number(amount))) return setAmountError(true);
    setDisabled(true);
    const contractAddress = getTokenContractAddress();
    const contract = new web3.eth.Contract(magicTestTokenAbi, contractAddress);
    contract.methods
      .transfer(toAddress, web3.utils.toWei(amount))
      .send({ from: user })
      .on('transactionHash', (hash: string) => {
        console.log('Transaction hash:', hash);
      })
      .then((receipt: any) => {
        setToAddress('');
        setAmount('');
        console.log('Transaction receipt:', receipt);
      })
      .catch((error: any) => {
        setDisabled(false);
        console.error(error);
      });
  };

  return (
    <div>
      <CardLabel leftHeader="Send ERC20" />
      <FormInput
        value={toAddress}
        onChange={(e: any) => setToAddress(e.target.value)}
        placeholder="Receiving Address"
      />
      {toAddressError ? <ErrorText>Invalid address</ErrorText> : null}
      <FormInput value={amount} onChange={(e: any) => setAmount(e.target.value)} placeholder="Amount of MTT" />
      {amountError ? <ErrorText className="error">Invalid amount</ErrorText> : null}
      <FormButton onClick={transferTestTokens} disabled={!toAddress || !amount || disabled}>
        Transfer Tokens
      </FormButton>
    </div>
  );
};

export default TransferToken;
