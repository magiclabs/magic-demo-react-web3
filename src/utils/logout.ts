import { magic } from '../libs/magic';
import { getProvider } from '../libs/provider';

// When a user logs out, disconnect with Magic & re-set web3 provider
export const logout = async (setWeb3: any, setUser: any) => {
  await magic.wallet.disconnect();
  const provider = await getProvider();
  setWeb3(provider);
  setUser(null);
  localStorage.removeItem('user');
  console.log('Successfully disconnected');
};
