// @ts-nocheck

import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/trades/PostTrade.json';
import { DATATYPES } from "../index";


enum FUNCTIONS {
    GETSETTLEMENTREQUESTS = 'getSettlementRequests',
    GETSETTLEMENTREQUEST = 'getSettlementRequest',
    SETSETTLEMENTSTATUS = 'setSettlementStatus'
}

export default class PostTradeContract extends VerifiedContract {

    constructor(signer: VerifiedWallet) {

        const chainId: string = signer.provider._network.chainId.toString()
        super(networks[chainId].address, JSON.stringify(abi), signer)
    }

    /**
     * Get settlement requests [callable by manager on PostTrade.sol]
     * @param (uint entries, bytes32 _countryCode, bytes32 dpid)
     * @returns (bytes32[] memory)
     */
    public async getSettlementRequests(_entries: number, _countryCode: string, _dpid: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.NUMBER, _entries)
        await this.validateInput(DATATYPES.STRING, _countryCode)
        await this.validateInput(DATATYPES.STRING, _dpid)
        return this.callContract(FUNCTIONS.GETSETTLEMENTREQUESTS, _entries, _countryCode, _dpid, options)
    }

    /**
     * Get settlement request [callable by manager on PostTrade.sol]
     * @param (bytes32 ref)
     * @returns (address[memory, bytes32[] memory, uint256[] memory, bytes16 )
     */
    public async getSettlementRequest(ref: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, ref)
        return this.callContract(FUNCTIONS.GETSETTLEMENTREQUEST, ref, options)
    }

    /**
     * Set settlement status [callable by manager on PostTrade.sol]
     * @param (bytes32 ref, bytes32 _countryCode, SettlementStatus status)
     * @returns 
     */
    public async setSettlementStatus(ref: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, ref)
        return this.callContract(FUNCTIONS.SETSETTLEMENTSTATUS, ref, options)
    }

}