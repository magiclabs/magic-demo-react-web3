import React from 'react';
import MagicLogo from '../../images/magic.svg';

const AppHeader = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <img src={MagicLogo} alt="magic-logo" className="magic-logo" />
      <h3 className="demo-sub-header">Demo</h3>
    </div>
  );
};

export default AppHeader;
