"use strict"

import { ethers, utils } from "ethers";
import { VerifiedWallet } from "../wallet";

enum STATUS {
    SUCCESS,
    ERROR
}
interface SCResponse {
    data: object;
    status: STATUS;
    message: string;
}
export enum DATATYPES {
    NUMBER = 'number',
    STRING = 'string',
    ADDRESS = 'address',
    BOOLEAN = 'boolean',
    BYTE32 = 'byte32'
}
export class VerifiedContract {

    private signer: VerifiedWallet;
    private contract: ethers.Contract;

    constructor(address: string, abi: string, signer: VerifiedWallet) {
        this.signer = signer;
        this.contract = new ethers.Contract(address, abi, signer);
    }
    /* ethers.utils.computeAddress( publicOrPrivateKey ) ⇒ string< Address >source
    Returns the address for publicOrPrivateKey. A public key may be compressed or uncompressed, and a private key will be converted automatically to a public key for the derivation. */
    // public validateInputParams(functionName: string, _params: any) {
    //     console.log(_params);
    //     console.log("****************");
    //     // let inputLength = 2;
    //     // let params = _params.splice(0, inputLength);
    //     let overrideOptions = _params.splice(- 1);
    //     return { _params, overrideOptions };
    // }
    protected async validateInput(type: DATATYPES, data: any) {
        // try {
        switch (type) {
            case DATATYPES.ADDRESS:
                return utils.isAddress(data) ? true : new Error("Invalid Address is this");
            case DATATYPES.NUMBER:
                return !Number.isNaN(parseInt(data))
            case DATATYPES.BOOLEAN:
                // const arr = [true, false, "true", "false"]
                return typeof data === "boolean" ? true : new Error("Invalid Boolean value");
            default:
                return data
        }
        // } catch (error) {
        //     console.error(error);
        // }
    }

    

    protected sanitiseInput(type: DATATYPES, data: any) {
        try {
            switch (type) {
                case DATATYPES.BYTE32:
                    /**
                     * Returns a bytes32 string representation of text. 
                     * If the length of text exceeds 31 bytes, it will throw an error.
                     * @params (text)
                     * @returns ⇒ string
                     */
                    return utils.formatBytes32String(data)
                case DATATYPES.NUMBER:
                    /**
                     * Returns a BigNumber representation of value, parsed with unit digits 
                     * (if it is a number) or from the unit specified (if a string).
                     * @param ( value [ , unit = "ether" ] ) 
                     * @returns ⇒ BigNumber
                     */
                    utils.parseUnits(data)
                    break;
                case DATATYPES.BOOLEAN:
                    const arr = [true, false, "true", "false", 'TRUE', 'FALSE']
                    return arr.indexOf(data) !== -1 ? true : new Error("Invalid Boolean value");
                default:
                    return data
            }
        } catch (error) {
            console.error(error);
        }
    }

    protected async sanitiseOutput(type: DATATYPES, data: any) {
        switch (type) {
            case DATATYPES.BYTE32:
                /**
                 * Returns the decoded string represented by the Bytes32 encoded data.
                 * @params (aBytesLike)
                 * @returns  string
                 */
                return utils.parseBytes32String(data)

            case DATATYPES.NUMBER:
                /**
                 * Returns a string representation of value formatted with unit 
                 * digits (if it is a number) or to the unit specified (if a string).
                 * @params ( value [ , unit = "ether" ] )
                 * @returns ⇒ string
                 */
                return utils.formatUnits(data)

            default:
                return data

        }
    }

    async callContract(functionName: string, ...args: any) {
        let res = <SCResponse>{};
        try {
            // Sanitise params (like converting string to bytes before passing to smart contract)
            // let sanitisedParams = this.sanitiseInput(params);
            // console.log('*************',sanitisedParams)

            const options = args.splice(-1)
            // let params = [...args];
            // let options = params[params.length - 1];
            // console.log(typeof options);
            // options = typeof options === 'object' || typeof options === 'undefined' ? params.pop() : undefined;
            // // let {params, overrideOptions} = this.validateInputParams(functionName, _params);
            // console.log("Params:: ", params, " Options:: ", options);

            /**
             * Actual Function call using Ethers.js
             */
            let fn = this.contract[functionName];
            // console.log(params)
            let _res = await fn(...args, { ...options });
            // console.log('_res', _res)
            let _resp = _res.wait !== undefined ? await _res.wait(_res) : res;
            // let _resp = await _res.wait(_res);
            // console.log('_resp', _resp)
            // let { hash, nonce, to, chainId, result = [] } = await this.sanitiseOutput(_res);

            res.data = _resp
            res.status = STATUS.SUCCESS;
            res.message = '';
            return res;
        } catch (error) {
            console.error(error);

            res.status = STATUS.ERROR;
            res.message = error.reason;
            res.data = {};
            return res;
        }
    }

}