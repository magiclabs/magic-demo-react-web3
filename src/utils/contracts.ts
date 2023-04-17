import { Networks } from './networks';

export const getStorageContractAddress = () => {
  const network = localStorage.getItem('network');
  switch (network) {
    case Networks.Polygon:
      return '0xB7e7313C95b4dB35aB50760c31f29d1AA4679452';
    case Networks.Optimism:
      return '0xB7e7313C95b4dB35aB50760c31f29d1AA4679452';
    case Networks.Goerli:
      return '0xb57a27201b207E01c2b6781AB18fe1faA924f5CC';
    default:
      return '0x97bA865Df5a937095285e99bA22189E4B3BDBd1f';
  }
};

export const getNftContractAddress = () => {
  const network = localStorage.getItem('network');
  switch (network) {
    case Networks.Polygon:
      return '0xfdBa8E462e9442b6077B1FC7B230205CAece2033';
    case Networks.Optimism:
      return '0xb57a27201b207E01c2b6781AB18fe1faA924f5CC';
    case Networks.Goerli:
      return '0x5Dfec61174fbC58C2b265044F90EE12418FA011c';
    default:
      return '0xC38581C335E76E78541B79ade04eAE205704248F';
  }
};

export const getTokenContractAddress = () => {
  const network = localStorage.getItem('network');
  switch (network) {
    case Networks.Polygon:
      return '0x96d71155fcA2eD56Da251591F59E1DC5ff4095e4';
    case Networks.Optimism:
      return '0x5Dfec61174fbC58C2b265044F90EE12418FA011c';
    case Networks.Goerli:
      return '0xB7e7313C95b4dB35aB50760c31f29d1AA4679452';
    default:
      return '0x3e21cB8759CE81e6bdC1295E8E2081C4e64e488f';
  }
};
