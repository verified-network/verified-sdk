// SPDX-License-Identifier: BUSL-1.1

"use strict"
import { ethers, utils, ContractInterface, Signer } from "ethers";
import {Presets,Client, UserOperationMiddlewareFn, IUserOperation, BundlerJsonRpcProvider} from 'userop'
import { UserOperationEventEvent } from "userop/dist/typechain/EntryPoint";
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
    private address: string;
    constructor(address: string, abi: string, signer: VerifiedWallet | Signer) {
        this.signer = signer;
        this.abiInterface = new utils.Interface(abi)
        this.contract = new ethers.Contract(address, this.abiInterface, signer);
        this.address = address;
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
                if ((typeof data === 'string' || data instanceof String || Object.prototype.toString.call(data) === '[object String]')) error = 'Invalid string value'
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

    async callContract(functionName: string, ...args: any):Promise<UserOperationEventEvent | SCResponse | null> {
        let res = <SCResponse>{};
        try {
            let options = []
            const totalArguments = args.length
            // params to be used while performing gasless transaction with userop 
            const params =  [...args];
                if (totalArguments > 1){
                    // Check if there is options and remove it because it should be removed last in arguments
                    params.pop()
                }
            if (totalArguments > 1) options = args.splice(-1)
            //console.log('options before', options);

            if (options == 0) options[0] = {}
            //console.log('*********', ...args)
            //console.log('options after', options);

            // call the function using userop
            // Detect options are parsed
            // @ts-ignore
            const isOptionsProvided = Object.keys(...options).length>0 && "gasPrice" in options[0];
            if (isOptionsProvided && options[0].gasPrice===0) {
                // Get the arguments for the contract after removing options
                const funcParameters = params.length>0?params:undefined;
                 // Define the kind of paymaster you want to use. If you do not want to use a paymaster,
                    // comment out these lines.
                    const paymasterContext = { type: "payg" };
                    const paymasterMiddleware = Presets.Middleware.verifyingPaymaster(
                        process.env.PAY_MASTER_URL,
                        paymasterContext
                    );

                    // Initialize the User Operation
                    // Userop.js has a few presets for different smart account types to set default fields
                    // for user operations. This uses the ZeroDev Kernel contracts.
                    const signer = new ethers.Wallet(process.env.API_KEY);
                    // @ts-ignore
                    const builder = await Presets.Builder.Kernel.init(signer, this.signer?.provider?.connection?.url, {
                        paymasterMiddleware: paymasterMiddleware,
                    });

                    // Call the contract
                    const call = {
                        to: this.address,
                        value: ethers.constants.Zero,
                        data: this.contract.interface.encodeFunctionData(functionName,funcParameters)
                    };

                    // @ts-ignore
                    const client = await Client.init(this.signer?.provider?.connection?.url);

                    const res = await client.sendUserOperation(builder.execute(call), {
                        onBuild: (op) =>{
                        // console.log("Signed UserOperation:", op)
                        }
                        
                    });
                    console.log(`UserOpHash: ${res.userOpHash}`);
                    console.log("Waiting for transaction...");
                    const ev = await res.wait();
                    return ev
            }
           
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