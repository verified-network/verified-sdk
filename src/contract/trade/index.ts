// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/trades/Trade.json';


enum FUNCTIONS {
    GETORDERS = 'getOrders',
    GETORDER = 'getOrder',
    GETTRADE = 'getTrade'
}

export default class TradeContract extends VerifiedContract {

    public contractAddress: string
    
    constructor(signer: VerifiedWallet) {

        const chainId: string = signer.provider._network.chainId.toString()
        const address = networks[chainId].address
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    /**
     * Get no of orders [callable by user on Trade.sol]
     * @param ( bool originator)
     * @returns (bytes32[] memory) Returns array of order references. 
     * Originator be set to ‘false’ if orders to fetch are not created by user, 
     * and to ‘true’ if orders to fetch are created by user
     */
    public async getOrders(originator: boolean, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.BOOLEAN, originator)
        return this.callContract(FUNCTIONS.GETORDERS, originator, options)
    }

    /**
   * View order [callable by user on Trade.sol]
   * @param (bytes32 ref)
   * @returns (uint256, uint256, uint256, bytes32, uint, bytes32)
   * Returns array of bytes32[currency,security name, buy/sell order, status], and array of uint[price, trigger, quantity, execution date]
   */
    public async getOrder(_ref: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, ref)
        return this.callContract(FUNCTIONS.GETORDER, this.sanitiseInput(DATATYPES.BYTE32, _ref), options)
    }

    /**
     * View trade [callable by user]
     * @param (bytes32 ref)
     * @returns (bytes16, bytes16)
     * Returns last bid price, ask price.
     */
    public async getTrade(_ref: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, ref)
        return this.callContract(FUNCTIONS.GETTRADE, this.sanitiseInput(DATATYPES.BYTE32, _ref), options)
    }

}