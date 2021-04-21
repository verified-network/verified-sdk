// @ts-nocheck

import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/accounts/Client.json';
import { contractAddress } from '../../contractAddress/index';
import { DATATYPES } from "../index";
import { Initialize, SetCustody, GetCustody, SetAccess, GetAccess, SetManager, GetManager, IsRegistered, SetAMLStatus, GetAMLStatus, GetClients } from '../../models/client';

enum FUNCTIONS {
    INITIALIZE = 'initialize',
    SETCUSTODY = 'setCustody',
    GETCUSTODY = 'getCustody',
    SETACCESS = 'setAccess',
    GETACCESS = 'getAccess',
    SETMANAGER = 'setManager',
    GETMANAGER = 'getManager',
    ISREGISTERED = 'isRegistered',
    SETAMLSTATUS = 'setAMLStatus',
    GETAMLSTATUS = 'getAMLStatus',
    GETCLIENTS = 'getClients'
}

export default class ClientContract extends VerifiedContract {

    constructor(signer: VerifiedWallet) {

        const chainId: string = signer.provider._network.chainId.toString()
        super(networks[chainId].address, JSON.stringify(abi), signer)
    }

    public initialize(_address: string): any {
        return this.callContract(FUNCTIONS.INITIALIZE, params)
    }

    public setCustody(params: SetCustody): any {
        return this.callContract(FUNCTIONS.SETCUSTODY, params)
    }

    public getCustody(params: GetCustody): any {
        return this.callContract(FUNCTIONS.GETCUSTODY, params)
    }

    /**
     * We can implement registration and log in using a SSO scheme such as Firebase (https://firebase.google.com/docs/auth) or Azure. 
     * We host our infra on Azure, so that might be preferable. This will enable google / facebook / twitter / Microsoft users to log in to our application. 
     * The SSO system will provide us with a token. Once logged in, the Verified Dapp should call the following solidity function. 
     * This should only be called after the user’s KYC is complete.
     * @params (bool login) 
     * @returns 
     */
    public async setAccess(_login: boolean, options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.BOOLEAN, _login)
        return this.callContract(FUNCTIONS.SETACCESS, _login, options)
    }

    public getAccess(params: GetAccess): any {
        return this.callContract(FUNCTIONS.GETACCESS, params)
    }

    /**
     * Once a user’s wallet is set up, the Dapp should register the user for KYC (know your customer) process
     *  with the issuer. By default, Verified itself is the issuer. In the future, we may have country specific
     *  issuers. This is done by calling the following solidity contract function
     * @params (address _client, address _manager) 
     * @returns 
     */
    public async setManager(_clientAddress: string, _managerAddress: string, options?: { gasLimit, gasPrice }): any {
        await this.validateInput(DATATYPES.ADDRESS, _clientAddress)
        await this.validateInput(DATATYPES.ADDRESS, _managerAddress)
        return this.callContract(FUNCTIONS.SETMANAGER, _clientAddress, _managerAddress, options)
    }

    // function mentioned in the document to be integrated
    public getManager(_clientAddress: string): any {
        return this.callContract(FUNCTIONS.GETMANAGER, _clientAddress)
    }

    public isRegistered(params: IsRegistered): any {
        return this.callContract(FUNCTIONS.ISREGISTERED, params)
    }

    /**
     * We are going to use Coinfirm’s anti-money laundering score (cscore in the json response) to decide whether to block a user or not.
     * Any cscore below 33 needs to be flagged to status equal to false in the following solidity function call.
     * @params (address _client, bool status) 
     * @returns 
     */
    public async setAMLStatus(_clientAddress: string, _status: boolean, options?: { gasLimit, gasPrice }): any {
        await this.validateInput(DATATYPES.ADDRESS, _clientAddress)
        await this.validateInput(DATATYPES.BOOLEAN, _status)
        return this.callContract(FUNCTIONS.SETAMLSTATUS, _clientAddress, _status, options)
    }

    public getAMLStatus(params: GetAMLStatus): any {
        return this.callContract(FUNCTIONS.GETAMLSTATUS, params)
    }

    /**
     * The following solidity function should be called passing the issuer’s address as parameter where,
     *  _status equal to false will fetch all investors whose KYC is not yet complete.
     * @params (address _manager,bool _status) 
     * @returns {address[] memory}
     */
    public async getClients(_managerAddress: string, _status: boolean, options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, _managerAddress)
        await this.validateInput(DATATYPES.BOOLEAN, _status)
        return this.callContract(FUNCTIONS.GETCLIENTS, _managerAddress, _status, options)
    }

}