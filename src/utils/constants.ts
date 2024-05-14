//Todo: add more network paymaster details for gasless
export const PaymasterConstants: any = {
BUNDLER_URL_FIRST_SECTION: "https://bundler.biconomy.io/api/v2",
GENERAL_PAYMASTER_URL: "https://paymaster.biconomy.io/api/v1",
BICONOMY_REVERT_TOPIC: "0x1c4fada7374c0a9ee8841fc38afe82932dc0f8e69012e927f061a8bae611a201",
//ethereum sepolia
// 11155111: {
//     PAYMASTER_API_KEY: "BuFP2-5w-.5b3daf3a-d044-4dda-819c-4c4d8431df88",
//     BUNDLER_API_KEY:  "nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44",
//     RPC_URL: "https://rpc.sepolia.org"

// },
//polgon  mainnet
137: {
    PAYMASTER_API_KEY: "lDHvYk50N.30a2522e-0a9d-444b-b949-19194c1f237a",
    BUNDLER_API_KEY:  "dewj2189.wh1289hU-7E49-45ic-af80-JkuxGCYRV",
    RPC_URL: "https://polygon-rpc.com"

},
//base sepolia
84532: {
    PAYMASTER_API_KEY: "jSBI-WRji.99a4dda1-1c20-42ea-9409-2724f9a0ca7e",
    BUNDLER_API_KEY:  "nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44",
    RPC_URL: "https://sepolia.base.org"

}
}