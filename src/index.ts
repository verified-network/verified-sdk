import {ethers} from 'ethers';

function createWallet():any{
        let wallet = ethers.Wallet.createRandom();
        return {
            privateKey : wallet.privateKey,
            address : wallet.address,
            publicKey : wallet.publicKey,
            mnemonic : wallet.mnemonic
        }
    }

 function recoverWallet(mnemonic ? :string):any{
 if(mnemonic !== undefined){
     return ethers.Wallet.fromMnemonic(mnemonic);
 }else{
     return new Error('mnemonic undefined');
 }
}

export { createWallet, recoverWallet}









