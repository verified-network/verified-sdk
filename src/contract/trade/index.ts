// @ts-nocheck

import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/trades/Trade.json';
import { DATATYPES } from "../index";


enum FUNCTIONS {
    GETORDERS = 'getOrders',
    GETORDER = 'getOrder'
}

export default class TradeContract extends VerifiedContract {

    constructor(signer: VerifiedWallet) {

        const chainId: string = signer.provider._network.chainId.toString()
        super(networks[chainId].address, JSON.stringify(abi), signer)
    }

    /**
     * Get no of orders [callable by user on Trade.sol]
     * @param (uint entries)
     * @returns (bytes32[] memory)
     */
    public getOrders(entries: number, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.NUMBER, entries)
        return this.callContract(FUNCTIONS.GETORDERS, entries, options)
    }

      /**
     * View order [callable by user on Trade.sol]
     * @param (bytes32 ref)
     * @returns (uint256, uint256, uint256, bytes32, uint, bytes32)
     */
       public getOrder(ref: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, ref)
        return this.callContract(FUNCTIONS.GETORDER, ref, options)
    }

}