// (c) Kallol Borah, 2021
// Issues, redeems, transfers Via cash tokens

const {ethers} = require ("ethers");
const provider = ethers.getDefaultProvider();
const signer = provider.getSigner();
const wallet = new ethers.Wallet(signer.address, provider);

const cashAbi = artifacts.require('Cash');

// request via in _viaCashToIssue currency for _amount 
export async function requestViaForEther(_viaCashToIssue, _amount){
    const viaCashToIssue = $("#_viaCashToIssue").val(); 
    const viaCashEns = viaCashToIssue+'.via-cash.eth';
    if(provider.resolveName(viaCashEns)!=''){
        let tx = {
            to: viaCashEns,
            value: ethers.utils.parseEther(_amount)
        };
        await wallet.sendTransaction(tx);
    }
}

// request issue of via in _currencyToIssue for _amount in _currencyToDebit
export async function requestIssue(_amount, _currencyToIssue, _currencyToDebit){
    tokens = $("#_amount").val();
    viaCashToIssue = $("#_currencyToIssue").value();
    viaCashToDebit = $("#_currencyToDebit").value();
    const viaCashEns = viaCashToDebit+'.via-cash.eth';

    if(provider.resolveName(viaCashEns)!=''){
        const ViaCash = new ethers.Contract(provider.resolveName(viaCashEns), cashAbi, signer);
        await ViaCash.transferFrom(
            wallet.address,
            ethers.utils.getAddress(viaCashToIssue),
            ethers.utils.formatUnits(tokens));
    }
}

// requests custody of via cash of _amount in _currencyToStore with _custodian
export async function requestCustody(_amount, _custodian, _currencyToStore){
    tokens = $("#_amount").val();
    custodian = $("#_custodian").value();
    viaCashToStore = $("#currencyToStore").value();
    const viaCashEns = viaCashToStore+'.via-cash.eth';

    if(provider.resolveName(viaCashEns)!=''){
        const ViaCash = new ethers.Contract(provider.resolveName(viaCashEns), cashAbi, signer);
        await ViaCash.transferFrom(
            wallet.address,
            ethers.utils.getAddress(custodian),
            ethers.utils.formatUnits(tokens));
    }
}

// request withdrawal of _amount in _currencyInStore from _custodian
export async function requestWithdrawal(_amount, _currencyInStore){

}

// request redemption of via cash of _currency and _amount
export async function requestRedemption(_amount, _currency){
    tokens = $("#_amount").val();
    viaCashToRedeem = $("#_currency").value();
    const viaCashEns = viaCashToRedeem+'.via-cash.eth';

    if(provider.resolveName(viaCashEns)!=''){
        const ViaCash = new ethers.Contract(provider.resolveName(viaCashEns), cashAbi, signer);
        await ViaCash.transferFrom(
            wallet.address,
            ethers.utils.getAddress(viaCashToRedeem),
            ethers.utils.formatUnits(tokens));
    }
}

// request payment of _amount in _currencyToDebit to _recipient
export async function requestPayment(_amount, _recipient, _currencyToDebit){
    tokens = $("#_amount").val();
    recipient = $("#_recipient").value();
    viaCashToDebit = $("#currencyToDebit").value();
    const viaCashEns = viaCashToDebit+'.via-cash.eth';

    if(provider.resolveName(viaCashEns)!=''){
        const ViaCash = new ethers.Contract(provider.resolveName(viaCashEns), cashAbi, signer);
        await ViaCash.transferFrom(
            wallet.address,
            ethers.utils.getAddress(recipient),
            ethers.utils.formatUnits(tokens));
    }
}

// request payout of data.amount in data.currency to data.account and confirms withdrawal to callback function
// this function is called when redemption event emitted by via cash is detected
export async function requestPayout(callback, data){
    return fetch("/create-payout", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body : data 
      })
    .then(function(response) {
        callback(response.json());
    });
}