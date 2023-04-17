import React, { useEffect, useState } from 'react';
import Loading from '../../images/loading.svg';
import CardLabel from '../ui/card-label';
import NFT from './nft';
import { getNftContractAddress } from '../../utils/contracts';
import { nftAbi } from '../../utils/contract-abis';
import { useUser } from '../../contexts/UserContext';
import { useWeb3 } from '../../contexts/Web3Context';

interface NftDataType {
  tokenId: string;
  tokenURI: string;
}

const MyNfts = () => {
  const [nftData, setNftData] = useState<NftDataType[] | undefined>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { user } = useUser();
  const { web3 } = useWeb3();

  const formatNftMetadata = (nftIds: string[], tokenURIs: string[]) => {
    return nftIds.map((nftId: string, i: number) => {
      return {
        tokenId: nftId,
        tokenURI: tokenURIs[i],
      };
    });
  };

  const getOwnedNfts = async () => {
    if (!isRefreshing) {
      try {
        const contractAddress = getNftContractAddress();
        const contract = new web3.eth.Contract(nftAbi, contractAddress);
        const nftIds = await contract.methods.getNftsByAddress(user).call();
        const tokenURIPromises = nftIds.map(async (nftId: string) => {
          return await contract.methods.tokenURI(nftId).call();
        });
        const tokenURIs = await Promise.all(tokenURIPromises);
        const nftMetadata = formatNftMetadata(nftIds, tokenURIs);
        setNftData(nftMetadata);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (!web3 || !user) return;
    getOwnedNfts();
  }, [web3, user]);

  return (
    <div>
      <CardLabel
        style={{ height: '20px' }}
        leftHeader="My NFTs"
        rightAction={
          isRefreshing ? (
            <div className="loading-container">
              <img className="loading" alt="loading" src={Loading} />
            </div>
          ) : (
            <div
              onClick={() => {
                setIsRefreshing(true);
                setTimeout(() => {
                  setIsRefreshing(false);
                }, 500);
                getOwnedNfts();
              }}
            >
              Refresh
            </div>
          )
        }
      />
      {nftData && nftData.length > 0 ? (
        <div className="nft-list">
          {nftData.map(nft => {
            return <NFT id={nft.tokenId} key={nft.tokenId} name={nft.tokenURI} />;
          })}
        </div>
      ) : (
        <div className="code" style={{ color: '#777679' }}>
          No NFTs in wallet
        </div>
      )}
    </div>
  );
};

export default MyNfts;
