import React, { useState } from 'react';
import { recoverTypedSignature, SignTypedDataVersion } from '@metamask/eth-sig-util';
import FormButton from '../ui/form-button';
import CardLabel from '../ui/card-label';
import { signTypedDataV4Payload } from '../../utils/signTypedData-payload';
import { useUser } from '../../contexts/UserContext';
import { useWeb3 } from '../../contexts/Web3Context';

const SignTypedDataV4 = () => {
  const { user } = useUser();
  const { web3 } = useWeb3();
  const [disabled, setDisabled] = useState(false);

  const signTypedDataV4 = async () => {
    try {
      setDisabled(true);
      const params = [user, JSON.stringify(signTypedDataV4Payload)];
      const method = 'eth_signTypedData_v4';
      const signature = await web3.currentProvider.request({
        method,
        params,
      });
      console.log('signature', signature);
      const recoveredAddress = recoverTypedSignature({
        data: signTypedDataV4Payload as any,
        signature,
        version: SignTypedDataVersion.V4,
      });
      console.log(
        recoveredAddress.toLocaleLowerCase() === user?.toLocaleLowerCase() ? 'Signing success!' : 'Signing failed!',
      );
      setDisabled(false);
    } catch (error) {
      setDisabled(false);
      console.error(error);
    }
  };

  return (
    <div>
      <CardLabel leftHeader="Sign Typed Data v4" />
      <FormButton onClick={signTypedDataV4} disabled={disabled}>
        Sign
      </FormButton>
    </div>
  );
};

export default SignTypedDataV4;
