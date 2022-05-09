// SPDX-License-Identifier: BUSL-1.1
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = void 0;
const ethers_1 = require("ethers");
class Provider extends ethers_1.ethers.providers.JsonRpcProvider {
    constructor(url, network) {
        super(url, network);
    }
    static defaultProvider(network) {
        return ethers_1.ethers.providers.getDefaultProvider(network);
    }
    static infuraProvider(network, key) {
        return new ethers_1.ethers.providers.InfuraProvider(network, key);
    }
    static alchemyProvider(network, key) {
        return new ethers_1.ethers.providers.AlchemyProvider(network, key);
    }
}
exports.Provider = Provider;
