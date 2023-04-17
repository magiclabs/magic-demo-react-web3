import React, { useEffect, useState } from 'react';
import { recoverPersonalSignature } from '@metamask/eth-sig-util';
import FormButton from '../ui/form-button';
import FormInput from '../ui/form-input';
import CardLabel from '../ui/card-label';
import { useUser } from '../../contexts/UserContext';
import { useWeb3 } from '../../contexts/Web3Context';

const PersonalSign = () => {
  const { user } = useUser();
  const { web3 } = useWeb3();
  const [message, setMessage] = useState('');
  const [disabled, setDisabled] = useState(!message);

  useEffect(() => {
    setDisabled(!message);
  }, [message]);

  const personalSign = async () => {
    try {
      if (user) {
        setDisabled(true);
        const signedMessage = await web3.eth.personal.sign(message, user);
        console.log('signedMessage:', signedMessage);
        const recoveredAddress = recoverPersonalSignature({
          data: message,
          signature: signedMessage,
        });
        console.log(
          recoveredAddress.toLocaleLowerCase() === user?.toLocaleLowerCase() ? 'Signing success!' : 'Signing failed!',
        );
        setMessage('');
        setDisabled(false);
      }
    } catch (error) {
      setDisabled(false);
      console.error(error);
    }
  };

  return (
    <div>
      <CardLabel leftHeader="Personal Sign" />
      <FormInput value={message} onChange={(e: any) => setMessage(e.target.value)} placeholder="My message" />
      <FormButton onClick={personalSign} disabled={!message || disabled}>
        Sign
      </FormButton>
    </div>
  );
};

export default PersonalSign;
