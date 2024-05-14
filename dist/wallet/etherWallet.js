// SPDX-License-Identifier: BUSL-1.1
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EtherWallet = void 0;
const ethers_1 = require("ethers");
const properties_1 = require("@ethersproject/properties");
const hdnode_1 = require("@ethersproject/hdnode");
class EtherWallet extends ethers_1.ethers.Wallet {
    constructor(privateKey, provider) {
        super(privateKey, provider);
    }
    static parseMnemonics(mnemonic, path) {
        if (!path) {
            path = hdnode_1.defaultPath;
        }
        return hdnode_1.HDNode.fromMnemonic(mnemonic).derivePath(path);
    }
    setMnemonics(srcMnemonic) {
        (0, properties_1.defineReadOnly)(this, "_mnemonic", () => ({
            phrase: srcMnemonic.phrase,
            path: srcMnemonic.path || hdnode_1.defaultPath,
            locale: srcMnemonic.locale || "en"
        }));
    }
}
exports.EtherWallet = EtherWallet;
