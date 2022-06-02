// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../../index';
import { VerifiedWallet } from "../../../wallet";
import { abi, networks } from '../../../abi/assetmanager/Client.json';

enum FUNCTIONS {
    SETSIGNER = 'setSigner',
    GETROLE = 'getRole',
    REMOVEROLE = 'removeRole',
    ADDROLE = 'addRole'
}

export default class VerifiedClient extends VerifiedContract {
    public contractAddress: string
    constructor(signer: VerifiedWallet) {

        const chainId: string = signer.provider._network.chainId.toString()
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

}