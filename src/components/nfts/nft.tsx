import React from 'react';
import nftImageOne from '../../images/nft-one.svg';
import nftImageTwo from '../../images/nft-two.svg';
import nftImageThree from '../../images/nft-three.svg';
import Spacer from '../ui/spacer';

const NFT = ({ id, name }: { id: string; name: string }) => {
  const getNftImage = () => {
    switch (Number(id) % 3) {
      case 1:
        return nftImageOne;
      case 2:
        return nftImageTwo;
      default:
        return nftImageThree;
    }
  };

  return (
    <div className="nft code">
      <div className="flex-row" style={{ justifyContent: 'flex-start' }}>
        <img src={getNftImage()} alt="nft-logo" />
        <div style={{ marginLeft: '12px' }}>
          <div className="nft-name">{name}</div>
          <Spacer size={5} />
          <div>Token ID: {id}</div>
        </div>
      </div>
    </div>
  );
};

export default NFT;
