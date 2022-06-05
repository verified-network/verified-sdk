"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const PostTrade_json_1 = require("../../abi/trades/PostTrade.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["GETSETTLEMENTREQUESTS"] = "getSettlementRequests";
    FUNCTIONS["GETSETTLEMENTREQUEST"] = "getSettlementRequest";
    FUNCTIONS["SETSETTLEMENTSTATUS"] = "setSettlementStatus";
})(FUNCTIONS || (FUNCTIONS = {}));
class PostTradeContract extends index_1.VerifiedContract {
    constructor(signer) {
        const chainId = Object.keys(PostTrade_json_1.networks);
        const address = PostTrade_json_1.networks[chainId].address;
        super(address, JSON.stringify(PostTrade_json_1.abi), signer);
        this.contractAddress = address;
    }
    /**
     * Get settlement requests [callable by manager on PostTrade.sol]
     * @param (bytes32 dpid)
     * @returns (bytes32[] of trade references)
     */
    async getSettlementRequests(_dpid, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _dpid);
        return this.callContract(FUNCTIONS.GETSETTLEMENTREQUESTS, this.sanitiseInput(index_1.DATATYPES.BYTE32, _dpid), options);
    }
    /**
     * Get settlement request [callable by manager on PostTrade.sol]
     * @param (bytes32 _ref)
     * @returns (struct settlement{  address transferor;
                        address transferee;
                        address security;
                        bytes32 securityName;
                        bytes32 status;
                        bytes32 transferorDPID;
                        bytes32 transfereeDPID;
                        bytes32 isin;
                        bytes32 company;
                        bytes32 currency;
                        uint256 price;
                        uint256 consideration;
                        uint256 unitsToTransfer;
                        uint256 executionDate;
                    } )
     */
    async getSettlementRequest(_ref, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _ref);
        return this.callContract(FUNCTIONS.GETSETTLEMENTREQUEST, _ref, options);
    }
    /**
     * Set settlement status [callable by manager on PostTrade.sol]
     * @param (bytes32 _ref, bytes32 SettlementStatus which can be 'Confirm' or 'Reject')
     * @returns
     */
    async setSettlementStatus(_ref, _settlementStatus, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _ref);
        await this.validateInput(index_1.DATATYPES.STRING, _settlementStatus);
        return this.callContract(FUNCTIONS.SETSETTLEMENTSTATUS, _ref, this.sanitiseInput(index_1.DATATYPES.BYTE32, _settlementStatus), options);
    }
}
exports.default = PostTradeContract;
