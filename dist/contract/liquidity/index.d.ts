import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
export default class LiquidityContract extends VerifiedContract {
    contractAddress: string;
    constructor(signer: VerifiedWallet, contractNetworkAddress: string);
    /**
        Creates supply of the Verified Liquidity token after initial issue with constructor defined parameters
        @param  _supply total supply of VITTA
        @param  _cap    investment limit for each investor
        @param  _limit  time limit for issue close
     */
    createSupply(_cap: string, _limit: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    /**
        Specifies list of supported tokens that can be invested in the Verified Liquidity token
        @param  _tokens array of supported token addresses
     */
    supportTokens(_tokens: string, _name: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    /**
        Checks if a specified token is supported for investing in the Verified Liquidity token
        @param  _token  token that is supported for investment
     */
    checkSupportForToken(_token: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    /**
        Removes support for token for investing in the Verified Liquidity token
        @param  _token  token that is supported for investment
     */
    removeToken(_token: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    /**
     * Returns list of supported liquidity tokens (eg, VITTA, USDC, DAI)
     * @returns array of struct of tokens
     */
    getSupportedTokens(): any;
    /**
        Registers a liquidity platform (eg, DEX) where Verified Liquidity tokens can be used to underwrite investments
        @param  _liquidityPlatform  address of the market making platform
     */
    registerPlatform(_platform: string, _name: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    /**
        Used by external apps (eg, exchange, wallet) to buy Verified Liquidity token
        @param  _token  address of token used by investor to buy the VITTA
        @param  _amount amount of token that is transferred from investor to this VITTA issuing contract's account for the investor
     */
    buy(_token: string, _amount: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    /**
        Fetches investors in VITTA
     */
    getInvestors(): any;
    /**
        Fetches registered platforms
     */
    getPlatforms(): any;
    /**
        Fetches investment detail for specific investor in VITTA
        @param  _investor   address of investor
        @param  _token      address of token invested by investor
     */
    getInvestment(_investor: string, _token: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    /**
        Used by Issuers (eg, asset managers) to issue VITTA to investors or refund paid in tokens to investors if investment cap is breached
        @param  _investor       address of investor
        @param  _token          address of token invested in VITTA
        @param  _tokenAmount    amount of token invested in VITTA
        @param  _LPToIssue      amount of VITTA to issue to investor
     */
    issue(_investor: string, _token: string, _tokenAmount: string, _LPToIssue: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    /**
        Used by VITTA holder to stake it for providing liquidity for underwriting investments
        @param  _toStake    amount of VITTA to stake
     */
    stake(_toStake: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    /**
        Used by VITTA holder to withdraw staked liquidity for underwriting investments
        @param  _fromStake    amount of VITTA staked
     */
    withdraw(_fromStake: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    /**
        Pay out of income to VITTA Liquidity providers
        @param  _distribution   amount of VITTA to mint and distribute pro rata to liquidity providers
        @param  _platform       address of liquidity platform
     */
    payOut(_distribution: string, _platform: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    /**
     * Adds asset manager to manage liquidity
     * @param _platform address of market making platform (eg Balancer)
     * @param _manager  address of asset manager
     * @param options
     * @returns         none
     */
    addManager(_platform: string, _manager: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    /**
     * Removes asset manager managing liquidity
     * @param _platform address of market making platform (eg Balancer)
     * @param _manager  address of asset manager
     * @param options
     * @returns         none
     */
    removeManager(_platform: string, _manager: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    /**
     * Fetches asset managers
     * @param _platform address of market making platform
     * @param options
     * @returns         array of asset manager addresses
     */
    getManagers(_platform: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    /**
     * Gets return on investment performance of market making platform
     * @param _platform address of market making platform
     * @param options
     * @returns         uint256 unstakedLiquidity,
                        uint256 balancePlatformLiquidity,
                        uint256 platformLiquidityProvided,
                        uint256 platformCommissionsEarned
     */
    getPlatformPerformance(_platform: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    /**
     * Gets return on investment performance for asset manager
     * @param _platform address of market making platform (eg Balancer)
     * @param _manager  address of asset manager
     * @param options
     * @returns         uint256 managerLiquidityProvided,
                        uint256 managerCommissionsEarned
     */
    getManagerPerformance(_platform: string, _token: string, _manager: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    /**
     * Provides liquidity to asset managers on platform
     * @param _platform     address of market making platform
     * @param _manager      address of asset manager
     * @param _liquidity    amount of liquidity to provision to asset manager on platform
     * @param options
     * @returns             none
     */
    provideLiquidity(_platform: string, _manager: string, _liquidity: string, _token: string, _tokenAmount: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    /**
     * Fetches balance of investor
     * @param _investor address of investor
     * @param options
     * @returns         balance of investor
     */
    balanceOf(_investor: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    notifyIssue(callback: any): object;
}
