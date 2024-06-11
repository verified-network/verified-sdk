import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
export default class Client extends VerifiedContract {
    contractAddress: string;
    constructor(signer: VerifiedWallet, contractNetworkAddress: string);
    setSigner(_address: string): any;
    /**
    * Get sub-managers for role [callable only by manager]
    * @params (address _submanager, bytes32 _country)
    * @returns {address[] memory}
    */
    getRole(_submanager: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    /**
   * Remove sub-manager from role [callable only by manager]
   * @params (address _submanager, bytes32 _country, bytes32 _role)
   * @returns
   */
    removeRole(_manager: string, _submanager: string, _country: string, _role: string, _hashedMessage: string, _v: string, _r: string, _s: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    /**
     * Create role for sub-manager [callable only by manager
     * @params (address _submanager, bytes32 _country, bytes32 _role)
     * @returns
     */
    addRole(_manager: string, _submanager: string, _country: string, _role: string, _id: string, _hashedMessage: string, _v: string, _r: string, _s: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    KycUpdate(client: string, name: string, surname: string, country: string, contact: string, status: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    fullKycUpdate(client: string, identity: string, videokyc: string, docs: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    getClientKYC(_client: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    getFullClientKYC(_client: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    setAmlScore(_client: string, _score: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    setCreditScore(_client: string, _score: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    setAmlPassScore(_score: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    getAMLStatus(_client: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    setCustodyAccount(_submanager: string, _currency: string, _accountId: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    getCustodyAccount(_submanager: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    getManagers(_country: string, _role: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    setCustody(_client: string, _account: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    getCustody(_client: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
}
