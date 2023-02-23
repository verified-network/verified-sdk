// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../../index';
import { VerifiedWallet } from "../../../wallet";
import { abi, networks } from '../../../abi/assetmanager/Client.json';

enum FUNCTIONS {
    SETSIGNER = 'setSigner',
    GETROLE = 'getRole',
    REMOVEROLE = 'removeRole',
    ADDROLE = 'addRole',
    UPDATEKYC = 'KycUpdate',
    GETCLIENTKYC = 'getClientKYC',
    SETAMLSCORE = 'setAmlScore'
}

export default class Client extends VerifiedContract {
    public contractAddress: string
    constructor(signer: VerifiedWallet) {

        const chainId: string = Object.keys(networks)
        const address = networks[chainId].address
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    public setSigner(_address: string): any {
        return this.callContract(FUNCTIONS.SETSIGNER, _address)
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
    public async removeRole(_manager: string, _submanager: string, _country: string, _role: string, 
                            _hashedMessage: string,
                            _v: string,
                            _r: string,
                            _s: string,
                            options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, _manager)
        await this.validateInput(DATATYPES.ADDRESS, _submanager)
        await this.validateInput(DATATYPES.STRING, _country)
        await this.validateInput(DATATYPES.STRING, _role)
        return this.callContract(FUNCTIONS.REMOVEROLE, _manager, _submanager, this.sanitiseInput(DATATYPES.BYTE32, _country), this.sanitiseInput(DATATYPES.BYTE32, _role), _hashedMessage, _v, _r, _s, options)
    }

    /**
     * Create role for sub-manager [callable only by manager
     * @params (address _submanager, bytes32 _country, bytes32 _role)
     * @returns 
     */
    public async addRole(_manager: string, _submanager: string, _country: string, _role: string, _id: string, 
                        _hashedMessage: string,
                        _v: string,
                        _r: string,
                        _s: string,
                        options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, _manager)
        await this.validateInput(DATATYPES.ADDRESS, _submanager)
        await this.validateInput(DATATYPES.STRING, _country)
        await this.validateInput(DATATYPES.STRING, _role)
        await this.validateInput(DATATYPES.STRING, _id)
        return this.callContract(FUNCTIONS.ADDROLE, _manager, _submanager, this.sanitiseInput(DATATYPES.BYTE32, _country), this.sanitiseInput(DATATYPES.BYTE32, _role), this.sanitiseInput(DATATYPES.BYTE32, _id), _hashedMessage, _v, _r, _s, options)
    }

    public async KycUpdate(client: string, name: string, surname: string, country: string, status: string, 
                                    _hashedMessage: string,
                                    _v: string,
                                    _r: string,
                                    _s: string,
                                    options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, client)
        await this.validateInput(DATATYPES.STRING, name)
        await this.validateInput(DATATYPES.STRING, surname)
        await this.validateInput(DATATYPES.STRING, country)
        await this.validateInput(DATATYPES.NUMBER, status)
        return this.callContract(FUNCTIONS.UPDATEKYC, client, this.sanitiseInput(DATATYPES.BYTE32, name), this.sanitiseInput(DATATYPES.BYTE32, surname), this.sanitiseInput(DATATYPES.BYTE32, country), status, _hashedMessage, _v, _r, _s, options)
    }

    public async getClientKYC(_client: string, options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, _client)
        return this.callContract(FUNCTIONS.GETCLIENTKYC, _client, options)
    }

    public async setAmlScore(_client: string, _score: string, options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, _client)
        await this.validateInput(DATATYPES.NUMBER, _score)
        return this.callContract(FUNCTIONS.SETAMLSCORE, _client, _score, options)
    }

}