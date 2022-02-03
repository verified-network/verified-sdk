// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/liquidity/LPToken.json';

enum FUNCTIONS {
    CREATESUPPLY = 'createSupply',
    SUPPORTTOKENS = 'supportTokens',
    CHECKSUPPORTFORTOKEN = 'checkSupportForToken',
    REGISTERPLATFORM = 'registerPlatform',
    BUY = 'buy',
    GETINVESTORS = 'getInvestors',
    GETINVESTMENT = 'getInvestment',
    ISSUE = 'issue',
    STAKE = 'stake',
    WITHDRAW = 'withdraw',
    DISTRIBUTE = 'distribute',
    PROVIDELIQUIDITY = 'provideLiquidity'
}

export default class LiquidityContract extends VerifiedContract {
    
    public contractAddress: string
    
    constructor(signer: VerifiedWallet) {

        const chainId: string = signer.provider._network.chainId.toString()
        const address = networks[chainId].address
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }
    
    /**
        Creates supply of the Verified Liquidity token after initial issue with constructor defined parameters
        @param  _supply total supply of VITTA
        @param  _cap    investment limit for each investor
        @param  _limit  time limit for issue close 
     */
    public async createSupply(_supply: string, _cap: string, _limit: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.NUMBER, _supply)
        await this.validateInput(DATATYPES.NUMBER, _cap)
        await this.validateInput(DATATYPES.NUMBER, _limit)
        return this.callContract(FUNCTIONS.CREATESUPPLY, _supply, _cap, _limit, options)
    }

    /**
        Specifies list of supported tokens that can be invested in the Verified Liquidity token
        @param  _tokens array of supported token addresses
     */
    public async supportTokens(_tokens: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.STRING, _tokens)
        return this.callContract(FUNCTIONS.SUPPORTTOKENS, _tokens, options)
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
        Registers a liquidity platform (eg, DEX) where Verified Liquidity tokens can be used to underwrite investments
        @param  _liquidityPlatform  address of the market making platform
     */
    public async registerPlatform(_platform: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _platform)
        return this.callContract(FUNCTIONS.REGISTERPLATFORM, _platform, options)
    }

    /**
        Used by external apps (eg, exchange, wallet) to buy Verified Liquidity token 
        @param  _token  address of token used by investor to buy the VITTA
        @param  _amount amount of token that is transferred from investor to this VITTA issuing contract's account for the investor
     */
    public async buy(_token: string, _amount: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _token)
        await this.validateInput(DATATYPES.NUMBER, _amount)
        return this.callContract(FUNCTIONS.BUY, _token, _amount, options)
    }

    /**
        Fetches investors in VITTA
     */
    public async getInvestors(options?: { gasPrice: number, gasLimit: number }): any {
        return this.callContract(FUNCTIONS.GETINVESTORS, options)
    }   

    /**
        Fetches investment detail for specific investor in VITTA
        @param  _investor   address of investor
        @param  _tokenName  name of token invested by investor
     */
    public async getInvestment(_investor: string, _tokenName: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _investor)
        await this.validateInput(DATATYPES.STRING, _tokenName)
        return this.callContract(FUNCTIONS.GETINVESTMENT, _investor, _tokenName, options)
    }

    /**
        Used by Issuers (eg, asset managers) to issue VITTA to investors or refund paid in tokens to investors if investment cap is breached
        @param  _investor       address of investor
        @param  _tokenName      name of token invested in VITTA
        @param  _tokenAmount    amount of token invested in VITTA
        @param  _LPToIssue      amount of VITTA to issue to investor
     */
    public async issue(_investor: string, _tokenName: string, _tokenAmount: string, _LPToIssue: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _investor)
        await this.validateInput(DATATYPES.STRING, _tokenName)
        await this.validateInput(DATATYPES.NUMBER, _tokenAmount)
        await this.validateInput(DATATYPES.NUMBER, _LPToIssue)
        return this.callContract(FUNCTIONS.ISSUE, _investor, _tokenName, _tokenAmount, _LPToIssue, options)
    }

    /**
        Used by VITTA holder to stake it for providing liquidity for underwriting investments
        @param  _toStake    amount of VITTA to stake
     */
    public async stake(_toStake: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.NUMBER, _toStake)
        return this.callContract(FUNCTIONS.STAKE, _toStake, options)
    }

    /**
        Used by VITTA holder to withdraw staked liquidity for underwriting investments
        @param  _fromStake    amount of VITTA staked
     */
    public async withdraw(_fromStake: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.NUMBER, _fromStake)
        return this.callContract(FUNCTIONS.WITHDRAW, _fromStake, options)
    }

    /**
        Pay out of income by Market maker contracts to VITTA Liquidity providers
        @param  _distribution   amount of VITTA to mint and distribute pro rata to liquidity providers
     */
    public async distribute(_distribution: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.NUMBER, _distribution)
        return this.callContract(FUNCTIONS.DISTRIBUTE, _distribution, options)
    }

    /**
        Provides staked VITTA to Market maker contracts based on prior liquidity consumed and commission earned 
     */
    public async provideLiquidity(options?: { gasPrice: number, gasLimit: number }): any {
        return this.callContract(FUNCTIONS.PROVIDELIQUIDITY, options)
    } 

}