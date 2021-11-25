// SPDX-License-Identifier: BUSL-1.1

"use strict"
import { ethers, utils, ContractInterface, Signer } from "ethers";
import { VerifiedWallet } from "../wallet";

enum STATUS {
    SUCCESS,
    ERROR
}
interface SCResponse {
    response: object;
    status: STATUS;
    message: string;
    reason: string;
    code: number
}

export enum DATATYPES {
    NUMBER = 'number',
    STRING = 'string',
    ADDRESS = 'address',
    BOOLEAN = 'boolean',
    BYTE32 = 'byte32',
    BYTE16 = 'byte16',
    BIGNUMBER = 'bignumber'
}
export class VerifiedContract {

    private signer: VerifiedWallet | Signer;
    private contract: ethers.Contract;
    private abiInterface: ContractInterface;

    constructor(address: string, abi: string, signer: VerifiedWallet | Signer) {
        this.signer = signer;
        this.abiInterface = new utils.Interface(abi)
        this.contract = new ethers.Contract(address, this.abiInterface, signer);
    }

    protected async validateInput(type: DATATYPES, data: any) {
        let error: string = '';
        let status: boolean = true;

        switch (type) {
            case DATATYPES.ADDRESS:
                if (utils.isAddress(data)) error = "Invalid address value"
                else status = false
                break;
            case DATATYPES.NUMBER:
                if (data !== Number(data)) error = 'Invalid numerical value'
                else status = false
                break;
            case DATATYPES.BOOLEAN:
                // const arr = [true, false, "true", "false"]
                if (typeof data === "boolean") error = "Invalid boolean value"
                else status = false
                break;
            case DATATYPES.STRING:
                if ((typeof data === 'string' || data instanceof String)) error = 'Invalid string value'
                else status = false
                break;
        }
        if (!status) throw TypeError(error);
        return status
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
                case DATATYPES.BYTE16:
                    /**
                     * Returns a bytes16 string representation of text. 
                     * If the length of text exceeds 31 bytes, it will throw an error.
                     * @params (text)
                     * @returns ⇒ string
                     */
                    return utils.formatBytes32String(data).slice(16)
                case DATATYPES.NUMBER:
                    /**
                     * Returns a BigNumber representation of value, parsed with unit digits 
                     * (if it is a number) or from the unit specified (if a string).
                     * @param ( value [ , unit = "ether" ] ) 
                     * @returns ⇒ BigNumber
                     */
                    return utils.parseUnits(data)
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

    protected sanitiseOutput(type: DATATYPES, data: any) {
        switch (type) {
            case DATATYPES.BYTE32:
                const len = data.length
                let finalData = data
                if (len == 34) finalData = `${data}00000000000000000000000000000000`
                /**
                 * Returns the decoded string represented by the Bytes32 encoded data.
                 * @params (aBytesLike)
                 * @returns  string
                 */
                return utils.parseBytes32String(finalData)
            case DATATYPES.NUMBER:
                /**
                 * Returns a string representation of value formatted with unit 
                 * digits (if it is a number) or to the unit specified (if a string).
                 * @params ( value [ , unit = "ether" ] )
                 * @returns ⇒ string
                 */
                return utils.formatUnits(data)

            case DATATYPES.BIGNUMBER:

                return data.toString()
            case DATATYPES.STRING:
                return utils.toUtf8String(data)

            default:
                return data
        }
    }

    /**
     * Parses output to standard response
     * @param data 
     * @returns 
     */
    private tempOutput(data: any): object {
        const response: { hash: string, result: Array<any> } = { hash: '', result: [] }
        data.forEach((element: any) => {
            if (element.hash !== undefined || element.transactionHash) return response.hash = element.hash || element.transactionHash
            if (element._isBigNumber) return response.result.push(element.toString())
            if (utils.isAddress(element)) return response.result.push(element)
            //if (utils.isBytesLike(element)) return response.result.push(this.sanitiseOutput(DATATYPES.BYTE32, element))
            if (utils.isBytesLike(element)) return response.result.push(element)
            if (typeof element === 'boolean' || (this.validateInput(DATATYPES.ADDRESS, element))) return response.result.push(element)
        }); 
        return response
    }
    /** Converts any datatype to array */
    private convertToArray(data: any) {
        if (Array.isArray(data)) return data
        else return [data]
    }

    async callContract(functionName: string, ...args: any) {
        let res = <SCResponse>{};
        try {
            let options = []
            const totalArguments = args.length

            if (totalArguments > 1) options = args.splice(-1)
            //console.log('options before', options);

            if (options == 0) options[0] = {}
            //console.log('*********', ...args)
            //console.log('options after', options);
           
            /**
             * Actual Function call using Ethers.js
             */
            let fn = this.contract[functionName];
            let _res = await fn(...args, ...options);
            //console.log('_res', _res)
            //console.log('_res.value.toString()',_res.value.toString())
            let _resp = _res.wait !== undefined ? await _res.wait(_res) : _res;
            //console.log('_resp', _resp)
            res.response = this.tempOutput(this.convertToArray(utils.deepCopy(_resp)))
            res.status = STATUS.SUCCESS
            res.message = ''
            return res
        } catch (error) {
            console.error(error);
            res.status = STATUS.ERROR;
            res.reason = error.reason
            res.message = error.message
            res.code = error.code
            return res;
        }
    }

    protected getEvent(eventName: string, callback: any) {
        let res = <SCResponse>{};
        this.contract.once(eventName, (...data) => {
            const dataToBeFormatted = data.splice(0, data.length - 1)
            res.response = this.tempOutput(utils.deepCopy(dataToBeFormatted))
            res.status = STATUS.SUCCESS;
            res.message = '';
            callback(res)
        })
    }
}