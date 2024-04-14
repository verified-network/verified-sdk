# The Verified SDK

The Verified SDK provides access to the issuing, trading and servicing of tokenized securities on the Verified Network.

# installing using npm

`npm install @verified-network/verified-sdk`

# creating new wallet

```
const {VerifiedWallet} = require('@verified-network/verified-sdk');
let mnemonics = await VerifiedWallet.generateMnemonics()
let wallet = await VerifiedWallet.importWallet(menmonics)
```

# setProvider

Provider can be set for wallet using 2 options:

# using default providers

Default providers are available for networks like: mainnet/homestead, ropsten, sepolia e.t.c and are mainly used for development(it is also robust enough for use in production)

```
const {Provider} = require('@verified-network/verified-sdk');
const defaultProvider = 'ropsten' // or any other default provider network of your choice.
Network/chain id(number) can be used in place of network name, for example:
const defaultProvider = 3 // where number 3 is chain id for ropsten, any other chain id of default provider network can be used.
let walletWithProvider = wallet.setProvider(
    Provider.defaultProvider(defaultProvider)
)
```

# using custom providers

Verified Sdk supports Infura and Alchemy to provide custom providers for any network.

```
const {Provider} = require('@verified-network/verified-sdk');
const network = 'ropsten' // or any other network of your choice.
Network/chain id(number) can be used in place of network name, for example:
const network = 3 // where number 3 is chain id for ropsten, any other chain id can be used.
//For infura; to get api key and enable networks checout: https://www.infura.io/
const INFURA_API_KEY = 'your infura api key'
let walletWithProvider = wallet.setProvider(
    Provider.infuraProvider(network, INFURA_API_KEY)
)
//For Alchemy;  to get api key and enable networks checout: https://www.alchemy.com/
const ALCHEMY_KEY = 'your alchemy api key'
let walletWithProvider = wallet.setProvider(
    Provider.alchemyProvider(network, ALCHEMY_KEY)
)
```

# interacting with Smart contracts

```
cosnt {Client} = require('@verified-network/verified-sdk');
let clientContract = new Client(walletWithProvider);
```

This will create an instance of Client contract and you can access all the functions within the clientContract using this object.

Now you can call a function in clientContract like:
`clientContract.setAccess("true")` // to set the access to True/False.

Some contracts requires additional parameters to create their instances, for example:

```
cosnt {SecurityContract, PrimaryIssueManager} = require('@verified-network/verified-sdk');
// securityContract
const securityContractAddress = 'security address for any verified security'
let securityContract = new SecurityContract(walletWithProvider, securityContractAddress);

//primaryIssueManager
const primaryIssueManagerAddress = 'primary issue manager address'
const primaryIssueManagerplatform = 'primary issue manager platform' //e.g 'balancer'
let primaryIssueManagerContract = new PrimaryIssueManager(walletWithProvider, primaryIssueManagerAddress, primaryIssueManagerplatform);
```

Similarly you can create different Contracts instances available:

```
Client,
BondContract,
CashContract,
TokenContract,
FactoryContract,
RatesContract,
SecurityContract,
SecuritiesFactory,
PoolContract,
PrimaryIssueManager,
SecondaryIssueManager,
MarginIssueManager,
CustodyContract,
LiquidityContract,
DistributionContract
```

# VerifiedContract

src/contract/index.ts is the base class for all Contracts created.
It has the logic to validate the Input, Sanitise the Input and Output, call the contract functions etc.
All the contracts trigger smart contract calls and go through the callContract function.

Optionally, all the contractCalls take in an additional parameter:
`options?: { gasPrice: number, gasLimit: number }`
You can configure the gasPrice and gasLimit using this parameter as the last parameter to the contractCall function.
Example: `this.callContract(FUNCTIONS.GETORDERS, originator, options)`
Where, options = {gasPrice: XXX, gasLimit: YYY}

# This is how you can integrate with any Dapp.

1. Install and Import the SDK
2. Create a wallet instance and fund it
3. Create instances of the Contract that you want to interact with using the above wallet and call their functions.

# Common Error(s) with Verified Sdk integration with Dapp
Due to webpack version > 5 that no longer includes NodeJS polyfills by default, it is causing issues for developers that use React(create-react-app), React-native, Vite with webpack version > 5 to build applications with web3.js, ethers.js, alchemy libraries e.t.c. Many of this libraries and dependencies are used by Verified Sdk.

There are various ways to solve this error, from updating webpack config to babel config e.t.c. and can be overwhelming for developers. Verified Network Team recommend ed using best solutions that are easy to use and beginner friendly.

# How to resolve React error(s) with Verified Sdk integration
Step 1: Install react-app-rewired
    with npm:  ```npm install --save-dev react-app-rewired```
    with yarn:  ```yarn add --dev react-app-rewired```
    
Step 2: Install needed dependencies
    // with npm:  
```npm install --save-dev crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url buffer process```
    // with yarn: 
```yarn add crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url buffer process```

note: the above dependencies are needed dependencies to make verified sdk works, more dependencies can be added to handle any other nodeJs polyfills error.

Step 3: Override create-react-app webpack config file
In the root folder of your project, create a new file called 'config-overrides.js', and add the following code to it:
```
const webpack = require("webpack");
module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    url: require.resolve("url"),
    path: require.resolve("path-browserify"),
    fs: false, //assumed fs module will not be used(to use fs module download dependency to handle it)
  });
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);
  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.m?js/,
      resolve: {
        fullySpecified: false,
      },
    },
  ]; // rules are optional can be customised to fit your usecase
  config.resolve.fallback = fallback; 
  config.ignoreWarnings = [/Failed to parse source map/]; // optional can be customised to fit your usecase
  return config;
};
```
This 'config-overrides.js' code snippet is telling webpack how to resolve the missing dependencies that are needed to support web3, ethers libraries and wallet providers in the browser/server side.

Step 4: Override package.json to use react-app-rewired
Within the package.json file, replace react-scripts with react-app-rewired scripts for 'start', 'build', 'test'
```
"scripts": { 
  "start": "react-app-rewired start", 
  "build": "react-app-rewired build", 
  "test": "react-app-rewired test", 
  "eject": "react-scripts eject" 
 },
```
note: start changed from "react-scripts start" to "react-app-rewired start", build from "react-scripts build" to "react-app-rewired build" and test from "react-scripts test" to "react-app-rewired test" while eject remains the same.

The polyfill node core module error should be fixed any missing NodeJS polyfills should be included in your app, and your app should work well with Verified Sdk

# How to resolve Vite error(s) with Verified Sdk integration
Step 1: install @esbuild-plugins/node-modules-polyfill and rollup-plugin-polyfill-node
    with npm: ```npm i @esbuild-plugins/node-modules-polyfill rollup-plugin-polyfill-node```
    with yarn: ```yarn add @esbuild-plugins/node-modules-polyfill rollup-plugin-polyfill-node```

Step 2: Install needed dependencies
    with npm:  
```npm install --save-dev crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url buffer process```
    with yarn: 
```yarn add crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url buffer process```

Step 3: update vite.config.js file
From the root folder of your project update 'vite.config.js' to resolve missing dependencies
```
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import nodePolyfills from "rollup-plugin-polyfill-node";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: ["es2020"], //optional can be customised
    rollupOptions: {
      plugins: [nodePolyfills()],
    },
  },
  resolve: {
    alias: {
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      util: "util/",
      path: "path-browserify",
      "@": resolve(__dirname, "./src"), //optional
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      supported: {
        bigint: true, //optional
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          protocolImports: true,
        }),
      ],
    },
  }
});

```
This 'vite.config.js' code snippet is telling webpack how to resolve the missing dependencies that are needed to support web3, ethers libraries and wallet providers in the browser/server side.

The polyfill node core module error should be fixed any missing NodeJS polyfills should be included in your app, and your app should work well with Verified Sdk.

# Verified Sdk also provides ERC 4337-compliant solution and enable account abstraction using Biconomy Smart Accounts.

Verified Sdk follows ERC 4337 standard and implement pseudo-transaction object(userOperation) to enable transaction sponsorship allowing smart contract creators to sponsor some set of transactions on smart contract for users when certain functions are called and allow multiple transaction to be called in batch

With this unique feature of Verified Sdk creators can pay gas fee for users/entity interaction with smart contract in ERC 20 token or Native tokens(Eth, Matic e.t.c) and also enable users/entity interacting with the contract to pay for gas fee using ERC 20 tokens.

# How Verified Sdk Gasless transactions work

For every transactions/interactions with verified smart contracts, various checks are made to determine if the transaction will be gasless(will be sponsored) or not. For gasless transactions, contract creators have pre deposited certain amount of native tokens(Eth, Matic e.t.c) or ERC 20 tokens(USDC, VUSDC e.t.c) on Biconomy paymaster dashboard to cover gas fees for set of functions on smart contract.

# Verified Sdk checks for every transaction:

    # Check 1: is Biconomy Paymaster supported for the network/chain the contract is on?
    If yes:
    # Check 2: is the smart contract called part of smart contracts that support gasless or Erc 20 gas payments?
    If yes:
    # Check 3: is the function called parts of functions selected to support gasless or ERC 20 payments?
    If yes:
    # Check 4: what type of paymaster was set? Gasless or ERC 20
        If gasless:
        # Check 5: is the deposited gas enough to pay for transaction?
        if yes: Transaction is sposored(user does not pay for gas fee)
        if ERC 20:
        # User pay for transaction using ERC 20 tokens
    # If no: User will pay for transaction using native tokens(Eth, Matic e.t.c)
