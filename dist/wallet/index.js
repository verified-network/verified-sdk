// @ts-nocheck
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifiedWallet = void 0;
const etherWallet_1 = require("./etherWallet");
const ethers_1 = require("ethers");
class VerifiedWallet extends etherWallet_1.EtherWallet {
    constructor(privateKey, provider) {
        super(privateKey, provider);
    }
    /**
     *  Static method to generate mnemonic.
     */
    static generateMnemonic() {
        return etherWallet_1.EtherWallet.createRandom()._mnemonic().phrase;
        // return newWallet.mnemonic.phrase;
    }
    /**
     *  Static methods to create a new Wallet instance.
     */
    static createWallet() {
        const newWallet = etherWallet_1.EtherWallet.createRandom();
        return new VerifiedWallet(VerifiedWallet.parseMnemonics(newWallet.mnemonic.phrase, newWallet.mnemonic.path));
    }
    /**
     *  Static methods to create a new Wallet instance from mnemonics.
     */
    static importWallet(mnemonic, path) {
        const newWallet = etherWallet_1.EtherWallet.fromMnemonic(mnemonic, path);
        return new VerifiedWallet(VerifiedWallet.parseMnemonics(newWallet.mnemonic.phrase, newWallet.mnemonic.path));
    }
    setProvider(provider) {
        return new VerifiedWallet(this.privateKey, provider);
    }
    /**
     * The Metamask plugin also allows signing transactions to
     * send ether and pay to change state within the blockchain.
     * For this, we need the account signer...
     * @param window.ethereum object
     * @returns signer object
     */
    static async web3Provider(object) {
        if (!object.isMetaMask)
            return new Error('Invalid object');
        await window.ethereum.enable();
        const provider = new ethers_1.ethers.providers.Web3Provider(object);
        const signer = provider.getSigner();
        return signer;
    }
}
exports.VerifiedWallet = VerifiedWallet;
