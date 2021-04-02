// @ts-nocheck
"use strict"

import { EtherWallet, ExternalAccount, VerifiedBytesLike } from './etherWallet';
import { Provider } from "../utils/provider";
import { ethers } from 'ethers';

export class VerifiedWallet extends EtherWallet {

    constructor(privateKey: VerifiedBytesLike | ExternalAccount, provider?: Provider) {
        super(privateKey, provider);
    }

    /**
     *  Static methods to create a new Wallet instance.
     */
    static createWallet(): VerifiedWallet {
        const newWallet = EtherWallet.createRandom();
        return new VerifiedWallet(this.parseMnemonics(newWallet.mnemonic.phrase, newWallet.mnemonic.path));
    }

    /**
     *  Static methods to create a new Wallet instance from mnemonics.
     */
    static importWallet(mnemonic: string, path?: string): VerifiedWallet {
        const newWallet = EtherWallet.fromMnemonic(mnemonic, path);
        return new VerifiedWallet(this.parseMnemonics(newWallet.mnemonic.phrase, newWallet.mnemonic.path));
    }

    setProvider(provider: Provider) {
        return new VerifiedWallet(this.privateKey, provider);
    }
    /**
     * The Metamask plugin also allows signing transactions to
     * send ether and pay to change state within the blockchain.
     * For this, we need the account signer...
     * @param window.ethereum object 
     * @returns signer object
     */
    static async web3Provider(object: any) {
        if(!object.window.ethereum.isMetaMask) return new Error('Invalid object')
        await window.ethereum.enable()
        const provider = new ethers.providers.Web3Provider(object)
        const signer = provider.getSigner()
        return signer
    }
}