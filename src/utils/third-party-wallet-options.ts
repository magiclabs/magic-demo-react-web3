export const thirdPartyWalletOptions = {
  coinbaseWallet: {
    sdk: {
      appName: 'Magic Demo',
    },
    provider: {
      jsonRpcUrl: process.env.REACT_APP_ETHEREUM_RPC_URL,
      chainId: 5,
    },
  },
  walletConnect: {
    rpc: {
      5: process.env.REACT_APP_ETHEREUM_RPC_URL,
      80001: process.env.REACT_APP_POLYGON_RPC_URL,
      420: process.env.REACT_APP_OPTIMISM_RPC_URL,
    },
    pollingInterval: 30 * 1000,
  },
};
