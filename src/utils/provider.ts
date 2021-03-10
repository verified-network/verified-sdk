"use strict";

import { ethers } from "ethers";



export class Provider extends ethers.providers.JsonRpcProvider {
    
    constructor(url?: string, network?: string) {
        super(url, network);
    }
}