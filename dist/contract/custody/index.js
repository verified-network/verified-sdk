"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const Vault_json_1 = require("../../abi/custody/Vault.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["CREATEVAULT"] = "createVault";
    FUNCTIONS["GETVAULTS"] = "getVaults";
    FUNCTIONS["TRANSFERVAULT"] = "transferVault";
    FUNCTIONS["GETCREATOR"] = "getCreator";
    FUNCTIONS["ADDPARTICIPANT"] = "addParticipant";
    FUNCTIONS["REMOVEPARTICIPANT"] = "removeParticipant";
    FUNCTIONS["CONFIRMPARTICIPANT"] = "confirmParticipant";
    FUNCTIONS["DEFINEQUORUM"] = "defineQuorum";
    FUNCTIONS["PROMPTSIGNATURES"] = "promptSignatures";
    FUNCTIONS["SIGNTRANSACTION"] = "signTransaction";
    FUNCTIONS["CHECKQUORUM"] = "checkQuorum";
    FUNCTIONS["GETSHARDS"] = "getShards";
    FUNCTIONS["NEWPARTICIPANT"] = "NewParticipant";
    FUNCTIONS["NEWTRANSACTION"] = "NewTransaction";
    FUNCTIONS["SIGNATURE"] = "SignTransaction";
})(FUNCTIONS || (FUNCTIONS = {}));
class Custody extends index_1.VerifiedContract {
    constructor(signer, contractNetworkAddress) {
        const address = contractNetworkAddress;
        super(address, JSON.stringify(Vault_json_1.abi), signer);
        this.contractAddress = address;
    }
    async createVault(_creator, _id, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _creator);
        await this.validateInput(index_1.DATATYPES.STRING, _id);
        return this.callContract(FUNCTIONS.CREATEVAULT, this.sanitiseInput(index_1.DATATYPES.BYTE32, _creator), _id, options);
    }
    async getVaults() {
        return this.callContract(FUNCTIONS.GETVAULTS);
    }
    async transferVault(_creator, _id, _transferee, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _creator);
        await this.validateInput(index_1.DATATYPES.STRING, _id);
        await this.validateInput(index_1.DATATYPES.ADDRESS, _transferee);
        return this.callContract(FUNCTIONS.TRANSFERVAULT, this.sanitiseInput(index_1.DATATYPES.BYTE32, _creator), _id, _transferee, options);
    }
    async getCreator(_creator, _pin, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _creator);
        await this.validateInput(index_1.DATATYPES.NUMBER, _pin);
        return this.callContract(FUNCTIONS.GETCREATOR, this.sanitiseInput(index_1.DATATYPES.BYTE32, _creator), _pin, options);
    }
    async addParticipant(_creator, _id, _participant, _shard, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _creator);
        await this.validateInput(index_1.DATATYPES.STRING, _id);
        await this.validateInput(index_1.DATATYPES.STRING, _participant);
        await this.validateInput(index_1.DATATYPES.STRING, _shard);
        return this.callContract(FUNCTIONS.ADDPARTICIPANT, this.sanitiseInput(index_1.DATATYPES.BYTE32, _creator), _id, this.sanitiseInput(index_1.DATATYPES.BYTE32, _participant), _shard, options);
    }
    async removeParticipant(_creator, _id, _participant, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _creator);
        await this.validateInput(index_1.DATATYPES.STRING, _id);
        await this.validateInput(index_1.DATATYPES.STRING, _participant);
        return this.callContract(FUNCTIONS.REMOVEPARTICIPANT, this.sanitiseInput(index_1.DATATYPES.BYTE32, _creator), _id, this.sanitiseInput(index_1.DATATYPES.BYTE32, _participant), options);
    }
    async confirmParticipant(_creator, _id, _participant, _pin, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _creator);
        await this.validateInput(index_1.DATATYPES.STRING, _id);
        await this.validateInput(index_1.DATATYPES.STRING, _participant);
        await this.validateInput(index_1.DATATYPES.NUMBER, _pin);
        return this.callContract(FUNCTIONS.CONFIRMPARTICIPANT, this.sanitiseInput(index_1.DATATYPES.BYTE32, _creator), _id, this.sanitiseInput(index_1.DATATYPES.BYTE32, _participant), _pin, options);
    }
    async defineQuorum(_creator, _id, _minParticipants, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _creator);
        await this.validateInput(index_1.DATATYPES.STRING, _id);
        await this.validateInput(index_1.DATATYPES.NUMBER, _minParticipants);
        return this.callContract(FUNCTIONS.DEFINEQUORUM, this.sanitiseInput(index_1.DATATYPES.BYTE32, _creator), _id, _minParticipants, options);
    }
    async promptSignatures(_creator, _id, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _creator);
        await this.validateInput(index_1.DATATYPES.STRING, _id);
        return this.callContract(FUNCTIONS.PROMPTSIGNATURES, this.sanitiseInput(index_1.DATATYPES.BYTE32, _creator), _id, options);
    }
    async signTransaction(_creator, _id, _participant, _tx, _pin, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _creator);
        await this.validateInput(index_1.DATATYPES.STRING, _id);
        await this.validateInput(index_1.DATATYPES.STRING, _participant);
        await this.validateInput(index_1.DATATYPES.STRING, _tx);
        await this.validateInput(index_1.DATATYPES.NUMBER, _pin);
        return this.callContract(FUNCTIONS.SIGNTRANSACTION, this.sanitiseInput(index_1.DATATYPES.BYTE32, _creator), _id, this.sanitiseInput(index_1.DATATYPES.BYTE32, _participant), _tx, _pin, options);
    }
    async checkQuorum(_creator, _id, _participant, _txid, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _creator);
        await this.validateInput(index_1.DATATYPES.STRING, _id);
        await this.validateInput(index_1.DATATYPES.STRING, _participant);
        await this.validateInput(index_1.DATATYPES.STRING, _txid);
        return this.callContract(FUNCTIONS.CHECKQUORUM, this.sanitiseInput(index_1.DATATYPES.BYTE32, _creator), _id, this.sanitiseInput(index_1.DATATYPES.BYTE32, _participant), _txid, options);
    }
    async getShards(_creator, _id, _txid, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _creator);
        await this.validateInput(index_1.DATATYPES.STRING, _id);
        await this.validateInput(index_1.DATATYPES.STRING, _txid);
        return this.callContract(FUNCTIONS.GETSHARDS, this.sanitiseInput(index_1.DATATYPES.BYTE32, _creator), _id, _txid, options);
    }
    notifyNewParticipant(callback) {
        this.getEvent(FUNCTIONS.NEWPARTICIPANT, callback);
    }
    notifyNewTransaction(callback) {
        this.getEvent(FUNCTIONS.NEWTRANSACTION, callback);
    }
    notifySignTransaction(callback) {
        this.getEvent(FUNCTIONS.SIGNATURE, callback);
    }
}
exports.default = Custody;
