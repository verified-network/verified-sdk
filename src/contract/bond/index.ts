// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/payments/Bond.json';

enum FUNCTIONS {
    REQUESTISSUE = 'requestIssue',
    TRANSFERFROM = 'transferFrom',
    TRANSFERTOKEN = 'transferToken',
    GETBONDISSUES = 'getBondIssues',
    GETBONDPURCHASES = 'getBondPurchases'
}

export default class BondContract extends VerifiedContract {

    public contractAddress: string
    
    constructor(signer: VerifiedWallet) {

        const chainId: string = signer.provider._network.chainId.toString()
        const address = networks[chainId].address
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    /**
     * Also, just as in the case of cash tokens, an investor can pay in a cash token and purchase bond tokens. 
     * For this, the solidity function to be called where, payer is the investor’s address, currency is cash token paid in, 
     * cashContract is the address of the cash token paid in, and amount is the numeric of amount in currency paid in.
     * @param (bytes16 amount, address payer, bytes32 currency, address cashContract)
     * @returns boolean
     */
    public async requestIssue(_amount: string, _payerAddress: string, _currency: string, _cashContractAddress: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _amount)
        await this.validateInput(DATATYPES.ADDRESS, _payerAddress)
        await this.validateInput(DATATYPES.STRING, _currency)
        await this.validateInput(DATATYPES.ADDRESS, _cashContractAddress)
        return this.callContract(FUNCTIONS.REQUESTISSUE, this.sanitiseInput(DATATYPES.BYTE16, _amount), _payerAddress, this.sanitiseInput(DATATYPES.BYTE32, _currency), _cashContractAddress, options)
    }

    /**
     * For bond redemption, the following solidity function needs to be called. where, sender is the investor’s address, receiver is the issuing investor’s address, and tokens are numeric amount of bond tokens to redeem
     * @param (address _sender, address _receiver, uint256 _tokens) 
     * @returns 
     */
    public async transferFrom(_senderAddress: string, _recieverAddress: string, _tokens: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _senderAddress)
        await this.validateInput(DATATYPES.ADDRESS, _recieverAddress)
        await this.validateInput(DATATYPES.NUMBER, _tokens)
        return this.callContract(FUNCTIONS.TRANSFERFROM, _senderAddress, _recieverAddress, _tokens, options)
    }

    /**
     * Lend by purchasing bond token against other cash token  [callable by client] 
     * _sender is contract address of cash token lent, 
     * _receiver is the bond token address,
     * _tokens is amount of cash tokens len
     * @param (address _sender, address _receiver, uint256 _tokens) 
   * @returns bool
   */
    public async transferToken(_senderAddress: string, _recieverAddress: string, _tokens: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _senderAddress)
        await this.validateInput(DATATYPES.ADDRESS, _recieverAddress)
        await this.validateInput(DATATYPES.NUMBER, _tokens)
        return this.callContract(FUNCTIONS.TRANSFERTOKEN, _senderAddress, _recieverAddress, _tokens, options)
    }

    /**
    * Fetch bonds issued with their balance amounts to redeem [callable by client]
    * entries is count of results to return. Address[] has issued bond addresses, and uint[] has issued amount
    * @param ()
    * @returns (address[] memory, uint256[] memory)
    */
    public async getBondIssues(options?: { gasPrice: number, gasLimit: number }): any {
        return this.callContract(FUNCTIONS.GETBONDISSUES, options)
    }

    /**
    * Fetch bonds purchased with their purchased amounts [callable by client]
    * entries is count of results to return. Address[] has purchased bond addresses, and uint[] has purchased amount
    * @param ()
    * @returns (address[] memory, uint256[] memory)
    */
    public async getBondPurchases(options?: { gasPrice: number, gasLimit: number }): any {
        return this.callContract(FUNCTIONS.GETBONDPURCHASES, options)
    }

}