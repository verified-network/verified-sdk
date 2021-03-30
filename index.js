// (c) Kallol Borah, 2020
// Exports verified sdk functions in nodejs module

const {ethers} = require ("ethers");

require('./wallet/register');
require('./wallet/account');
require('./wallet/transfer');

const provider = new ethers.providers.JsonRpcProvider(); // for ganache
let privateKey = '0x65b14a98f31dfe46ef5ea1ddb3318922f370282b8b3bdad00ea0fcd8d2de0a94'; //from ganache
//const provider = new ethers.providers.getDefaultProvider('rinkeby');
//let privateKey = '0x0930dbcc40495b0e713f23234cde5610e166b0f86c2adc829cfebeefbf357405'; // for client wallet on test net
const wallet = new ethers.Wallet(privateKey, provider);;

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