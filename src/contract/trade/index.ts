// @ts-nocheck

import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/trades/Trade.json';
import { DATATYPES } from "../index";


enum FUNCTIONS {
    GETORDERS = 'getOrders',
    GETORDER = 'getOrder',
    GETTRADE = 'getTrade'
}

export default class TradeContract extends VerifiedContract {

    constructor(signer: VerifiedWallet) {

        const chainId: string = signer.provider._network.chainId.toString()
        super(networks[chainId].address, JSON.stringify(abi), signer)
    }

    /**
     * Get no of orders [callable by user on Trade.sol]
     * @param (uint entries, bool originator)
     * @returns (bytes32[] memory) Returns array of order references. 
     * Originator be set to ‘false’ if orders to fetch are not created by user, 
     * and to ‘true’ if orders to fetch are created by user
     */
    public async getOrders(entries: number, originator: boolean, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.NUMBER, entries)
        await this.validateInput(DATATYPES.BOOLEAN, originator)
        return this.callContract(FUNCTIONS.GETORDERS, entries, originator)
    }

    /**
   * View order [callable by user on Trade.sol]
   * @param (bytes32 ref)
   * @returns (uint256, uint256, uint256, bytes32, uint, bytes32)
   * Returns array of bytes32[currency,security name, buy/sell order, status], and array of uint[price, trigger, quantity, execution date]
   */
    public async getOrder(ref: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, ref)
        return this.callContract(FUNCTIONS.GETORDER, ref)
    }


    public async getTrade(ref: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, ref)
        return this.callContract(FUNCTIONS.GETTRADE, ref)
    }

}