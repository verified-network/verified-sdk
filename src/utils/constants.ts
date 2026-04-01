//Todo: add more network paymaster details for gasless
export const PaymasterConstants: any = {
  MEE_API_KEY: "mee_G5SSkmZYg9kiGksxJwFT9x", //Non sponsored key from dashboard
  MEE_API_KEY_STAGING: "mee_3Zmc7H6Pbd5wUfUGu27aGzdf", //Biconomy sponsorship enabled staging api key???
  MEE_URL_STAGING: "https://staging-network.biconomy.io/v1",
  TEST_CHAINS: [11155111, 84532, 421614],
  HOSTED_SPONSOR_URL: "https://gateway.verified.network/api/sponsor",
  ADMIN_WALLET_ADDRESS: "0x5DBDA7BE05F68131e260f5A2bC573b24692a5B34", //current admin???
  COMPENSATION_AMOUNT: "0.02", //2 Cents
  //ethereum sepolia
  11155111: {
    RPC_URL: "https://eth-sepolia.public.blastapi.io",
  },
  //polgon  mainnet
  137: {
    RPC_URL: "https://polygon-rpc.com",
  },
  //base sepolia
  84532: {
    RPC_URL: "https://sepolia.base.org",
  },
  //ethereum mainnet
  1: {
    RPC_URL: "https://eth-mainnet.public.blastapi.io",
  },
  //base mainnet
  8453: {
    RPC_URL: "https://base-mainnet.public.blastapi.io",
  },
  //gnosis
  100: {
    RPC_URL: "https://rpc.gnosischain.com",
  },
};
