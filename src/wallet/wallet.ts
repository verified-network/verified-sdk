import { ethers } from 'ethers';
let abi = [
    "function setManager(address value, address value)",
    "function getManager(address value)",
    "function setStatus(address value, bool value)",
    "function getStatus(address value)",
    "function setFile(address value, bytes32 value)",
    "function getFile(address value)",
    "function setFATCA(address value, bytes32 value)",
    "function getFATCA(address value)",
    "function setCRS(address value, bytes32 value)",
    "function getCRS(address value)",
    "function setPhotoID(address value, bytes32 value)",
    "function getPhotoID(address value)",
    "function setVideoID(address value, bytes32 value)",
    "function getVideoID(address value)",
    "function setAddress(address value, bytes32 value)",
    "function getAddress(address value)",
    "function setCustody(address value, address value)",
    "function getCustody(address value)",
    "function setAccess(bool value)",
    "function getAccess(address value)"
];

function createWallet(): any {
    let _privateKey: any;
    let _publicKey: any;
    let _address: any;
    let _mnemonic: any;

    let wallet = ethers.Wallet.createRandom();
    _privateKey = wallet.privateKey;
    _address = wallet.address;
    _publicKey = wallet.publicKey;
    _mnemonic = wallet.mnemonic;


    return {
        // Getter Methods
        // getAddress() {
        //     return this._address;
        // },
        _address,
        // _privateKey,
        getPrivateKey() {
            return this._privateKey;
        },
        getPublicKey() {
            return this._publicKey;
        }, getMnemonic() {
            return this._mnemonic;
        },
    };

}

function recoverWallet(mnemonic?: string): any {
    if (mnemonic !== undefined) {
        return ethers.Wallet.fromMnemonic(mnemonic);
    } else {
        return new Error('mnemonic undefined');
    }
}

// async function viewBalance() {
//     let wallet ;
//     let providerId = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
//     let userPrivateKey = '0xb70de08af6b76fe30293b484b9769945ef75a00c3e8d9e0425430858c994d1e6';
//     let userAddress = '0xD7cc3eb0D7560B028eA923CD48fA10FcdFd8567E'

//     let providerObj = ethers.getDefaultProvider();
//     if (provider !== undefined && privateKey !== undefined ) {
//         wallet = new ethers.Wallet(privateKey,provider )     
//     }else if(){

//     }else if(privateKey !== undefined){
//         wallet = new ethers.Wallet(privateKey,providerObj)
//     }else{
//         return new Error("private Key is Missing")
//     }
//     let balance = await wallet?.getBalance();
//     return balance
// }


export { createWallet, recoverWallet }









