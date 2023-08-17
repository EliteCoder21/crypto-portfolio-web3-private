import { alchemy } from './alchemy.js';

export default async (req, res) => {
  const {
    query: { selectedAccount, contractAddress },
  } = req;
  let fromSelectedAccount = await alchemy.core.getAssetTransfers({
    contractAddresses: [contractAddress],
    category: ['erc20'],
    withMetadata: true,
  });
  res.status(200).json(fromSelectedAccount);
};
