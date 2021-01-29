// (c) Kallol Borah, 2021
// Exports verified sdk functions in nodejs module

const {ethers} = require ("ethers");

require('./wallet/register');
require('./wallet/account');
require('./wallet/transfer');

const wallet = ethers.Wallet.createRandom();

// create wallet
exports.registerAccount = () => {
    account = ethers.Wallet.createRandom();
    return account;
}

// create wallet from stored mnemomic
exports.retrieveAccount = (seed) => {
    account = ethers.Wallet.createWallet(seed);
    return account;
}

exports.wallet = wallet;