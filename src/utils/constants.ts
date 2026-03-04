//Todo: add more network paymaster details for gasless
export const PaymasterConstants: any = {
  MEE_API_KEY: "mee_XGE8XYuTujTdkB4sohJMHv",
  MEE_API_KEY_STAGING: "mee_3Zmc7H6Pbd5wUfUGu27aGzdf", //Biconomy sponsorship enabled staging api key???
  MEE_URL_STAGING: "https://staging-network.biconomy.io/v1",
  TEST_CHAINS: [11155111, 84532],
  SPONSORSHIP_GASTANK_TEST: {
    chainId: 11155111,
    token: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
    address: "0x8a2997ba9B9A51aF7C63914829450260B12B75e5",
  },
  HOSTED_SPONSOR_URL: "https://gateway.verified.network/api/sponsor", //TODO: update to hosted sponsor url
  ADMIN_WALLET_ADDRESS: "0x5DBDA7BE05F68131e260f5A2bC573b24692a5B34", //test admin
  COMPENSATION_AMOUNT: "0.02", //2 Cents
};
