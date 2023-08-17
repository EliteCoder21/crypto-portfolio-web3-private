import { Alchemy, Network } from 'alchemy-sdk';

const config = {
  apiKey: process.env.ALCHEMY_KEY,
  network: Network.ETH_GOERLI,
};

export const alchemy = new Alchemy(config);
