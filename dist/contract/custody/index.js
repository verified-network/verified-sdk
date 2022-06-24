"use strict";
// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const Vault_json_1 = require("../../abi/custody/Vault.json");
var FUNCTIONS;
(function (FUNCTIONS) {
    FUNCTIONS["CREATEVAULT"] = "createVault";
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
class CustodyContract extends index_1.VerifiedContract {
    constructor(signer) {
        const chainId = Object.keys(Vault_json_1.networks);
        const address = Vault_json_1.networks[chainId].address;
        super(address, JSON.stringify(Vault_json_1.abi), signer);
        this.contractAddress = address;
    }
    async createVault(_creator, _id, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _creator);
        await this.validateInput(index_1.DATATYPES.STRING, _id);
        return this.callContract(FUNCTIONS.CREATEVAULT, this.sanitiseInput(index_1.DATATYPES.BYTE32, _creator), _id, options);
    }
    async getCreator(_creator, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _creator);
        return this.callContract(FUNCTIONS.GETCREATOR, this.sanitiseInput(index_1.DATATYPES.BYTE32, _creator), options);
    }
    async addParticipant(_creator, _participant, _shard, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _creator);
        await this.validateInput(index_1.DATATYPES.STRING, _participant);
        await this.validateInput(index_1.DATATYPES.STRING, _shard);
        return this.callContract(FUNCTIONS.ADDPARTICIPANT, this.sanitiseInput(index_1.DATATYPES.BYTE32, _creator), this.sanitiseInput(index_1.DATATYPES.BYTE32, _participant), _shard, options);
    }
    async removeParticipant(_creator, _participant, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _creator);
        await this.validateInput(index_1.DATATYPES.STRING, _participant);
        return this.callContract(FUNCTIONS.REMOVEPARTICIPANT, this.sanitiseInput(index_1.DATATYPES.BYTE32, _creator), this.sanitiseInput(index_1.DATATYPES.BYTE32, _participant), options);
    }
    async confirmParticipant(_creator, _participant, _pin, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _creator);
        await this.validateInput(index_1.DATATYPES.STRING, _participant);
        return this.callContract(FUNCTIONS.CONFIRMPARTICIPANT, this.sanitiseInput(index_1.DATATYPES.BYTE32, _creator), this.sanitiseInput(index_1.DATATYPES.BYTE32, _participant), _pin, options);
    }
    async defineQuorum(_creator, _minParticipants, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _creator);
        await this.validateInput(index_1.DATATYPES.NUMBER, _minParticipants);
        return this.callContract(FUNCTIONS.DEFINEQUORUM, this.sanitiseInput(index_1.DATATYPES.BYTE32, _creator), _minParticipants, options);
    }
    async promptSignatures(_creator, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _creator);
        return this.callContract(FUNCTIONS.PROMPTSIGNATURES, this.sanitiseInput(index_1.DATATYPES.BYTE32, _creator), options);
    }
    async signTransaction(_creator, _participant, _tx, _pin, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _creator);
        await this.validateInput(index_1.DATATYPES.STRING, _participant);
        return this.callContract(FUNCTIONS.SIGNTRANSACTION, this.sanitiseInput(index_1.DATATYPES.BYTE32, _creator), this.sanitiseInput(index_1.DATATYPES.BYTE32, _participant), _tx, _pin, options);
    }
    async checkQuorum(_creator, _participant, _txid, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _creator);
        await this.validateInput(index_1.DATATYPES.STRING, _participant);
        await this.validateInput(index_1.DATATYPES.STRING, _txid);
        return this.callContract(FUNCTIONS.CHECKQUORUM, this.sanitiseInput(index_1.DATATYPES.BYTE32, _creator), this.sanitiseInput(index_1.DATATYPES.BYTE32, _participant), _txid, options);
    }
    async getShards(_creator, _txid, options) {
        await this.validateInput(index_1.DATATYPES.STRING, _creator);
        await this.validateInput(index_1.DATATYPES.STRING, _txid);
        return this.callContract(FUNCTIONS.GETSHARDS, this.sanitiseInput(index_1.DATATYPES.BYTE32, _creator), _txid, options);
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
exports.default = CustodyContract;
