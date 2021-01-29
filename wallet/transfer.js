// (c) Kallol Borah, 2021
// Issues, redeems, transfers Via cash tokens

const wallet = require('../index');

const {ethers} = require ("ethers");
const provider = ethers.getDefaultProvider();

const cash = require('../abi/payments/Cash.json');

module.exports = {

    // request via in _viaCashToIssue currency for _amount 
    requestViaForEther : async function(_viaCashToIssue, _amount){
        const viaCashToIssue = $("#_viaCashToIssue").val(); 
        const viaCashEns = viaCashToIssue+'.via-cash.eth';
        if(provider.resolveName(viaCashEns)!=''){
            let tx = {
                to: viaCashEns,
                value: ethers.utils.parseEther(_amount)
            };
            await wallet.sendTransaction(tx);
        }
    },

    // request issue of via in _currencyToIssue for _amount in _currencyToDebit
    requestIssue : async function(_amount, _currencyToIssue, _currencyToDebit){
        tokens = $("#_amount").val();
        viaCashToIssue = $("#_currencyToIssue").value();
        viaCashToDebit = $("#_currencyToDebit").value();
        const viaCashEns = viaCashToDebit+'.via-cash.eth';

        if(provider.resolveName(viaCashEns)!=''){
            const ViaCash = new ethers.Contract(provider.resolveName(viaCashEns), cash, provider);
            await ViaCash.transferFrom(
                wallet.address,
                ethers.utils.getAddress(viaCashToIssue),
                ethers.utils.formatUnits(tokens));
        }
    },

    // requests custody of via cash of _amount in _currencyToStore with _custodian
    requestCustody : async function(_amount, _custodian, _currencyToStore){
        tokens = $("#_amount").val();
        custodian = $("#_custodian").value(); //todo : fetch custodian's address from server side given custodian's name
        viaCashToStore = $("#_currencyToStore").value();
        const viaCashEns = viaCashToStore+'.via-cash.eth';

        if(provider.resolveName(viaCashEns)!=''){
            const ViaCash = new ethers.Contract(provider.resolveName(viaCashEns), cash, provider);
            await ViaCash.transferFrom(
                wallet.address,
                ethers.utils.getAddress(custodian),
                ethers.utils.formatUnits(tokens));
        }
    },

    // request withdrawal of _amount in _currencyInStore from _custodian
    requestWithdrawal : async function(_amount, _custodian, _currencyInStore){
        tokens = $("#_amount").val();
        custodian = $("#_custodian").value(); //todo : fetch custodian's address from server side given custodian's name
        viaCashInStore = $("#_currencyInStore").value();
        const viaCashEns = viaCashToStore+'.via-cash.eth';

        if(provider.resolveName(viaCashEns)!=''){
            const ViaCash = new ethers.Contract(provider.resolveName(viaCashEns), cash, provider);
            await ViaCash.transferFrom(
                ethers.utils.getAddress(custodian),
                wallet.address,
                ethers.utils.formatUnits(tokens));
        }
    },

    // get balances of various assets in custody for the caller (user)
    getBalancesInCustody : async function(callback){
        //to do : use custodian API to get balances for wallet.address
    },

    // request redemption of via cash of _currency and _amount
    requestRedemption : async function(_amount, _currency){
        tokens = $("#_amount").val();
        viaCashToRedeem = $("#_currency").value();
        const viaCashEns = viaCashToRedeem+'.via-cash.eth';

        if(provider.resolveName(viaCashEns)!=''){
            const ViaCash = new ethers.Contract(provider.resolveName(viaCashEns), cash, provider);
            await ViaCash.transferFrom(
                wallet.address,
                ethers.utils.getAddress(viaCashToRedeem),
                ethers.utils.formatUnits(tokens));
        }
    },

    // request payment of _amount in _currencyToDebit to _recipient
    requestPayment : async function(_amount, _recipient, _currencyToDebit){
        tokens = $("#_amount").val();
        recipient = $("#_recipient").value();
        viaCashToDebit = $("#currencyToDebit").value();
        const viaCashEns = viaCashToDebit+'.via-cash.eth';

        if(provider.resolveName(viaCashEns)!=''){
            const ViaCash = new ethers.Contract(provider.resolveName(viaCashEns), cash, provider);
            await ViaCash.transferFrom(
                wallet.address,
                ethers.utils.getAddress(recipient),
                ethers.utils.formatUnits(tokens));
        }
    },

    // request payout of data.amount in data.currency to data.account and confirms withdrawal to callback function
    // this function is called when redemption event emitted by via cash is detected
    requestPayout : async function(callback, data){
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

}