import React, { useEffect, useState } from 'react';
import FormButton from '../ui/form-button';
import FormInput from '../ui/form-input';
import CardLabel from '../ui/card-label';
import { getNftContractAddress } from '../../utils/contracts';
import { nftAbi } from '../../utils/contract-abis';
import { useUser } from '../../contexts/UserContext';
import { useWeb3 } from '../../contexts/Web3Context';

const MintNft = () => {
  const { user } = useUser();
  const { web3 } = useWeb3();
  const [name, setName] = useState('');
  const [disabled, setDisabled] = useState(!name);

  useEffect(() => {
    setDisabled(!name);
  }, [name]);

  const mintNFT = async () => {
    try {
      setDisabled(true);
      const contractAddress = getNftContractAddress();
      const contract = new web3.eth.Contract(nftAbi, contractAddress);
      const gas = await contract.methods.mint(name).estimateGas({ from: user });
      contract.methods
        .mint(name)
        .send({
          from: user,
          gas,
        })
        .on('transactionHash', (hash: string) => {
          console.log('Transaction hash:', hash);
        })
        .then((receipt: any) => {
          setName('');
          console.log('Transaction receipt:', receipt);
        })
        .catch((error: any) => {
          setDisabled(false);
          console.error(error);
        });
    } catch (error) {
      setDisabled(false);
      console.error(error);
    }
  };

  return (
    <div>
      <CardLabel leftHeader="Mint a new NFT" />
      <FormInput value={name} onChange={(e: any) => setName(e.target.value)} placeholder="NFT name" />
      <FormButton onClick={mintNFT} disabled={!name || disabled}>
        Mint
      </FormButton>
    </div>
  );
};

export default MintNft;
