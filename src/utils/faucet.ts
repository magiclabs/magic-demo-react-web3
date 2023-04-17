import { Networks } from './networks';

export const getFaucetUrl = () => {
  const network = localStorage.getItem('network');
  switch (network) {
    case Networks.Polygon:
      return 'https://faucet.polygon.technology/';
    case Networks.Optimism:
      return 'https://community.optimism.io/docs/useful-tools/faucets/';
    case Networks.Goerli:
      return 'https://goerlifaucet.com/';
    default:
      return 'https://sepoliafaucet.com/';
  }
};
