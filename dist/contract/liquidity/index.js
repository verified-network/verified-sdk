"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const Liquidity_json_1 = require("../../abi/liquidity/Liquidity.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["CREATESUPPLY"] = "createSupply";
    FUNCTIONS["SUPPORTTOKENS"] = "supportTokens";
    FUNCTIONS["CHECKSUPPORTFORTOKEN"] = "checkSupportForToken";
    FUNCTIONS["GETSUPPORTEDTOKENS"] = "getSupportedTokens";
    FUNCTIONS["REGISTERPLATFORM"] = "registerPlatform";
    FUNCTIONS["BUY"] = "buy";
    FUNCTIONS["GETINVESTORS"] = "getInvestors";
    FUNCTIONS["GETINVESTMENT"] = "getInvestment";
    FUNCTIONS["ISSUE"] = "issue";
    FUNCTIONS["STAKE"] = "stake";
    FUNCTIONS["WITHDRAW"] = "withdraw";
    FUNCTIONS["PAYOUT"] = "payOut";
    FUNCTIONS["ADDMANAGER"] = "addManager";
    FUNCTIONS["REMOVEMANAGER"] = "removeManager";
    FUNCTIONS["GETMANAGERS"] = "getManagers";
    FUNCTIONS["GETPLATFORMS"] = "getPlatforms";
    FUNCTIONS["GETPLATFORMPERFORMANCE"] = "getPlatformPerformance";
    FUNCTIONS["GETMANAGERPERFORMANCE"] = "getManagerPerformance";
    FUNCTIONS["PROVIDELIQUIDITY"] = "provideLiquidity";
    FUNCTIONS["BALANCE"] = "balance";
    FUNCTIONS["NOTIFYISSUE"] = "RequestIssue";
})(FUNCTIONS || (FUNCTIONS = {}));
class LiquidityContract extends index_1.VerifiedContract {
    constructor(signer) {
        const chainId = Object.keys(Liquidity_json_1.networks);
        const address = Liquidity_json_1.networks[chainId].address;
        super(address, JSON.stringify(Liquidity_json_1.abi), signer);
        this.contractAddress = address;
    }
    /**
        Creates supply of the Verified Liquidity token after initial issue with constructor defined parameters
        @param  _supply total supply of VITTA
        @param  _cap    investment limit for each investor
        @param  _limit  time limit for issue close
     */
    async createSupply(_supply, _cap, _limit, options) {
        await this.validateInput(index_1.DATATYPES.NUMBER, _supply);
        await this.validateInput(index_1.DATATYPES.NUMBER, _cap);
        await this.validateInput(index_1.DATATYPES.NUMBER, _limit);
        return this.callContract(FUNCTIONS.CREATESUPPLY, _supply, _cap, _limit, options);
    }
    /**
        Specifies list of supported tokens that can be invested in the Verified Liquidity token
        @param  _tokens array of supported token addresses
     */
    async supportTokens(_tokens, _name, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _tokens);
        await this.validateInput(index_1.DATATYPES.STRING, _name);
        return this.callContract(FUNCTIONS.SUPPORTTOKENS, _tokens, this.sanitiseInput(index_1.DATATYPES.BYTE32, _name), options);
    }
    /**
        Checks if a specified token is supported for investing in the Verified Liquidity token
        @param  _token  token that is supported for investment
     */
    async checkSupportForToken(_token, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _token);
        return this.callContract(FUNCTIONS.CHECKSUPPORTFORTOKEN, _token, options);
    }
    /**
     * Returns list of supported liquidity tokens (eg, VITTA, USDC, DAI)
     * @returns array of struct of tokens
     */
    async getSupportedTokens() {
        return this.callContract(FUNCTIONS.GETSUPPORTEDTOKENS);
    }
    /**
        Registers a liquidity platform (eg, DEX) where Verified Liquidity tokens can be used to underwrite investments
        @param  _liquidityPlatform  address of the market making platform
     */
    async registerPlatform(_platform, _name, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _platform);
        await this.validateInput(index_1.DATATYPES.STRING, _name);
        return this.callContract(FUNCTIONS.REGISTERPLATFORM, _platform, this.sanitiseInput(index_1.DATATYPES.BYTE32, _name), options);
    }
    /**
        Used by external apps (eg, exchange, wallet) to buy Verified Liquidity token
        @param  _token  address of token used by investor to buy the VITTA
        @param  _amount amount of token that is transferred from investor to this VITTA issuing contract's account for the investor
     */
    async buy(_token, _amount, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _token);
        await this.validateInput(index_1.DATATYPES.NUMBER, _amount);
        return this.callContract(FUNCTIONS.BUY, _token, _amount, options);
    }
    /**
        Fetches investors in VITTA
     */
    async getInvestors() {
        return this.callContract(FUNCTIONS.GETINVESTORS);
    }
    /**
        Fetches registered platforms
     */
    async getPlatforms() {
        return this.callContract(FUNCTIONS.GETPLATFORMS);
    }
    /**
        Fetches investment detail for specific investor in VITTA
        @param  _investor   address of investor
        @param  _tokenName  name of token invested by investor
     */
    async getInvestment(_investor, _tokenName, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _investor);
        await this.validateInput(index_1.DATATYPES.STRING, _tokenName);
        return this.callContract(FUNCTIONS.GETINVESTMENT, _investor, _tokenName, options);
    }
    /**
        Used by Issuers (eg, asset managers) to issue VITTA to investors or refund paid in tokens to investors if investment cap is breached
        @param  _investor       address of investor
        @param  _tokenName      name of token invested in VITTA
        @param  _tokenAmount    amount of token invested in VITTA
        @param  _LPToIssue      amount of VITTA to issue to investor
     */
    async issue(_investor, _tokenName, _tokenAmount, _LPToIssue, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _investor);
        await this.validateInput(index_1.DATATYPES.STRING, _tokenName);
        await this.validateInput(index_1.DATATYPES.NUMBER, _tokenAmount);
        await this.validateInput(index_1.DATATYPES.NUMBER, _LPToIssue);
        return this.callContract(FUNCTIONS.ISSUE, _investor, _tokenName, _tokenAmount, _LPToIssue, options);
    }
    /**
        Used by VITTA holder to stake it for providing liquidity for underwriting investments
        @param  _toStake    amount of VITTA to stake
     */
    async stake(_toStake, options) {
        await this.validateInput(index_1.DATATYPES.NUMBER, _toStake);
        return this.callContract(FUNCTIONS.STAKE, _toStake, options);
    }
    /**
        Used by VITTA holder to withdraw staked liquidity for underwriting investments
        @param  _fromStake    amount of VITTA staked
     */
    async withdraw(_fromStake, options) {
        await this.validateInput(index_1.DATATYPES.NUMBER, _fromStake);
        return this.callContract(FUNCTIONS.WITHDRAW, _fromStake, options);
    }
    /**
        Pay out of income to VITTA Liquidity providers
        @param  _distribution   amount of VITTA to mint and distribute pro rata to liquidity providers
        @param  _platform       address of liquidity platform
     */
    async payOut(_distribution, _platform, options) {
        await this.validateInput(index_1.DATATYPES.NUMBER, _distribution);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _platform);
        return this.callContract(FUNCTIONS.PAYOUT, _distribution, _platform, options);
    }
    /**
     * Adds asset manager to manage liquidity
     * @param _platform address of market making platform (eg Balancer)
     * @param _manager  address of asset manager
     * @param options
     * @returns         none
     */
    async addManager(_platform, _manager, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _platform);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _manager);
        return this.callContract(FUNCTIONS.ADDMANAGER, _platform, _manager, options);
    }
    /**
     * Removes asset manager managing liquidity
     * @param _platform address of market making platform (eg Balancer)
     * @param _manager  address of asset manager
     * @param options
     * @returns         none
     */
    async removeManager(_platform, _manager, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _platform);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _manager);
        return this.callContract(FUNCTIONS.REMOVEMANAGER, _platform, _manager, options);
    }
    /**
     * Fetches asset managers
     * @param _platform address of market making platform
     * @param options
     * @returns         array of asset manager addresses
     */
    async getManagers(_platform, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _platform);
        return this.callContract(FUNCTIONS.GETMANAGERS, _platform, options);
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
    async getPlatformPerformance(_platform, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _platform);
        return this.callContract(FUNCTIONS.GETPLATFORMPERFORMANCE, _platform, options);
    }
    /**
     * Gets return on investment performance for asset manager
     * @param _platform address of market making platform (eg Balancer)
     * @param _manager  address of asset manager
     * @param options
     * @returns         uint256 managerLiquidityProvided,
                        uint256 managerCommissionsEarned
     */
    async getManagerPerformance(_platform, _token, _manager, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _platform);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _token);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _manager);
        return this.callContract(FUNCTIONS.GETMANAGERPERFORMANCE, _platform, _token, _manager, options);
    }
    /**
     * Provides liquidity to asset managers on platform
     * @param _platform     address of market making platform
     * @param _manager      address of asset manager
     * @param _liquidity    amount of liquidity to provision to asset manager on platform
     * @param options
     * @returns             none
     */
    async provideLiquidity(_platform, _manager, _liquidity, _token, _tokenAmount, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _platform);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _manager);
        await this.validateInput(index_1.DATATYPES.NUMBER, _liquidity);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _token);
        await this.validateInput(index_1.DATATYPES.NUMBER, _tokenAmount);
        return this.callContract(FUNCTIONS.PROVIDELIQUIDITY, _platform, _manager, _liquidity, _token, _tokenAmount, options);
    }
    /**
     * Fetches balance of investor
     * @param _investor address of investor
     * @param options
     * @returns         balance of investor
     */
    async balanceOf(_investor, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _investor);
        return this.callContract(FUNCTIONS.BALANCE, _investor, options);
    }
    notifyIssue(callback) {
        this.getEvent(FUNCTIONS.NOTIFYISSUE, callback);
    }
}
exports.default = LiquidityContract;
