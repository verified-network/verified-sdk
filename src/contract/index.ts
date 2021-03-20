"use strict"

import { ethers } from "ethers";
import { VerifiedWallet } from "../wallet";

enum STATUS {
    SUCCESS,
    ERROR
}

interface SCResponse {
    data: any;
    status: STATUS;
    message: string;
}

export class VerifiedContract {

    private signer: VerifiedWallet;
    private contract: ethers.Contract;

    constructor(address: string, abi: string, signer: VerifiedWallet) {
        this.signer = signer;
        this.contract = new ethers.Contract(address, abi, signer);
    }

    private async validateInput(fname: string, params: any) {
        return params;
    }

    private async sanitiseInput(params: any) {
        return params;
    }

    private async sanitiseOutput(response: any) {
        return response;
    }

    async callContract(functionName: string, params?: any, ...args: any) {
        let res = <SCResponse>{};
        try {
            // Validate Input params
            let validatedParams = this.validateInput(functionName, params);
            // Sanitise params (like converting string to bytes before passing to smart contract)
            let sanitisedParams = this.sanitiseInput(validatedParams);
            // Actual Function call using Ethers.js
            let fn = this.contract[functionName];
            let _res = await fn(sanitisedParams);
            res.data = this.sanitiseOutput(_res);
            res.status = STATUS.SUCCESS;
            res.message = '';
            return res;
        } catch (error) {
            res.status = STATUS.ERROR;
            res.message = error.toString();
            res.data = null;
            return res;
        }
    }

}