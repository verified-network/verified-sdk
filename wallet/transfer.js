// (c) Kallol Borah, 2021
// Issues, redeems, transfers Via tokens

const {ethers} = require ("ethers");
const provider = new ethers.providers.JsonRpcProvider();
const signer = provider.getSigner();

const cashAbi = artifacts.require('Cash');
const ViaUSDCashAddress = process.env.VIA_USD_CASH_ADDRESS;
const ViaEURCashAddress = process.env.VIA_EUR_CASH_ADDRESS;
const ViaINRCashAddress = process.env.VIA_INR_CASH_ADDRESS;
const ViaUSDCash = new ethers.Contract(ViaUSDCashAddress, cashAbi, signer);
const ViaEURCash = new ethers.Contract(ViaEURCashAddress, cashAbi, signer);
const ViaINRCash = new ethers.Contract(ViaINRCashAddress, cashAbi, signer);

const bondAbi = artifacts.require('Bond');
const ViaUSDBondAddress = process.env.VIA_USD_BOND_ADDRESS;
const ViaEURBondAddress = process.env.VIA_EUR_BOND_ADDRESS;
const ViaINRBondAddress = process.env.VIA_INR_BOND_ADDRESS;
const ViaUSDBond = new ethers.Contract(ViaUSDBondAddress, bondAbi, signer);
const ViaEURBond = new ethers.Contract(ViaEURBondAddress, bondAbi, signer);
const ViaINRBond = new ethers.Contract(ViaINRBondAddress, bondAbi, signer);


function requestIssue(amount, whatToIssue, issuer, debitFrom){

}

function requestCustody(startDate, tenure, amount, currency){

}

function requestRedemption(amount, whatToRedeem, issuer, redemptionCurrency){

}

function requestPayment(beneficiary, creditCurrency, amount, debitCurrency){

}

function requestWithdrawal(beneficiary, creditCurrency, amount, debitCurrency){

}