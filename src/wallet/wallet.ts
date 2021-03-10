"use strict"

import { EtherWallet, ExternalAccount, VerifiedBytesLike } from './etherWallet';
import { Provider } from "../utils/provider";

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

}