import { EtherWallet, ExternalAccount, VerifiedBytesLike } from './etherWallet';
import { Provider } from "../utils/provider";
import { ethers } from 'ethers';
export declare class VerifiedWallet extends EtherWallet {
    constructor(privateKey: VerifiedBytesLike | ExternalAccount, provider?: Provider);
    /**
     *  Static method to generate mnemonic.
     */
    static generateMnemonic(): string;
    /**
     *  Static methods to create a new Wallet instance.
     */
    static createWallet(): VerifiedWallet;
    /**
     *  Static methods to create a new Wallet instance from mnemonics.
     */
    static importWallet(mnemonic: string, path?: string): VerifiedWallet;
    setProvider(provider: Provider): VerifiedWallet;
    /**
     * The Metamask plugin also allows signing transactions to
     * send ether and pay to change state within the blockchain.
     * For this, we need the account signer...
     * @param window.ethereum object
     * @returns signer object
     */
    static web3Provider(object: any): Promise<Error | ethers.providers.JsonRpcSigner>;
}
