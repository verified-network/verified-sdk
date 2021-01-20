// (c) Kallol Borah, 2021
// Issues, redeems, transfers Via bond tokens

const {ethers} = require ("ethers");
const provider = ethers.getDefaultProvider();
const signer = provider.getSigner();
const wallet = new ethers.Wallet(signer.address, provider);

const bondAbi = artifacts.require('Bond');