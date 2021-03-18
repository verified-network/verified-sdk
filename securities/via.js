// (c) Kallol Borah, 2021
// Issues, redeems, transfers Via bond tokens

const {ethers} = require ("ethers");
const provider = ethers.getDefaultProvider();
const signer = provider.getSigner();
const wallet = new ethers.Wallet(signer.address, provider);

const bondAbi = artifacts.require('Bond');

// request via bond in _viaBondToIssue currency for _amount 
export async function requestIssueForEther(_viaBondToIssue, _amount){
    const viaBondToIssue = $("#_viaBondToIssue").val(); 
    const viaBondEns = viaBondToIssue+'.via-bond.eth';
    if(provider.resolveName(viaBondEns)!=''){
        let tx = {
            to: viaBondEns,
            value: ethers.utils.parseEther(_amount)
        };
        await wallet.sendTransaction(tx);
    }
}

// request issue of via bond in _viaBondToIssue for _amount in _currencyToDebit
export async function requestIssueForViaCash(_amount, _viaBondToIssue, _currencyToDebit){
    tokens = $("#_amount").val();
    viaBondToIssue = $("#_viaBondToIssue").value();
    viaCashToDebit = $("#_currencyToDebit").value();
    const viaCashEns = viaCashToDebit+'.via-cash.eth';

    if(provider.resolveName(viaCashEns)!=''){
        const ViaCash = new ethers.Contract(provider.resolveName(viaCashEns), cashAbi, signer);
        await ViaCash.transferFrom(
            wallet.address,
            ethers.utils.getAddress(viaBondToIssue),
            ethers.utils.formatUnits(tokens));
    }
}

// request transfer of via _bondToTransfer for _amount
export async function requestTransfer(_amount, _recipient, _bondToTransfer){
    tokens = $("#_amount").val();
    recipient = $("#_recipient").value();
    bondToTransfer = $("#_bondToTransfer").value();

    if(provider.resolveName(viaCashEns)!=''){
        const ViaBond = new ethers.Contract(bondToTransfer, cashAbi, signer);
        await ViaBond.transferFrom(
            wallet.address,
            ethers.utils.getAddress(recipient),
            ethers.utils.formatUnits(tokens));
    }
}

// request redemption of via _bondToRedeem for _amount
export async function redemptionByInvestor(_amount, _bondToRedeem){
    requestTransfer(_amount, _bondToRedeem, _bondToRedeem);
}

// request redemption of via _bondToRedeem for _amount of _currencyToRedeemBond
export async function redemptionByIssuer(_amount, _bondToRedeem, _currencyToRedeemBond){
    requestIssueForViaCash(_amount, _bondToRedeem, _currencyToRedeemBond);
}