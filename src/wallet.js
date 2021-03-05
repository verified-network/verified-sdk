const { ethers } = require("ethers");

function createWallet (key,provider){
    this.key = key ;
    this.provider = provider;
    return new Promise((resolve,reject)=>{
        if (this.key && this.provider) {
            // check for input type
            if (typeof this.key !== 'string') {
                reject(new Error(`Invalid private key type expected string got ${typeof this.key}`))
            } else if (typeof provider !== 'string') {
                reject(new Error(`Invalid provider type expected string got ${typeof this.provider}`));
            }
            // create wallet with private key and provider
            resolve(new ethers.Wallet(this.key, this.provider));

        } else {
            // create random wallet
            resolve(ethers.Wallet.createRandom());

        }
    })
}

module.exports={
    createWallet
}

