// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/payments/Bond.json';

enum FUNCTIONS {
    GETBONDS = 'getBonds',
    GETBONDISSUES = 'getBondIssues',
    GETBONDPURCHASES = 'getBondPurchases',
    ISSUE = 'BondIssued',
    REDEEM = 'BondRedeemed',
    PURCHASE = 'BondPurchased',
    LIQUIDATE = 'BondLiquidated'
}

export default class BondContract extends VerifiedContract {

    public contractAddress: string
    
    constructor(signer: VerifiedWallet, bondCurrencyAddress: string) {

        const chainId: string = signer.provider._network.chainId.toString()
        const address = bondCurrencyAddress
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    /*
    * Gets bond issued address
    * @param ()
    * @returns address[] memory
    */
    public async getBonds() {
        return this.callContract(FUNCTIONS.GETBONDS)
    }
    
    /**
    * Fetch bonds issued with their balance amounts to redeem [callable by client]
    * entries is count of results to return. Address[] has issued bond addresses, and uint[] has issued amount
    * @param ()
    * @returns (bytes16 parValue, bytes16 paidInAmount, bytes32 paidInCurrency, uint256 timeIssuedSubscribed)
    */
    public async getBondIssues(_issuer: string, _bond: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _issuer)
        await this.validateInput(DATATYPES.ADDRESS, _bond)
        return this.callContract(FUNCTIONS.GETBONDISSUES, _issuer, _bond, options)
    }

    /**
    * Fetch bonds purchased with their purchased amounts [callable by client]
    * entries is count of results to return. Address[] has purchased bond addresses, and uint[] has purchased amount
    * @param ()
    * @returns (bytes16 parValue, bytes16 paidInAmount, bytes32 paidInCurrency, uint256 timeIssuedSubscribed)
    */
    public async getBondPurchases(_issuer: string, _bond: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _issuer)
        await this.validateInput(DATATYPES.ADDRESS, _bond)
        return this.callContract(FUNCTIONS.GETBONDPURCHASES, _issuer, _bond, options)
    }

    /*
    emits event BondIssued(address indexed _token, address issuer, uint256 issuedAmount, bytes32 collateralCurrency, uint256 collateralValue);
    */
    public notifyBondIssue(callback: any): object {
        this.getEvent(FUNCTIONS.ISSUE, callback)
    }

    /*
    emits event BondRedeemed(address indexed _token, address redeemedBy, uint256 redemptionAmount, bytes32 redemptionCurrency);
    */
    public notifyBondRedemption(callback: any): object {
        this.getEvent(FUNCTIONS.REDEEM, callback)
    }

    /*
    emits event BondPurchased(address indexed _token, address purchaser, uint256 purchasedAmount, bytes32 paidInCurrency, uint256 paidInAmount);
    */
    public notifyBondPurchase(callback: any): object {
        this.getEvent(FUNCTIONS.PURCHASE, callback)
    }

    /*
    emits event BondLiquidated(address indexed _token, address redeemedBy, uint256 redemptionAmount, bytes32 redemptionCurrency);
    */
    public notifyBondLiquidation(callback: any): object {
        this.getEvent(FUNCTIONS.LIQUIDATE, callback)
    }

}