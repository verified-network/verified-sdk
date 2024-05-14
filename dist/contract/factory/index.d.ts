import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
export default class Factory extends VerifiedContract {
    contractAddress: string;
    constructor(signer: VerifiedWallet, contractNetworkAddress: string);
    /**
     * Get number of tokens [callable by client]
     * @param
     * @returns returns number of tokens
     */
    getTokenCount(): any;
    getOracles(): any;
    /**
    * Get address of token by index [callable by client].
    * @param (uint256 n)
    * @returns boolean
    */
    getToken(_n: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    /**
    * Get name and type of token by its address callable by client
    * @param (address _viaAddress)
    * @returns boolean
    * returns name and type of token by its address passed as parameter.
    */
    getNameAndType(_viaAddress: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    notifyTokenCreated(callback: any): object;
    getTokenByNameType(tokenName: string, tokenType: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    getIssuer(tokenName: string, tokenType: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    getAddressAndType(tokenName: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    setViaOracleUrl(_url: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    setFiatPayoutUrl(_url: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    getViaOracleUrl(options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    getFiatPayoutUrl(options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    setCryptoDataURL(_url: string, _fromCurrency: string, _toCurrency: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    setOracles(_oracles: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    supportTokens(_currency: string, _address: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    setBondTerm(bondToken: string, term: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    getBondTerm(bondToken: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
}
