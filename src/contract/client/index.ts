// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/accounts/Client.json';
import { Initialize, SetCustody, GetCustody, SetAccess, GetAccess, SetManager, GetManager, IsRegistered, SetAMLStatus, GetAMLStatus, GetClients, GetManagers } from '../../models/client';

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
    GETCLIENTS = 'getClients',
    GETROLE = 'getRole',
    REMOVEROLE = 'removeRole',
    ADDROLE = 'addRole',
    GETMANAGERS = 'getManagers',
    MANAGERADDED = 'ManagerRole'
}

export default class ClientContract extends VerifiedContract {
    public contractAddress: string
    constructor(signer: VerifiedWallet) {

        const chainId: string = signer.provider._network.chainId.toString()
        const address = networks[chainId].address
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    public initialize(_address: string): any {
        return this.callContract(FUNCTIONS.INITIALIZE, params)
    }

    public async setCustody(address: string, custody: string, options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, address);
        return this.callContract(FUNCTIONS.SETCUSTODY, address, this.sanitiseInput(DATATYPES.BYTE32, custody), options);
    }

    public async getCustody(address: string, options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, address);
        return this.callContract(FUNCTIONS.GETCUSTODY, address, options);
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

    public async getAccess(_clientAddress: string, options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, _clientAddress)
        return this.callContract(FUNCTIONS.GETACCESS, _clientAddress, options)
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

    /**
     * Get manager [callable by both client and manager
     * @param _clientAddress 
     * @returns address
     */

    public async getManager(_clientAddress: string): any {
        await this.validateInput(DATATYPES.ADDRESS, _clientAddress)
        return this.callContract(FUNCTIONS.GETMANAGER, _clientAddress)
    }

    public async isRegistered(params: IsRegistered): any {
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

    /**
    * Get KYC status [callable by client or its manager or KYCAML submanager 
    * @params (address _client) 
    * @returns bool
    */
    public async getAMLStatus(_client: string): any {
        await this.validateInput(DATATYPES.ADDRESS, _client)
        return this.callContract(FUNCTIONS.GETAMLSTATUS, _client)
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

    /**
    * Get sub-managers for role [callable only by manager]
    * @params (address _submanager, bytes32 _country)
    * @returns {address[] memory}
    */
    public async getRole(_submanager: string, options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, _submanager)
        return this.callContract(FUNCTIONS.GETROLE, _submanager, options)
    }

    /**
   * Remove sub-manager from role [callable only by manager]
   * @params (address _submanager, bytes32 _country, bytes32 _role)
   * @returns 
   */
    public async removeRole(_submanager: string, _country: string, _role: string, options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, _submanager)
        await this.validateInput(DATATYPES.STRING, _country)
        await this.validateInput(DATATYPES.STRING, _role)
        return this.callContract(FUNCTIONS.REMOVEROLE, _submanager, this.sanitiseInput(DATATYPES.BYTE32, _country), this.sanitiseInput(DATATYPES.BYTE32, _role), options)
    }

    /**
     * Create role for sub-manager [callable only by manager
     * @params (address _submanager, bytes32 _country, bytes32 _role)
     * @returns 
     */
    public async addRole(_submanager: string, _country: string, _role: string, _id: string, options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, _submanager)
        await this.validateInput(DATATYPES.STRING, _country)
        await this.validateInput(DATATYPES.STRING, _role)
        await this.validateInput(DATATYPES.STRING, _id)
        return this.callContract(FUNCTIONS.ADDROLE, _submanager, this.sanitiseInput(DATATYPES.BYTE32, _country), this.sanitiseInput(DATATYPES.BYTE32, _role), this.sanitiseInput(DATATYPES.BYTE32, _id), options)
    }

    public async getManagers(_role: string, _country: string, options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.STRING, _role)
        await this.validateInput(DATATYPES.STRING, _country)
        return this.callContract(FUNCTIONS.GETMANAGERS, this.sanitiseInput(DATATYPES.BYTE32, _role), this.sanitiseInput(DATATYPES.BYTE32, _country), options)
    }

    public notifyManagerAdded(callback: any): object {
        this.getEvent(FUNCTIONS.MANAGERADDED, callback)
    }
}