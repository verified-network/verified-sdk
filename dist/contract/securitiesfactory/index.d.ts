import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../../wallet";
export default class SecuritiesFactory extends VerifiedContract {
    contractAddress: string;
    constructor(signer: VerifiedWallet, contractNetworkAddress: string);
    /**
        Sets signer to verify bridge
        @param  _signer  address of signer that can only be set by owner of bridge
     */
    setSigner(_signer: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    /**
     * Get issued security token addresses
     * @param
     * @returns returns array of addresses
     */
    getIssues(): any;
    getHolder(_token: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    getSecurity(_token: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    issueSecurity(_security: string, _category: string, _company: string, _isin: string, _currency: string, _issuer: string, _intermediary: string, _restrictions: string, _country: string, _qualified: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    getSecurityToken(security: string, issuer: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    addBalance(_security: string, _transferor: string, _transferee: string, _amount: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    notifySecuritiesAdded(callback: any): object;
    setCustodian(_securityToken: string, _issuer: string, _custodian: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    getCustodian(_securityToken: string, _issuer: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    restrictCountry(_security: string, _countries: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    getRestrictedCountries(_security: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    getDP(_securityToken: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
}
