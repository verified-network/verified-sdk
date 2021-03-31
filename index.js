// (c) Kallol Borah, 2020
// Exports verified sdk functions in nodejs module

const {ethers} = require ("ethers");

//const provider = new ethers.providers.JsonRpcProvider(); // for ganache
//let privateKey = '0xd68cd2a1c9342b34d6add51b5f1d9dd1e887646c4788b4083788fb4f022d6373'; //from ganache private key[0] which is manager's
const provider = new ethers.providers.getDefaultProvider('rinkeby');
let privateKey = '0x0930dbcc40495b0e713f23234cde5610e166b0f86c2adc829cfebeefbf357405'; // for client wallet on test net
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