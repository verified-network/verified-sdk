// (c) Kallol Borah, 2021
// Issues, redeems, transfers Via tokens

const {ethers} = require ("ethers");
const provider = ethers.getDefaultProvider();
const signer = provider.getSigner();
const wallet = new ethers.Wallet(signer.address, provider);

const cashAbi = artifacts.require('Cash');
const bondAbi = artifacts.require('Bond');


async function requestViaForEther(_viaCashToIssue, _amount){
    const viaCashToIssue = $("#_viaCashToIssue").val(); 
    const viaCashEns = viaCashToIssue+'.via-cash.eth';
    if(provider.resolveName(viaCashEns)!=''){
        let tx = {
            to: viaCashEns,
            value: ethers.utils.parseEther(_amount)
        };
        wallet.sendTransaction(tx);
    }
}

// request issue of Via cash tokens
function requestIssue(_amount, _currencyToIssue, _currencyToDebit){
    tokens = $("#_amount").val();
    viaCashToIssue = $("#_currencyToIssue").value();
    viaCashToDebit = $("#_currencyToDebit").value();
    const viaCashEns = viaCashToDebit+'.via-cash.eth';

    if(provider.resolveName(viaCashEns)!=''){
        const ViaCash = new ethers.Contract(provider.resolveName(viaCashEns), cashAbi, signer);
        ViaCash.transferFrom(
            wallet.address,
            ethers.utils.getAddress(viaCashToIssue),
            ethers.utils.formatUnits(tokens));
    }
}

function requestCustody(startDate, tenure, amount, currency){

}

function requestRedemption(_amount, _currency){
    tokens = $("#_amount").val();
    viaCashToRedeem = $("#_currency").value();
    const viaCashEns = viaCashToRedeem+'.via-cash.eth';

    if(provider.resolveName(viaCashEns)!=''){
        const ViaCash = new ethers.Contract(provider.resolveName(viaCashEns), cashAbi, signer);
        ViaCash.transferFrom(
            wallet.address,
            ethers.utils.getAddress(viaCashToRedeem),
            ethers.utils.formatUnits(tokens));
    }
}

function requestPayment(_amount, _recipient, _currencyToDebit){
    tokens = $("#_amount").val();
    recipient = $("#_recipient").value();
    viaCashToDebit = $("#currencyToDebit").value();
    const viaCashEns = viaCashToDebit+'.via-cash.eth';

    if(provider.resolveName(viaCashEns)!=''){
        const ViaCash = new ethers.Contract(provider.resolveName(viaCashEns), cashAbi, signer);
        ViaCash.transferFrom(
            wallet.address,
            ethers.utils.getAddress(recipient),
            ethers.utils.formatUnits(tokens));
    }
}

function requestWithdrawal(beneficiary, creditCurrency, amount, debitCurrency){

}