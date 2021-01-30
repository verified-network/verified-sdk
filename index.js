// (c) Kallol Borah, 2021
// Exports verified sdk functions in nodejs module

const {ethers} = require ("ethers");

require('./wallet/register');
require('./wallet/account');
require('./wallet/transfer');

const provider = new ethers.providers.JsonRpcProvider();
let privateKey = '0x448f79a6a79c6e978fc895783d84e9297845c29eb4cc4e916749de63f567de13';
const wallet = new ethers.Wallet(privateKey, provider);;
//var wallet = ethers.Wallet.createRandom();

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