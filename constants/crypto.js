const cryptocurrency = {
    "BTC": "bitcoin",
    "ETH": "ethereum",
    "USDT": "tether",
    "BNB": "binancecoin",
    "XRP": "ripple",
    "USDC": "usd-coin",
    "STETH": "staked-ether",
    "ADA": "cardano",
    "DOGE": "dogecoin",
    "SOL": "solana",
    "TRX": "tron",
    "DOT": "polkadot",
    "MATIC": "matic-network",
    "SHIB": "shiba-inu",
    "LTC": "litecoin",
    "TON": "the-open-network",
    "WBTC": "wrapped-bitcoin",
    "DAI": "dai",
    "AVAX": "avalanche-2",
    "UNI": "uniswap",
    "BCH": "bitcoin-cash",
    "LEO": "leo-token",
    "XLM": "stellar",
    "LINK": "chainlink",
    "BUSD": "binance-usd",
    "TUSD": "true-usd",
    "XMR": "monero",
    "OKB": "okb",
    "ATOM": "cosmos",
    "ETC": "ethereum-classic",
    "HBAR": "hedera-hashgraph",
    "ICP": "internet-computer",
    "FIL": "filecoin",
    "LDO": "lido-dao",
    "QNT": "quant-network",
    "MNT": "mantle",
    "CRO": "crypto-com-chain",
    "APT": "aptos",
    "ARB": "arbitrum",
    "VET": "vechain",
    "NEAR": "near",
    "OP": "optimism",
    "MKR": "maker",
    "RETH": "rocket-pool-eth",
    "GRT": "the-graph",
    "KAS": "kaspa",
    "AAVE": "aave",
    "XDC": "xdce-crowd-sale",
    "FRAX": "frax",
    "WBT": "whitebit",
    "ALGO": "algorand",
    "USDD": "usdd",
    "EGLD": "elrond-erd-2",
    "SNX": "havven",
    "SAND": "the-sandbox",
    "IMX": "immutable-x",
    "STX": "blockstack",
    "XTZ": "tezos",
    "EOS": "eos",
    "AXS": "axie-infinity",
    "INJ": "injective-protocol",
    "THETA": "theta-token",
    "FLEX": "flex-coin",
    "BSV": "bitcoin-cash-sv",
    "BGB": "bitget-token",
    "APE": "apecoin",
    "FTM": "fantom",
    "MANA": "decentraland",
    "XRD": "radix",
    "RUNE": "thorchain",
    "GT": "gatechain-token",
    "RNDR": "render-token",
    "GALA": "gala",
    "NEO": "neo",
    "USDP": "paxos-standard",
    "KAVA": "kava",
    "RPL": "rocket-pool",
    "FLOW": "flow",
    "PEPE": "pepe",
    "XEC": "ecash",
    "CETH": "compound-ether",
    "KCS": "kucoin-shares",
    "PAXG": "pax-gold",
    "XAUT": "tether-gold",
    "RLB": "rollbit-coin",
    "CHZ": "chiliz",
    "KLAY": "klay-token",
    "FXS": "frax-share",
    "CRV": "curve-dao-token",
    "FRXETH": "frax-ether",
    "MIOTA": "iota",
    "BTT": "bittorrent",
    "CSPR": "casper-network",
    "TKX": "tokenize-xchange",
    "LUNC": "terra-luna",
    "SUI": "sui",
    "MINA": "mina-protocol",
    "HT": "huobi-token",
    "TWT": "trust-wallet-token",
    "GUSD": "gemini-dollar",
    "GMX": "gmx",
    "NEXO": "nexo",
    "DYDX": "dydx",
    "NXM": "nxm",
    "CUSDC": "compound-usd-coin",
    "NFT": "apenft",
    "DASH": "dash",
    "WOO": "woo-network",
    "FLR": "flare-networks",
    "AKT": "akash-network",
    "SFRXETH": "staked-frax-ether",
    "AR": "arweave",
    "CAKE": "pancakeswap-token",
    "COMP": "compound-governance-token",
    "LUSD": "liquity-usd",
    "ZIL": "zilliqa",
    "ASTR": "astar",
    "BONE": "bone-shibaswap",
    "SEI": "sei-network",
    "MX": "mx-token",
    "CFX": "conflux-token",
    "OSMO": "osmosis",
    "HNT": "helium",
    "GNO": "gnosis",
    "BAT": "basic-attention-token",
    "FDUSD": "first-digital-usd",
    "1INCH": "1inch",
    "ILV": "illuvium",
    "OKT": "oec-token",
    "XCH": "chia",
    "ENJ": "enjincoin",
    "BTG": "bitcoin-gold",
    "QTUM": "qtum",
    "HBTC": "huobi-btc",
    "CVX": "convex-finance",
    "LRC": "loopring",
    "XEM": "nem",
    "ELG": "escoin-token",
    "MASK": "mask-network",
    "EURT": "tether-eurt",
    "AGIX": "singularitynet",
    "OX": "open-exchange-token",
    "CELO": "celo",
    "FET": "fetch-ai",
    "TFUEL": "theta-fuel",
    "ENS": "ethereum-name-service",
    "OMI": "ecomi",
    "ROSE": "oasis-network",
    "ZEC": "zcash",
    "DCR": "decred",
    "ANKR": "ankr",
    "BDX": "beldex",
    "AZERO": "aleph-zero",
    "CDAI": "cdai",
    "HOT": "holotoken",
    "BLUR": "blur",
    "CUSDT": "compound-usdt",
    "OHM": "olympus",
    "RVN": "ravencoin",
    "FLOKI": "floki",
    "YFI": "yearn-finance",
    "EUSD": "eusd-27a558b0-8b5b-4225-a614-63539da936f4",
    "WLD": "worldcoin-wld",
    "JST": "just",
    "GMT": "stepn",
    "KSM": "kusama",
    "WEMIX": "wemix-token",
    "GFARM2": "gains-farm",
    "BITCOIN": "harrypotterobamasonic10in",
    "SFP": "safepal",
    "LPT": "livepeer",
    "GLM": "golem",
    "RBN": "ribbon-finance",
    "AUDIO": "audius",
    "DFI": "defichain",
    "ANT": "aragon",
    "BABYDOGE": "baby-doge-coin",
    "BTSE": "btse-token",
    "ICX": "icon",
    "FNSA": "link",
    "JASMY": "jasmycoin",
    "ALUSD": "alchemix-usd",
    "TOMI": "tominet",
    "MC": "merit-circle",
    "LUNA": "terra-luna-2",
    "BAL": "balancer",
    "SXP": "swipe",
    "TOMO": "tomochain",
    "WAVES": "waves",
    "ETHW": "ethereum-pow-iou",
    "DAO": "dao-maker",
    "SC": "siacoin",
    "ONT": "ontology",
    "UNIBOT": "unibot",
    "GLMR": "moonbeam",
    "RON": "ronin",
    "MSOL": "msol",
    "WAXP": "wax",
    "SETH2": "seth2",
    "IOTX": "iotex",
    "BAND": "band-protocol",
    "MAGIC": "magic",
    "BICO": "biconomy",
    "IOST": "iostoken",
    "EURS": "stasis-eurs",
    "AXL": "axelar",
    "OCEAN": "ocean-protocol",
    "CHSB": "swissborg",
    "USTC": "terrausd",
    "ELF": "aelf",
    "TRIBE": "tribe-2",
    "KRD": "krypton-dao",
    "ONE": "harmony",
    "BTC.B": "bitcoin-avalanche-bridged-btc-b",
    "WBETH": "wrapped-beacon-eth",
    "BORA": "bora",
    "GNS": "gains-network",
    "AMP": "amp-token",
    "KUB": "bitkub-coin",
    "CORE": "coredaoorg",
    "EWT": "energy-web-token",
    "DGB": "digibyte",
    "GLR": "canvas-n-glr",
    "SUSHI": "sushi",
    "STG": "stargate-finance",
    "KDA": "kadena",
    "POLY": "polymath",
    "HIVE": "hive",
    "SSV": "ssv-network",
    "LSK": "lisk",
    "UMA": "uma",
    "SKL": "skale",
    "FLUX": "zelcash",
    "NU": "nucypher",
    "LYXE": "lukso-token",
    "ZEN": "zencash",
    "DAG": "constellation-labs",
    "KNC": "kyber-network-crystal",
    "MURA": "murasaki",
    "CET": "coinex-token",
    "CDT": "blox",
    "DEL": "decimal",
    "EVER": "everscale",
    "STSOL": "lido-staked-sol",
    "RSR": "reserve-rights-token",
    "PLA": "playdapp",
    "DESO": "deso",
    "SNT": "status",
    "POLYX": "polymesh",
    "HXRO": "hxro"
}

export default cryptocurrency;