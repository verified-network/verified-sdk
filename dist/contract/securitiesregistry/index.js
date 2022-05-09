"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const SecuritiesRegistry_json_1 = require("../../abi/trades/SecuritiesRegistry.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["GETTOKEN"] = "getToken";
    FUNCTIONS["REGISTERCORPORATEACTION"] = "registerCorporateAction";
    FUNCTIONS["REGISTERCREDITSCORE"] = "registerCreditScore";
    FUNCTIONS["GETPRICE"] = "getPrice";
    FUNCTIONS["GETCORPORATEACTION"] = "getCorporateActions";
    FUNCTIONS["GETCREDITSCORE"] = "getCreditScore";
    FUNCTIONS["GETINVESTEDSECURITIES"] = "getSecuritiesInvested";
    FUNCTIONS["GETSECURITYDETAILS"] = "getSecurityDetails";
    FUNCTIONS["CREATESECURITY"] = "createSecurity";
    FUNCTIONS["GETISSUEDSECURITIES"] = "getSecuritiesIssued";
})(FUNCTIONS || (FUNCTIONS = {}));
class SecuritiesRegistryContract extends index_1.VerifiedContract {
    constructor(signer) {
        const chainId = signer.provider._network.chainId.toString();
        const address = SecuritiesRegistry_json_1.networks[chainId].address;
        super(address, JSON.stringify(SecuritiesRegistry_json_1.abi), signer);
        this.contractAddress = address;
    }
    /**
     * Register demat account [sent by user on PreTrade.sol]
     * @param (bytes32 _currency, bytes32 _company, bytes32 _isin)
     * @returns Returns nothing. Ensure _countryCode maps to http://country.io/names.json
     */
    async getToken(_currency, _company, _isin, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _currency);
        await this.validateInput(index_1.DATATYPES.STRING, _company);
        await this.validateInput(index_1.DATATYPES.STRING, _isin);
        return this.callContract(FUNCTIONS.GETTOKEN, this.sanitiseInput(index_1.DATATYPES.BYTE32, _currency), this.sanitiseInput(index_1.DATATYPES.BYTE32, _company), this.sanitiseInput(index_1.DATATYPES.BYTE32, _isin), options);
    }
    /**
     * Registers corporate action. Can only be involved by issuer - company or registrar/DP
     * @param _category category of corporate action
     * @param _action corporate action passed as string
     * @param _isin isin number of financial instrument issued
     * @param options
     * @returns
     */
    async registerCorporateAction(_category, _action, _isin, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _category);
        await this.validateInput(index_1.DATATYPES.STRING, _action);
        await this.validateInput(index_1.DATATYPES.STRING, _isin);
        return this.callContract(FUNCTIONS.REGISTERCORPORATEACTION, _category, _action, this.sanitiseInput(index_1.DATATYPES.BYTE32, _isin), options);
    }
    /**
     * Registers credit score of issuer. Can only be called by the admin contract on the Verified Network.
     * @param _score credit score
     * @param _company company whose score is reported
     * @param _isin isin of financial instrument which is credit scored
     * @param options
     * @returns
     */
    async registerCreditScore(_score, _company, _isin, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _score);
        await this.validateInput(index_1.DATATYPES.STRING, _company);
        await this.validateInput(index_1.DATATYPES.STRING, _isin);
        return this.callContract(FUNCTIONS.REGISTERCREDITSCORE, this.sanitiseInput(index_1.DATATYPES.BYTE32, _score), this.sanitiseInput(index_1.DATATYPES.BYTE32, _company), this.sanitiseInput(index_1.DATATYPES.BYTE32, _isin), options);
    }
    /**
     * Gets corporate action.
     * @param _category category of corporate action
     * @param _isin financial instrument for which corporate action is to be fetched
     * @param options
     * @returns
     */
    async getCorporateActions(_category, _isin, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _category);
        await this.validateInput(index_1.DATATYPES.STRING, _isin);
        return this.callContract(FUNCTIONS.GETCORPORATEACTION, this.sanitiseInput(index_1.DATATYPES.BYTE32, _isin), _category, options);
    }
    /**
     * Gets credit score
     * @param _company company whose score is to be fetched
     * @param _isin financial instrument whose score is to be fetched
     * @param options
     * @returns
     */
    async getCreditScore(_company, _isin, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _company);
        await this.validateInput(index_1.DATATYPES.STRING, _isin);
        return this.callContract(FUNCTIONS.GETCREDITSCORE, this.sanitiseInput(index_1.DATATYPES.BYTE32, _company), this.sanitiseInput(index_1.DATATYPES.BYTE32, _isin), options);
    }
    /**
     * Gets price of financial instrument
     * @param _isin identifier of financial instrument
     * @param options
     * @returns
     */
    async getPrice(_isin, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _isin);
        return this.callContract(FUNCTIONS.GETPRICE, this.sanitiseInput(index_1.DATATYPES.BYTE32, _isin), options);
    }
    /**
     * Gets securities invested by message sender
     * @param options
     * @returns array of addresses of security tokens
     */
    async getSecuritiesInvested(options) {
        return this.callContract(FUNCTIONS.GETINVESTEDSECURITIES);
    }
    /**
     * Gets securities issued
     * @param options
     * @returns array of addresses of security tokens
     */
    async getSecuritiesIssued(options) {
        return this.callContract(FUNCTIONS.GETISSUEDSECURITIES);
    }
    /**
     * Fetches details of a security token {bytes32 company, bytes32 currency, bytes32 isin, bytes32 creditScore, bytes16 price, address issuer}
     * @param _security address of security token returned by getSecuritiesInvested() function
     * @param options
     * @returns
     */
    async getSecurityDetails(_security, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _security);
        return this.callContract(FUNCTIONS.GETSECURITYDETAILS, _security, options);
    }
    /**
     * Creates a security which is either a secondary issue (created by the PreTrade contract) or a primary issue (created by the Issues contract)
     * @param _issuer
     * @param _security
     * @param _currency
     * @param _company
     * @param _isin
     * @param _settlementBy is either "DP" or "STP", DP settlements need to be confirmed by issuers while STP settlements are native tokens that do not require issuer confirmations
     * @param options
     * @returns
     */
    async createSecurity(_issuer, _security, _currency, _company, _isin, _settlementBy, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _issuer);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _security);
        await this.validateInput(index_1.DATATYPES.STRING, _currency);
        await this.validateInput(index_1.DATATYPES.STRING, _company);
        await this.validateInput(index_1.DATATYPES.STRING, _isin);
        await this.validateInput(index_1.DATATYPES.STRING, _settlementBy);
        return this.callContract(FUNCTIONS.CREATESECURITY, _issuer, _security, this.sanitiseInput(index_1.DATATYPES.BYTE32, _currency), this.sanitiseInput(index_1.DATATYPES.BYTE32, _company), this.sanitiseInput(index_1.DATATYPES.BYTE32, _isin), this.sanitiseInput(index_1.DATATYPES.BYTE32, _settlementBy), options);
    }
}
exports.default = SecuritiesRegistryContract;
