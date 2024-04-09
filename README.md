# The Verified SDK
The Verified SDK provides access to the issuing, trading and servicing of tokenized securities on the Verified Network.

# installing using npm
```npm install @verified-network/verified-sdk```

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
const defaultProvider = 3 // where number 3 is chain id for ropsten, any other chain id of default provider network can be used
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
const network = 3 // where number 3 is chain id for ropsten, any other chain id can be used
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

Now you can call a function in clientContract like:
```clientContract.setAccess("true")``` // to set the access to True/False.

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
```options?: { gasPrice: number, gasLimit: number }```
You can configure the gasPrice and gasLimit using this parameter as the last parameter to the contractCall function.
Example: ```this.callContract(FUNCTIONS.GETORDERS, originator, options)```
Where, options = {gasPrice: XXX, gasLimit: YYY}

# This is how you can integrate with any Dapp.
1. Install and Import the SDK
2. Create a wallet instance and fund it
3. Create instances of the Contract that you want to interact with using the above wallet and call their functions.

# Verified Sdk also provides ERC 4337-compliant solution and enable account abstraction using Biconomy Smart Accounts that works with any Paymaster and Bundler service.
Above statement means that Verified Sdk follows ERC 4337 standard and implement pseudo-transaction object(userOperation) to enable transaction sponsorship allowing smart contract creators to sponsor some set of transactions on smart contract for users when certain functions are called.

With this unique feature of Verified Sdk creators can pay gas fee for users/entity interaction with smart contract in ERC 20 token or Native tokens(Eth e.t.c) and also enable users/entity interacting with the contract to pay for gas fee using ERC 20 tokens. 

# How Verified Sdk Gasless transactions work
For every transactions/interactions with verified smart contracts, various checks are made to determine if the transaction will be gasless(will be sponsored) or not. For gasless transactions, contract creators have pre deposited certain amount of native tokens(Eth, Matic e.t.c) or ERC 20 tokens(USDC, VUSDC e.t.c) on Biconomy paymaster dashboard to cover gas fees for set of functions on smart contract. 

# Verified Sdk checks for every transaction:
# Check 1: is Biconomy Paymaster supported for the network/chain the contract is on?
   If yes:
   # Check 2: is the smart contract called part of smart contracts that supports gasless or Erc 20 gas payments?
   If yes:
   # Check 3: is the function called parts of functions selected to support gasless or ERC 20 payments?
   If yes: 
   # Check 4: what type of paymaster was set? Gasless or ERC 20
   If gasless:
   # Check 5: is the deposited gas enough to pay for transaction?
   if yes: Transaction is sposored(user does not pay for gas fee)
   If ERC 20:
   User pay for transaction using ERC 20 tokens
# If no: User will pay for transaction using native tokens(Eth, Matic e.t.c) 
