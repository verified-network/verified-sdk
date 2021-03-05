# The Verified SDK
The Verified SDK provides access to the payments, issuing and trading of tokenized securities on the Verified Network.

# installing using npm
npm install verified_sdk --save

# creating new wallet
const {createWallet} = require('verified_sdk');
let wallet = await new createWallet(private_key, provider_key)

# random wallet 
let wallet = await new createWallet();




