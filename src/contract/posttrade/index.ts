// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/trades/PostTrade.json';

enum FUNCTIONS {
    GETSETTLEMENTREQUESTS = 'getSettlementRequests',
    GETSETTLEMENTREQUEST = 'getSettlementRequest',
    SETSETTLEMENTSTATUS = 'setSettlementStatus'
}

export default class PostTradeContract extends VerifiedContract {

    public contractAddress: string
    
    constructor(signer: VerifiedWallet) {

        const chainId: string = signer.provider._network.chainId.toString()
        const address = networks[chainId].address
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    /**
     * Get settlement requests [callable by manager on PostTrade.sol]
     * @param (uint entries, bytes32 _countryCode, bytes32 dpid)
     * @returns (bytes32[] memory)
     */
    public async getSettlementRequests(_countryCode: string, _dpid: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _countryCode)
        await this.validateInput(DATATYPES.STRING, _dpid)
        return this.callContract(FUNCTIONS.GETSETTLEMENTREQUESTS, this.sanitiseInput(DATATYPES.BYTE32, _countryCode), this.sanitiseInput(DATATYPES.BYTE32, _dpid), options)
    }

    /**
     * Get settlement request [callable by manager on PostTrade.sol]
     * @param (bytes32 _ref)
     * @returns (address[memory, bytes32[] memory, uint256[] memory, bytes16 )
     */
    public async getSettlementRequest(_ref: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _ref)
        return this.callContract(FUNCTIONS.GETSETTLEMENTREQUEST, this.sanitiseInput(DATATYPES.BYTE32, _ref), options)
    }

    /**
     * Set settlement status [callable by manager on PostTrade.sol]
     * @param (bytes32 _ref, bytes32 _countryCode, bytes32 SettlementStatus)
     * @returns 
     */
    public async setSettlementStatus(_ref: string, _countryCode: string, _settlementStatus: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _ref)
        await this.validateInput(DATATYPES.STRING, _countryCode)
        await this.validateInput(DATATYPES.STRING, _settlementStatus)
        return this.callContract(FUNCTIONS.SETSETTLEMENTSTATUS, this.sanitiseInput(DATATYPES.BYTE32, _ref), this.sanitiseInput(DATATYPES.BYTE32, _countryCode), this.sanitiseInput(DATATYPES.BYTE32, _settlementStatus), options)
    }

}