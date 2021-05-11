// @ts-nocheck

import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/payments/Factory.json';

enum FUNCTIONS {
    GETTOKENCOUNT = 'getTokenCount',
    GETTOKEN = 'getToken',
    GETNAMEANDTYPE = 'getNameAndType'
}

export default class FactoryContract extends VerifiedContract {
    private contractAddr: string
    constructor(signer: VerifiedWallet) {

        const chainId: string = signer.provider._network.chainId.toString()
        const address = networks[chainId].address
        super(address, JSON.stringify(abi), signer)

        this.contractAddr = address
    }

    /**
     * Get number of tokens [callable by client]
     * @param
     * @returns returns number of tokens
     */
    public async getTokenCount() {
        return this.callContract(FUNCTIONS.GETTOKENCOUNT)
    }

    /**
    * Get address of token by index [callable by client].
    * @param (uint256 n)
    * @returns boolean
    */
    public async getToken(_tokenAddress: string, options?: { gasPrice: number, gasLimit: number }): any {
        // await this.validateInput(DATATYPES.STRING, _senderAddress)
        await this.validateInput(DATATYPES.NUMBER, _tokenAddress)
        return this.callContract(FUNCTIONS.GETTOKEN, _tokenAddress)
    }

    /**
    * Get name and type of token by its address callable by client
    * @param (address _viaAddress)
    * @returns boolean
    * returns name and type of token by its address passed as parameter.
    */
    public async getNameAndType(_viaAddress: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _viaAddress)
        return this.callContract(FUNCTIONS.GETNAMEANDTYPE, _viaAddress)
    }
}