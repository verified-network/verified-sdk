"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const Security_json_1 = require("../../../abi/deposits/Security.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["SETSIGNER"] = "setSigner";
    FUNCTIONS["ADDBALANCE"] = "addToBalance";
    FUNCTIONS["TRANSFERBALANCE"] = "transferBalance";
    FUNCTIONS["SECURITIESADDED"] = "securitiesAdded";
})(FUNCTIONS || (FUNCTIONS = {}));
class VerifiedSecurity extends index_1.VerifiedContract {
    constructor(signer) {
        const chainId = signer.provider._network.chainId.toString();
        const address = Security_json_1.networks[chainId].address;
        super(address, JSON.stringify(Security_json_1.abi), signer);
        this.contractAddress = address;
    }
    /**
        Sets signer to verify bridge
        @param  _signer  address of signer that can only be set by owner of bridge
     */
    async setSigner(_signer, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _signer);
        return this.callContract(FUNCTIONS.SETSIGNER, _signer, options);
    }
    async addToBalance(_isin, _amount, _tokenHolder, _currency, _hashedMessage, _v, _r, _s, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _tokenHolder);
        await this.validateInput(index_1.DATATYPES.NUMBER, _amount);
        return this.callContract(FUNCTIONS.ADDBALANCE, this.sanitiseInput(index_1.DATATYPES.BYTE32, _isin), _amount, _tokenHolder, this.sanitiseInput(index_1.DATATYPES.BYTE32, _currency), _hashedMessage, _v, _r, _s, options);
    }
    async transferBalance(_isin, _transferor, _amount, _transferee, _currency, _hashedMessage, _v, _r, _s, options) {
        await this.validateInput(index_1.DATATYPES.ADDRESS, _transferee);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _transferor);
        await this.validateInput(index_1.DATATYPES.NUMBER, _amount);
        return this.callContract(FUNCTIONS.TRANSFERBALANCE, this.sanitiseInput(index_1.DATATYPES.BYTE32, _isin), _transferor, _amount, _transferee, this.sanitiseInput(index_1.DATATYPES.BYTE32, _currency), _hashedMessage, _v, _r, _s, options);
    }
    notifySecuritiesAdded(callback) {
        this.getEvent(FUNCTIONS.SECURITIESADDED, callback);
    }
}
exports.default = VerifiedSecurity;
