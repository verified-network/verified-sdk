import { VerifiedContract } from '../../index';
import { VerifiedWallet } from "../../../wallet";
export default class PrimaryIssueManager extends VerifiedContract {
    contractAddress: string;
    constructor(signer: VerifiedWallet, platformAddress: string, platform: string);
    offer(owned: string, isin: string, offered: string, tomatch: string, desired: string, min: string, issuer: string, docs: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    /**
     * Lets issuer or manager set minimum order size for issue
     * @param owner         address of issuer
     * @param offered       address of security issued
     * @param tomatch       address of currency paired
     * @param ordersize     minimum order value
     * @param options
     * @returns
     */
    setOfferTerms(owner: string, offered: string, tomatch: string, ordersize: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    setIssuingFee(owner: string, offered: string, tomatch: string, swapfee: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    /**
     * Gets security tokens offered for passed token parameter
     * @param offered   address of liquidity token offered by asset manager
     * @param options
     * @returns         array of structs of security tokens matching with offered liquidity token
     */
    getOffered(offered: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    /**
     * Gets offer made previously with offered token and token to match
     * @param offered address of offered token
     * @param tomatch address of token to match
     * @param options
     * @returns       token struct
     */
    getOfferMade(offered: string, tomatch: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    /**
     * Gets allotted liquidity stake for caller (asset manager) that is available to invest
     * @param options
     * @returns         amount of available liquidity for caller (asset manager)
     */
    getAllotedStake(offered: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    /**
     * Gets liquidity providers for a security token offering
     * @param security  address of security token
     * @param options
     * @returns         array of structs of liquidity providers
     */
    getLiquidityProviders(security: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    issue(security: string, cutoffTime: string, issuer: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    getSubscribers(poolId: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    close(security: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    accept(poolid: string, investor: string, amnt: string, asset: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    reject(poolid: string, investor: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    settle(poolId: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
}
