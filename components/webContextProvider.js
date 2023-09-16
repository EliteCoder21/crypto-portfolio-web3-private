import React, { useState, createContext } from 'react';

export const AppContext = createContext();

const WebContextProvider = (props) => {
  const [owner, setOwner] = useState('');
  const [userBalance, setUserBalance] = useState(0);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [OZTCoin, setOZTCoin] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);

  return (
    <AppContext.Provider
      value={{
        owner,
        setOwner,
        userBalance,
        setUserBalance,
        selectedAccount,
        setSelectedAccount,
        OZTCoin,
        setOZTCoin,
        web3,
        setWeb3,
        walletConnected,
        setWalletConnected,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default WebContextProvider;