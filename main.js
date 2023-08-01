import {Network, Alchemy, Utils} from 'alchemy-sdk'
import ethers from 'ethers'
import dotenv from 'dotenv'

dotenv.config();

const {API_KEY, PRIVATE_KEY} = process.env;

// Config object
const settings = {
    apiKey: API_KEY,
    network: Network.ETH_MAINNET
}

const alchemy = new Alchemy(settings);


