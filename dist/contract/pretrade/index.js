"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const PreTrade_json_1 = require("../../abi/trades/PreTrade.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["REGISTERDEMATACCOUNT"] = "registerDematAccount";
    FUNCTIONS["GETREGISTRATIONREQUESTS"] = "getRegistrationRequests";
    FUNCTIONS["GETREGISTRATIONREQUEST"] = "getRegistrationRequest";
    FUNCTIONS["SETREGISTRATIONSTATUS"] = "setRegistrationStatus";
    FUNCTIONS["REGISTERSECURITIES"] = "registerSecurities";
    FUNCTIONS["GETCONFIRMATIONREQUESTS"] = "getConfirmationRequests";
    FUNCTIONS["GETCONFIRMATIONREQUEST"] = "getConfirmationRequest";
    FUNCTIONS["CONFIRMSECURITIES"] = "confirmSecurities";
    FUNCTIONS["GETSECURITY"] = "getSecurity";
    FUNCTIONS["GETDPID"] = "getDP";
})(FUNCTIONS || (FUNCTIONS = {}));
class PreTradeContract extends index_1.VerifiedContract {
    constructor(signer) {
        const chainId = Object.keys(PreTrade_json_1.networks);
        const address = PreTrade_json_1.networks[chainId].address;
        super(address, JSON.stringify(PreTrade_json_1.abi), signer);
        this.contractAddress = address;
    }
    /**
     * Register demat account [sent by user on PreTrade.sol]
     * @param (bytes32 _currencyCode)
     * @returns Returns nothing.
     */
    async registerDematAccount(_currencyCode, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _currencyCode);
        return this.callContract(FUNCTIONS.REGISTERDEMATACCOUNT, this.sanitiseInput(index_1.DATATYPES.BYTE32, _currencyCode), options);
    }
    /**
     * Get no of registrations [sent by manager on PreTrade.sol, only works if manager’s role is DP]
     * @param (bytes32 _countryCode) external view
     * @returns (bytes32[] memory) array of registration request references
     */
    async getRegistrationRequests(_countryCode, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _countryCode);
        return this.callContract(FUNCTIONS.GETREGISTRATIONREQUESTS, this.sanitiseInput(index_1.DATATYPES.BYTE32, _countryCode), options);
    }
    /**
     * Get registration request for passed registration reference
     * @param (bytes32 _ref)
     * @returns (address user, bytes32 countryCode, bytes32 dematAccountNo, bytes32 DPID, uint registrationDate)
     */
    async getRegistrationRequest(_ref, options) {
        return this.callContract(FUNCTIONS.GETREGISTRATIONREQUEST, _ref, options);
    }
    /**
     * Set registration status [sent by manager on PreTrade.sol, only works if manager’s role is DP]
     * @param (bytes32 _ref, bytes32 _DPID, bytes32 _dematAccountNo)
     * @returns
     */
    async setRegistrationStatus(_ref, _DPID, _dematAccountNo, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _DPID);
        await this.validateInput(index_1.DATATYPES.STRING, _dematAccountNo);
        return this.callContract(FUNCTIONS.SETREGISTRATIONSTATUS, _ref, this.sanitiseInput(index_1.DATATYPES.BYTE32, _DPID), this.sanitiseInput(index_1.DATATYPES.BYTE32, _dematAccountNo), options);
    }
    /**
     * Set registration status [sent by manager on PreTrade.sol, only works if manager’s role is DP]
     * @param ( bytes32 _currencyCode,bytes32 _stype,bytes32 _isin,bytes32 _company,bytes32 _itype, uint _noOfCertificates,  uint _faceValue,bytes32 _lockInReason,uint256 _lockInReleaseDate)
     * @returns
     */
    async registerSecurities(_currencyCode, _stype, _isin, _company, _itype, _noOfCertificates, _faceValue, _lockInReason, _lockInReleaseDate, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _currencyCode);
        await this.validateInput(index_1.DATATYPES.STRING, _stype);
        await this.validateInput(index_1.DATATYPES.STRING, _isin);
        await this.validateInput(index_1.DATATYPES.STRING, _company);
        await this.validateInput(index_1.DATATYPES.STRING, _itype);
        await this.validateInput(index_1.DATATYPES.STRING, _noOfCertificates);
        await this.validateInput(index_1.DATATYPES.STRING, _faceValue);
        await this.validateInput(index_1.DATATYPES.STRING, _lockInReason);
        await this.validateInput(index_1.DATATYPES.STRING, _lockInReleaseDate);
        return this.callContract(FUNCTIONS.REGISTERSECURITIES, this.sanitiseInput(index_1.DATATYPES.BYTE32, _currencyCode), this.sanitiseInput(index_1.DATATYPES.BYTE32, _stype), this.sanitiseInput(index_1.DATATYPES.BYTE32, _isin), this.sanitiseInput(index_1.DATATYPES.BYTE32, _company), this.sanitiseInput(index_1.DATATYPES.BYTE32, _itype), _noOfCertificates, _faceValue, this.sanitiseInput(index_1.DATATYPES.BYTE32, _lockInReason), _lockInReleaseDate, options);
    }
    /**
      * Get no of securities registration requests [sent by manager on PreTrade.sol, only works if manager’s role is DP]
      * @param (bytes32 _countryCode)
      * @returns
      */
    async getConfirmationRequests(_countryCode, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _countryCode);
        return this.callContract(FUNCTIONS.GETCONFIRMATIONREQUESTS, this.sanitiseInput(index_1.DATATYPES.BYTE32, _countryCode), options);
    }
    /**
    * View security registration request [sent by manager on PreTrade.sol, only works if manager’s role is DP]
    * @param (bytes32 _ref)
    * @returns (struct security{  address requestor;
                                  address token;
                                  bytes32 currencyCode;
                                  bytes32 stype;
                                  bytes32 isin;
                                  bytes32 company;
                                  bytes32 itype;
                                  bytes32 lockInReason;
                                  bytes32 approvalStatus;
                                  uint noOfCertificates;
                                  uint lockInReleaseDate;
                                  uint registrationRequestDate;
                                  uint256 faceValue;
                              } )
    */
    async getConfirmationRequest(_ref, options) {
        return this.callContract(FUNCTIONS.GETCONFIRMATIONREQUEST, _ref, options);
    }
    /**
     * Confirm security registration request [sent by manager on PreTrade.sol, only works if manager’s role is DP]
     * @param (address _user, bytes32 _ref, bytes32 _status)
     * @returns
     */
    async confirmSecurities(_user, _ref, _status, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _user);
        await this.validateInput(index_1.DATATYPES.STRING, _status);
        return this.callContract(FUNCTIONS.CONFIRMSECURITIES, _user, _ref, this.sanitiseInput(index_1.DATATYPES.BYTE32, _status), options);
    }
    /**
     * Gets security ISIN, company, token
     * @param _token
     * @param options
     * @returns
     */
    async getSecurity(_token, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _token);
        return this.callContract(FUNCTIONS.GETSECURITY, _token, options);
    }
    /**
     * Get Depositary participant ID for user
     * @param _party
     * @param options
     * @returns
     */
    async getDP(_party, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _party);
        return this.callContract(FUNCTIONS.GETDPID, _party, options);
    }
}
exports.default = PreTradeContract;
