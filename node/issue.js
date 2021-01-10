// (c) Kallol Borah, 2021
// Handles request to issue Via cash tokens on successful fiat payments

const {ethers} = require ("ethers");
const provider = new ethers.providers.InfuraProvider();
const signer = provider.getSigner();

const cashAbi = artifacts.require('Cash');
const ViaUSDAddress = process.env.VIA_USD_ADDRESS;
const ViaEURAddress = process.env.VIA_EUR_ADDRESS;
const ViaINRAddress = process.env.VIA_INR_ADDRESS;
const ViaUSD = new ethers.Contract(ViaUSDAddress, cashAbi, signer);
const ViaEUR = new ethers.Contract(ViaEURAddress, cashAbi, signer);
const ViaINR = new ethers.Contract(ViaINRAddress, cashAbi, signer);

// request issue of Via cash tokens
function requestIssue(amount, buyer, currency){
    tokens = $("#amount").val();
    payer = $("#buyer").val();
    currencyName = $("#currency").value();

    if(currencyName='USD')
        //todo : fix payIn() function params which need to pass tokens in uint256 and payer+treasury address 
        ViaUSD.payIn(
            ethers.utils.formatUnits(tokens),
            ethers.utils.computeAddress(payer),
            ethers.utils.formatBytes32String(currencyName),
            process.env.VERIFIED_TREASURY_ADDRESS);

    if(currencyName='EUR')
        ViaEUR.payIn(
            ethers.utils.formatUnits(tokens),
            ethers.utils.computeAddress(payer),
            ethers.utils.formatBytes32String(currencyName),
            process.env.VERIFIED_TREASURY_ADDRESS);

    if(currencyName='INR')
        ViaINR.payIn(
            ethers.utils.formatUnits(tokens),
            ethers.utils.computeAddress(payer),
            ethers.utils.formatBytes32String(currencyName),
            process.env.VERIFIED_TREASURY_ADDRESS);

}




