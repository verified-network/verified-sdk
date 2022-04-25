// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/liquidity/Liquidity.json';

enum FUNCTIONS {
    CREATESUPPLY = 'createSupply',
    SUPPORTTOKENS = 'supportTokens',
    CHECKSUPPORTFORTOKEN = 'checkSupportForToken',
    GETSUPPORTEDTOKENS = 'getSupportedTokens',
    REGISTERPLATFORM = 'registerPlatform',
    BUY = 'buy',
    GETINVESTORS = 'getInvestors',
    GETINVESTMENT = 'getInvestment',    
    ISSUE = 'issue',
    STAKE = 'stake',
    WITHDRAW = 'withdraw',
    PAYOUT = 'payOut',
    ADDMANAGER = 'addManager',
    REMOVEMANAGER = 'removeManager',
    GETMANAGERS = 'getManagers',
    GETPLATFORMS = 'getPlaforms',
    GETPLATFORMPERFORMANCE = 'getPlatformPerformance',
    GETMANAGERPERFORMANCE = 'getManagerPerformance',
    PROVIDELIQUIDITY = 'provideLiquidity',
    BALANCE = 'balance'
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
        Registers a liquidity platform (eg, DEX) where Verified Liquidity tokens can be used to underwrite investments
        @param  _liquidityPlatform  address of the market making platform
     */
    public async registerPlatform(_platform: string, _name: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _platform)
        await this.validateInput(DATATYPES.STRING, _name)
        return this.callContract(FUNCTIONS.REGISTERPLATFORM, _platform, this.sanitiseInput(DATATYPES.BYTE32, _name), options)
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
    public async getInvestors(){
        return this.callContract(FUNCTIONS.GETINVESTORS)
    }
    
    /**
        Fetches registered platforms
     */
    public async getPlaforms(){
        return this.callContract(FUNCTIONS.GETPLATFORMS)
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
        Pay out of income to VITTA Liquidity providers
        @param  _distribution   amount of VITTA to mint and distribute pro rata to liquidity providers
        @param  _platform       address of liquidity platform
     */
    public async payOut(_distribution: string, _platform: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.NUMBER, _distribution)
        await this.validateInput(DATATYPES.ADDRESS, _platform)
        return this.callContract(FUNCTIONS.PAYOUT, _distribution, _platform, options)
    }

    /**
     * Adds asset manager to manage liquidity
     * @param _platform address of market making platform (eg Balancer)
     * @param _manager  address of asset manager
     * @param options   
     * @returns         none
     */
    public async addManager(_platform: string, _manager: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _platform)
        await this.validateInput(DATATYPES.ADDRESS, _manager)
        return this.callContract(FUNCTIONS.ADDMANAGER, _platform, _manager, options)
    }

    /**
     * Removes asset manager managing liquidity
     * @param _platform address of market making platform (eg Balancer)
     * @param _manager  address of asset manager
     * @param options   
     * @returns         none
     */
    public async removeManager(_platform: string, _manager: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _platform)
        await this.validateInput(DATATYPES.ADDRESS, _manager)
        return this.callContract(FUNCTIONS.REMOVEMANAGER, _platform, _manager, options)
    }

    /**
     * Fetches asset managers
     * @param _platform address of market making platform
     * @param options 
     * @returns         array of asset manager addresses
     */
    public async getManagers(_platform: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _platform)
        return this.callContract(FUNCTIONS.GETMANAGERS, _platform, options)
    }

    /**
     * Gets return on investment performance of market making platform
     * @param _platform address of market making platform
     * @param options 
     * @returns         uint256 unstakedLiquidity, 
                        uint256 balancePlatformLiquidity,
                        uint256 platformLiquidityProvided,
                        uint256 platformCommissionsEarned
     */
    public async getPlatformPerformance(_platform: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _platform)
        return this.callContract(FUNCTIONS.GETPLATFORMPERFORMANCE, _platform, options)
    }

    /**
     * Gets return on investment performance for asset manager
     * @param _platform address of market making platform (eg Balancer)
     * @param _manager  address of asset manager
     * @param options   
     * @returns         uint256 managerLiquidityProvided,
                        uint256 managerCommissionsEarned
     */
    public async getManagerPerformance(_platform: string, _token: string, _manager: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _platform)
        await this.validateInput(DATATYPES.ADDRESS, _token)
        await this.validateInput(DATATYPES.ADDRESS, _manager)
        return this.callContract(FUNCTIONS.GETMANAGERPERFORMANCE, _platform, _token, _manager, options)
    }

    /**
     * Provides liquidity to asset managers on platform
     * @param _platform     address of market making platform
     * @param _manager      address of asset manager
     * @param _liquidity    amount of liquidity to provision to asset manager on platform 
     * @param options 
     * @returns             none
     */
    public async provideLiquidity(_platform: string, _manager: string, _liquidity: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _platform)
        await this.validateInput(DATATYPES.ADDRESS, _manager)
        await this.validateInput(DATATYPES.NUMBER, _liquidity)
        return this.callContract(FUNCTIONS.PROVIDELIQUIDITY, _platform, _manager, _liquidity, options)
    } 

    /**
     * Fetches balance of investor
     * @param _investor address of investor
     * @param options 
     * @returns         balance of investor
     */
    public async balanceOf(_investor: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _investor)
        return this.callContract(FUNCTIONS.BALANCE, _investor, options)
    }

}