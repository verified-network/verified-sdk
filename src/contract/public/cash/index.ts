// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../../index';
import { VerifiedWallet } from "../../../wallet";
import { abi, networks } from '../../../abi/deposits/Cash.json';

enum FUNCTIONS {
    SUPPORTTOKENS = 'supportTokens',
    CHECKSUPPORTFORTOKEN = 'checkSupportForToken',
    GETSUPPORTEDTOKENS = 'getSupportedTokens',
    REQUESTISSUE = 'requestIssue',
}

export default class VerifiedCash extends VerifiedContract {
    
    public contractAddress: string
    
    constructor(signer: VerifiedWallet) {

        const chainId: string = signer.provider._network.chainId.toString()
        const address = networks[chainId].address
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }
    
    /**
        Specifies list of supported tokens that can be invested in the Verified Liquidity token
        @param  _tokens array of supported token addresses
     */
    public async supportTokens(_tokens: string, _name: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _tokens)
        await this.validateInput(DATATYPES.STRING, _name)
        return this.callContract(FUNCTIONS.SUPPORTTOKENS, _tokens, this.sanitiseInput(DATATYPES.BYTE32, _name), options)
    }

    /**
        Checks if a specified token is supported for investing in the Verified Liquidity token
        @param  _token  token that is supported for investment
     */
    public async checkSupportForToken(_token: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _token)
        return this.callContract(FUNCTIONS.CHECKSUPPORTFORTOKEN, _token, options)
    }

    /**
     * Returns list of supported liquidity tokens (eg, VITTA, USDC, DAI)
     * @returns array of struct of tokens 
     */
    public async getSupportedTokens(){
        return this.callContract(FUNCTIONS.GETSUPPORTEDTOKENS);
    }

    /**
        Used by external apps (eg, exchange, wallet) to buy Verified cash token 
        @param  _token  address of token used by investor to buy the cash token
        @param  _amount amount of token that is transferred from investor to this cash token issuing contract
     */
    public async requestIssue(_token: string, _amount: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _token)
        await this.validateInput(DATATYPES.NUMBER, _amount)
        return this.callContract(FUNCTIONS.REQUESTISSUE, _token, _amount, options)
    }

}