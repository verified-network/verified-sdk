# The Verified SDK
The Verified SDK provides access to the payments, issuing and trading of tokenized securities on the Verified Network.

# installing using npm
```npm install @verified-network/verified-sdk```

# creating new wallet
```
const {VerifiedWallet} = require('@verified-network/verified-sdk');
let mnemonics = await VerifiedWallet.generateMnemonics()
let wallet = await VerifiedWallet.importWallet(menmonics)
```
# setProvider
```
const {Provider} = require('@verified-network/verified-sdk');
const defaultProvider = 'ropsten' // or any other network of your choice.
let walletWithProvider = wallet.setProvider(
    Provider.defaultProvider(defaultProvider)
)
```
# interacting with Smart contracts
```let clientContract = new ClientContract(wallet);```

This will create an instance of Client contract and you can access all the functions within the clientContract using this object.

Now you can call a function in clientContract like:
```clientContract.setAccess("true")``` // to set the access to True/False.

Similarly you can create different Contracts instances available:
```
ClientContract,
KYCContract,
SystemContract,
HolderContract,
LedgerContract,
AccountContract,
BondContract,
CashContract,
contractAddress,
FactoryContract,
OrderPoolContract,
PoolFactoryContract,
PostTradeContract,
PreTradeContract,
SecuritiesRegistryContract,
TradeContract
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