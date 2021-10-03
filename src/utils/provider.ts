// SPDX-License-Identifier: BUSL-1.1

"use strict";

import { ethers } from "ethers";
export class Provider extends ethers.providers.JsonRpcProvider {

    constructor(url?: string, network?: string) {
        super(url, network);
    }

    static defaultProvider(network: string) {
        return ethers.providers.getDefaultProvider(network);
    }

    static infuraProvider(network: string, key: string) {
        return new ethers.providers.InfuraProvider(network, key);
    }

    static alchemyProvider(network: string, key: string) {
        return new ethers.providers.AlchemyProvider(network, key);
    }

}