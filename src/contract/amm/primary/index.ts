// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../../index';
import { VerifiedWallet } from "../../../wallet";
import { abi as abiBalancer } from '../../../abi/assetmanager/balancer/PrimaryIssueManager.json';
import { abi as abiKyber } from '../../../abi/assetmanager/kyber/PrimaryIssueManager.json';

enum FUNCTIONS {
    OFFER = 'offer',
    OFFERTERMS = 'setOfferTerms',
    GETOFFERED = 'getOffered',
    GETOFFERMADE = 'getOfferMade',
    GETALLOTTEDSTAKE = 'getAllotedStake',
    GETLIQUIDITYPROVIDERS = 'getLiquidityProviders',
    ISSUE = 'issue',
    ONSUBSCRIPTION = 'onSubscription',
    SUBSCRIBE = 'subscribe',
    GETSUBSCRIBERS = 'getSubscribers',
    CLOSE = 'close',
    ACCEPT = 'accept',
    REJECT = 'reject',
    SETTLE = 'settle'
}

export default class PrimaryIssueManager extends VerifiedContract {
    public contractAddress: string
    constructor(signer: VerifiedWallet, platformAddress: string, platform: string) {

        const address = platformAddress
        if(platform=="balancer")
            super(address, JSON.stringify(abiBalancer), signer)
        else if(platform=="kyber")
            super(address, JSON.stringify(abiKyber), signer)

        this.contractAddress = address
    }

    public async offer( owned: string, 
                        isin: string, 
                        offered:string, 
                        tomatch:string, 
                        desired:string, 
                        min:string, 
                        issuer: string,
                        docs: string,
                        // _hashedMessage: string,
                        // _v: string,
                        // _r: string,
                        // _s: string,
                        options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, owned);
        await this.validateInput(DATATYPES.ADDRESS, tomatch);
        await this.validateInput(DATATYPES.ADDRESS, issuer);
        await this.validateInput(DATATYPES.STRING, isin);
        await this.validateInput(DATATYPES.STRING, docs);
        await this.validateInput(DATATYPES.NUMBER, offered);
        await this.validateInput(DATATYPES.NUMBER, desired);
        await this.validateInput(DATATYPES.NUMBER, min);
        return this.callContract(FUNCTIONS.OFFER, owned, this.sanitiseInput(DATATYPES.BYTE32, isin), offered, tomatch, desired, min, issuer, docs,
                                    /*_hashedMessage, _v, _r, _s,*/ options);
    }

    /**
     * Lets issuer or manager set minimum order size for issue
     * @param owner         address of issuer
     * @param offered       address of security issued
     * @param tomatch       address of currency paired
     * @param ordersize     minimum order value
     * @param options       
     * @returns 
     */
    public async setOfferTerms(owner: string, offered: string, tomatch: string, ordersize: string, 
                                _hashedMessage: string,
                                _v: string,
                                _r: string,
                                _s: string,
                                options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, owner);
        await this.validateInput(DATATYPES.ADDRESS, offered);
        await this.validateInput(DATATYPES.ADDRESS, tomatch);
        await this.validateInput(DATATYPES.NUMBER, ordersize);
        return this.callContract(FUNCTIONS.OFFERTERMS, owner, offered, tomatch, ordersize, _hashedMessage, _v, _r, _s, options);
    }

    /**
     * Gets security tokens offered for passed token parameter
     * @param offered   address of liquidity token offered by asset manager 
     * @param options 
     * @returns         array of structs of security tokens matching with offered liquidity token 
     */
    public async getOffered(offered: string, options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, offered);
        return this.callContract(FUNCTIONS.GETOFFERED, offered, options);
    }

    /**
     * Gets offer made previously with offered token and token to match
     * @param offered address of offered token
     * @param tomatch address of token to match
     * @param options 
     * @returns       token struct
     */
    public async getOfferMade(offered: string, tomatch: string, options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, offered);
        await this.validateInput(DATATYPES.ADDRESS, tomatch);
        return this.callContract(FUNCTIONS.GETOFFERMADE, offered, tomatch, options);
    }

    /**
     * Gets allotted liquidity stake for caller (asset manager) that is available to invest
     * @param options 
     * @returns         amount of available liquidity for caller (asset manager)
     */
    public async getAllotedStake(offered: string, options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, offered);
        return this.callContract(FUNCTIONS.GETALLOTTEDSTAKE, offered, options);
    }

    /**
     * Gets liquidity providers for a security token offering
     * @param security  address of security token 
     * @param options 
     * @returns         array of structs of liquidity providers 
     */
    public async getLiquidityProviders(security: string, 
                                        //_hashedMessage: string,
                                        //_v: string,
                                        //_r: string,
                                        //_s: string,
                                        options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, security);
        return this.callContract(FUNCTIONS.GETLIQUIDITYPROVIDERS, security, 
                                //_hashedMessage, _v, _r, _s, 
                                options);
    }

    public async issue( security: string, 
                        cutoffTime: string,
                        issuer: string,
                        _hashedMessage: string,
                        _v: string,
                        _r: string,
                        _s: string,
                        options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, security);
        await this.validateInput(DATATYPES.ADDRESS, issuer);
        await this.validateInput(DATATYPES.NUMBER, cutoffTime);
        return this.callContract(FUNCTIONS.ISSUE, security, cutoffTime, issuer, _hashedMessage, _v, _r, _s, options);
    }

    public async onSubscription( pool: string, 
                                _hashedMessage: string,
                                _v: string,
                                _r: string,
                                _s: string,
                                options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, pool);
        return this.callContract(FUNCTIONS.ONSUBSCRIPTION, pool, _hashedMessage, _v, _r, _s, options);
    }

    public async subscribe( security: string, 
                            asset: string, 
                            assetName : string, 
                            amount: string, 
                            investor: string, 
                            price: string, 
                            paidIn: string, 
                            _hashedMessage: string, 
                            _v: string, 
                            _r: string, 
                            _s: string,
                            options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, security);
        await this.validateInput(DATATYPES.ADDRESS, asset);
        await this.validateInput(DATATYPES.STRING, assetName);
        await this.validateInput(DATATYPES.ADDRESS, investor);
        await this.validateInput(DATATYPES.NUMBER, amount);
        await this.validateInput(DATATYPES.NUMBER, price);
        await this.validateInput(DATATYPES.STRING, paidIn);
        return this.callContract(FUNCTIONS.SUBSCRIBE, security, asset, assetName, amount, investor, price, paidIn, _hashedMessage, _v, _r, _s, options);
    }

    public async getSubscribers(poolId: string, 
                                _hashedMessage: string,
                                _v: string,
                                _r: string,
                                _s: string,
                                options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.STRING, poolId);
        return this.callContract(FUNCTIONS.GETSUBSCRIBERS, poolId, _hashedMessage, _v, _r, _s, options);
    }

    public async close( security: string, 
                        redeem: string,
                        _hashedMessage: string,
                        _v: string,
                        _r: string,
                        _s: string,
                        options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, security);
        return this.callContract(FUNCTIONS.CLOSE, security, redeem, _hashedMessage, _v, _r, _s, options);
    }

    public async accept(poolid: string, 
                        investor: string,
                        amnt: string,
                        asset: string,
                        _hashedMessage: string,
                        _v: string,
                        _r: string,
                        _s: string,
                        options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, investor);
        await this.validateInput(DATATYPES.ADDRESS, asset);
        await this.validateInput(DATATYPES.NUMBER, amnt);
        await this.validateInput(DATATYPES.STRING, poolid);
        return this.callContract(FUNCTIONS.ACCEPT, poolId, investor, amnt, asset, _hashedMessage, _v, _r, _s, options);
    }    

    public async reject(poolid: string, 
                        investor: string,
                        _hashedMessage: string,
                        _v: string,
                        _r: string,
                        _s: string,
                        options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.ADDRESS, investor);
        await this.validateInput(DATATYPES.STRING, poolid);
        return this.callContract(FUNCTIONS.REJECT, poolId, investor, _hashedMessage, _v, _r, _s, options);
    }  

    public async settle(poolId: string, 
                        _hashedMessage: string,
                        _v: string,
                        _r: string,
                        _s: string,
                        options?: { gasPrice, gasLimit }): any {
        await this.validateInput(DATATYPES.STRING, poolId);
        return this.callContract(FUNCTIONS.SETTLE, this.sanitiseInput(DATATYPES.BYTE32, poolId), _hashedMessage, _v, _r, _s, options);
    }
}