import React, { useState } from 'react';
import FormButton from '../ui/form-button';
import { getTokenContractAddress } from '../../utils/contracts';
import { magicTestTokenAbi } from '../../utils/contract-abis';
import { useUser } from '../../contexts/UserContext';
import { useWeb3 } from '../../contexts/Web3Context';

const MintToken = () => {
  const { user } = useUser();
  const { web3 } = useWeb3();
  const [disabled, setDisabled] = useState(false);

  const mintTestTokens = () => {
    setDisabled(true);
    const contractAddress = getTokenContractAddress();
    const contract = new web3.eth.Contract(magicTestTokenAbi, contractAddress);
    contract.methods
      .mint(web3.utils.toWei('10'))
      .send({ from: user })
      .on('transactionHash', (hash: string) => {
        console.log('Transaction hash:', hash);
      })
      .then((receipt: any) => {
        setDisabled(false);
        console.log('Transaction receipt:', receipt);
      })
      .catch((error: any) => {
        setDisabled(false);
        console.error(error);
      });
  };

  return (
    <FormButton onClick={mintTestTokens} disabled={disabled}>
      Mint 10 Magic Test Tokens
    </FormButton>
  );
};

export default MintToken;
