// SPDX-License-Identifier: BUSL-1.1
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifiedContract = exports.DATATYPES = void 0;
const dotenv_1 = require("dotenv");
dotenv_1.config({ path: "../../.env" });
const ethers_1 = require("ethers");
const web3_1 = __importDefault(require("web3"));
const account_1 = require("@biconomy/account");
const modules_1 = require("@biconomy/modules");
const bundler_1 = require("@biconomy/bundler");
const paymaster_1 = require("@biconomy/paymaster");
const constants_1 = require("../utils/constants");
var STATUS;
(function (STATUS) {
    STATUS[STATUS["SUCCESS"] = 0] = "SUCCESS";
    STATUS[STATUS["ERROR"] = 1] = "ERROR";
})(STATUS || (STATUS = {}));
var DATATYPES;
(function (DATATYPES) {
    DATATYPES["NUMBER"] = "number";
    DATATYPES["STRING"] = "string";
    DATATYPES["ADDRESS"] = "address";
    DATATYPES["BOOLEAN"] = "boolean";
    DATATYPES["BYTE32"] = "byte32";
    DATATYPES["BYTE16"] = "byte16";
    DATATYPES["BIGNUMBER"] = "bignumber";
})(DATATYPES = exports.DATATYPES || (exports.DATATYPES = {}));
class VerifiedContract {
    constructor(address, abi, signer) {
        this.signer = signer;
        this.abiInterface = new ethers_1.utils.Interface(abi);
        this.contract = new ethers_1.ethers.Contract(address, this.abiInterface, signer);
    }
    async validateInput(type, data) {
        let error = '';
        let status = true;
        switch (type) {
            case DATATYPES.ADDRESS:
                if (ethers_1.utils.isAddress(data))
                    error = "Invalid address value";
                else
                    status = false;
                break;
            case DATATYPES.NUMBER:
                if (data !== Number(data))
                    error = 'Invalid numerical value';
                else
                    status = false;
                break;
            case DATATYPES.BOOLEAN:
                // const arr = [true, false, "true", "false"]
                if (typeof data === "boolean")
                    error = "Invalid boolean value";
                else
                    status = false;
                break;
            case DATATYPES.STRING:
                if ((typeof data === 'string' || data instanceof String || Object.prototype.toString.call(data) === '[object String]'))
                    error = 'Invalid string value';
                else
                    status = false;
                break;
        }
        if (!status)
            throw TypeError(error);
        return status;
    }
    sanitiseInput(type, data) {
        try {
            switch (type) {
                case DATATYPES.BYTE32:
                    /**
                     * Returns a bytes32 string representation of text.
                     * If the length of text exceeds 31 bytes, it will throw an error.
                     * @params (text)
                     * @returns ⇒ string
                     */
                    return ethers_1.utils.formatBytes32String(data);
                case DATATYPES.BYTE16:
                    /**
                     * Returns a bytes16 string representation of text.
                     * If the length of text exceeds 31 bytes, it will throw an error.
                     * @params (text)
                     * @returns ⇒ string
                     */
                    return ethers_1.utils.formatBytes32String(data).slice(16);
                case DATATYPES.NUMBER:
                    /**
                     * Returns a BigNumber representation of value, parsed with unit digits
                     * (if it is a number) or from the unit specified (if a string).
                     * @param ( value [ , unit = "ether" ] )
                     * @returns ⇒ BigNumber
                     */
                    return ethers_1.utils.parseUnits(data);
                case DATATYPES.BOOLEAN:
                    const arr = [true, false, "true", "false", 'TRUE', 'FALSE'];
                    return arr.indexOf(data) !== -1 ? true : new Error("Invalid Boolean value");
                default:
                    return data;
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    sanitiseOutput(type, data) {
        switch (type) {
            case DATATYPES.BYTE32:
                const len = data.length;
                let finalData = data;
                if (len == 34)
                    finalData = `${data}00000000000000000000000000000000`;
                /**
                 * Returns the decoded string represented by the Bytes32 encoded data.
                 * @params (aBytesLike)
                 * @returns  string
                 */
                return ethers_1.utils.parseBytes32String(finalData);
            case DATATYPES.NUMBER:
                /**
                 * Returns a string representation of value formatted with unit
                 * digits (if it is a number) or to the unit specified (if a string).
                 * @params ( value [ , unit = "ether" ] )
                 * @returns ⇒ string
                 */
                return ethers_1.utils.formatUnits(data);
            case DATATYPES.BIGNUMBER:
                return data.toString();
            case DATATYPES.STRING:
                return ethers_1.utils.toUtf8String(data);
            default:
                return data;
        }
    }
    /**
     * Parses output to standard response
     * @param data
     * @returns
     */
    tempOutput(data) {
        const response = { hash: '', result: [] };
        data.forEach(async (element) => {
            if (element.hash !== undefined || element.transactionHash) {
                return response.hash = element.hash || element.transactionHash;
            }
            else if (element._isBigNumber) {
                return response.result.push(element.toString());
            }
            else if (ethers_1.utils.isAddress(element)) {
                return response.result.push(element);
            }
            //if (utils.isBytesLike(element)) return response.result.push(this.sanitiseOutput(DATATYPES.BYTE32, element))
            else if (ethers_1.utils.isBytesLike(element)) {
                return response.result.push(element);
            }
            else if (typeof element === 'boolean') {
                return response.result.push(element);
            }
            else {
                return response.result.push(element);
            }
        });
        return response;
    }
    /** Converts any datatype to array */
    convertToArray(data) {
        if (Array.isArray(data))
            return data;
        else
            return [data];
    }
    /** Checks if a contract support gasless transaction */
    supportsGasless(chainId) {
        let isSupported = false;
        const contractPaymasterUrl = constants_1.PaymasterConstants[`${chainId}_PAYMASTER_API_KEY`];
        if (contractPaymasterUrl && contractPaymasterUrl.length > 0)
            isSupported = true;
        return isSupported;
    }
    /** Creates Biconomy smart account */
    async createSmartAccount(chainId) {
        //create bundler instance
        const bundler = new bundler_1.Bundler({
            bundlerUrl: `${constants_1.PaymasterConstants.BUNDLER_URL_FIRST_SECTION}/${chainId}/${constants_1.PaymasterConstants[`${chainId}_URL_SECOND_SECTION`]}`,
            chainId: chainId,
            entryPointAddress: account_1.DEFAULT_ENTRYPOINT_ADDRESS,
        });
        //create paymaster instance
        const paymaster = new paymaster_1.BiconomyPaymaster({
            paymasterUrl: `${constants_1.PaymasterConstants.GENERAL_PAYMASTER_URL}/${chainId}/${constants_1.PaymasterConstants[`${chainId}_PAYMASTER_API_KEY`]}`,
        });
        const module = await modules_1.ECDSAOwnershipValidationModule.create({
            signer: this.signer,
            moduleAddress: modules_1.DEFAULT_ECDSA_OWNERSHIP_MODULE,
        });
        //create biconomy smart account
        let biconomyAccount = await account_1.BiconomySmartAccountV2.create({
            chainId: chainId,
            bundler: bundler,
            paymaster: paymaster,
            entryPointAddress: account_1.DEFAULT_ENTRYPOINT_ADDRESS,
            defaultValidationModule: module,
            activeValidationModule: module,
        });
        // console.log("address", await biconomyAccount.getAccountAddress());
        return biconomyAccount;
    }
    /** Constructs and call function with ethers.js */
    async callFunctionWithEthers(functionName, ...args) {
        let res = {};
        try {
            let options = [];
            const totalArguments = args.length;
            if (totalArguments > 1)
                options = args.splice(-1);
            //console.log('options before', options);
            if (options == 0)
                options[0] = {};
            //console.log('*********', ...args)
            //console.log('options after', options);
            /**
             * Actual Function call using Ethers.js
             */
            let fn = this.contract[functionName];
            let _res = await fn(...args, ...options);
            let _resp = _res.wait !== undefined ? await _res.wait(_res) : _res;
            res.response = this.tempOutput(this.convertToArray(ethers_1.utils.deepCopy(_resp)));
            res.status = STATUS.SUCCESS;
            res.message = "";
            return res;
        }
        catch (error) {
            console.error(error);
            res.status = STATUS.ERROR;
            res.reason = error.reason;
            res.message = error.message;
            res.code = error.code;
            return res;
        }
    }
    /** Constructs and call function as userop for biconomy gassless(sponsored/erc20 mode) */
    async callFunctionAsUserOp(smartAccount, userOp, functionName, ...args) {
        //send userops transaction and construct transaction response
        let res = {};
        try {
            const userOpResponse = await smartAccount.sendUserOp(userOp);
            const transactionDetails = await userOpResponse.wait();
            if (transactionDetails.success === "true") {
                res.response = {
                    hash: transactionDetails.receipt.transactionHash,
                    result: [],
                }; //TODO: update result on response
                res.status = STATUS.SUCCESS;
                res.message = "";
                return res;
            }
            else {
                const logs = transactionDetails.receipt.logs;
                let reason = "";
                const provider = this.contract.provider;
                logs.map((log) => {
                    if (log.topics.includes(constants_1.PaymasterConstants.BICONOMY_REVERT_TOPIC)) {
                        const web3 = new web3_1.default(provider);
                        reason = web3.utils.hexToAscii(log.data);
                    }
                });
                throw Error(`execution reverted: ${reason}`);
            }
        }
        catch (err) {
            console.error("gasless transaction failed with error: ", err);
            console.log("will use ethers....");
            // res.status = STATUS.ERROR;
            // res.reason = err.reason;
            // res.message = err.message;
            // res.code = err.code;
            return await this.callFunctionWithEthers(functionName, ...args);
        }
    }
    async callContract(functionName, ...args) {
        const chainId = await this.signer.getChainId();
        if (this.supportsGasless(chainId)) {
            console.log("gassless supported will use userop");
            //call contract through userop for gasless transaction
            let options = [];
            const totalArguments = args.length;
            //reduce args to exclude options
            if (totalArguments > 1)
                options = args.splice(-1);
            //console.log('options before', options);
            if (options == 0)
                options[0] = {};
            //create smart account for signer
            const smartAccount = await this.createSmartAccount(chainId);
            const account = await smartAccount.getAccountAddress();
            const signerAddress = await this.signer.getAddress();
            //sanitize arguments to use smartaccount address
            const newArgs = args.map((_arg) => {
                if (typeof _arg === "string" &&
                    _arg.toLowerCase() === signerAddress.toLowerCase()) {
                    _arg = account;
                }
                return _arg;
            });
            //construct calldata for function
            let fn = this.contract.populateTransaction[functionName];
            let _res = await fn(...newArgs);
            const tx1 = {
                to: this.contract.address,
                data: _res.data,
            };
            //build userop transaction
            let partialUserOp;
            try {
                partialUserOp = await smartAccount.buildUserOp([tx1]);
            }
            catch (err) {
                console.log("error while buiding gassless transaction: ", err);
                console.log("will use ethers....");
                return await this.callFunctionWithEthers(functionName, ...args);
            }
            //query paymaster for sponsored mode to get neccesary params and update userop
            const biconomyPaymaster = smartAccount.paymaster;
            try {
                const paymasterAndDataResponse = await biconomyPaymaster.getPaymasterAndData(partialUserOp, {
                    mode: paymaster_1.PaymasterMode.SPONSORED,
                });
                // console.log("pmR: ", paymasterAndDataResponse);
                if (paymasterAndDataResponse) {
                    partialUserOp.paymasterAndData =
                        paymasterAndDataResponse.paymasterAndData;
                    if (paymasterAndDataResponse.callGasLimit &&
                        paymasterAndDataResponse.verificationGasLimit &&
                        paymasterAndDataResponse.preVerificationGas) {
                        partialUserOp.callGasLimit = paymasterAndDataResponse.callGasLimit;
                        partialUserOp.verificationGasLimit =
                            paymasterAndDataResponse.verificationGasLimit;
                        partialUserOp.preVerificationGas =
                            paymasterAndDataResponse.preVerificationGas;
                    }
                }
                return await this.callFunctionAsUserOp(smartAccount, partialUserOp, functionName, ...args);
            }
            catch (err) {
                console.log("sponsored failed will try erc20");
                //if userop can't be sponsored use ERC20 mode
                try {
                    let finalUserOp = partialUserOp;
                    //get fee quote for network cash token
                    const feeQuotesResponse = await biconomyPaymaster.getPaymasterFeeQuotesOrData(partialUserOp, {
                        mode: paymaster_1.PaymasterMode.ERC20,
                        tokenList: [constants_1.PaymasterConstants[`${chainId}_CASH_TOKEN_ADDRESS`]],
                    });
                    // console.log("fq: ", feeQuotesResponse);
                    const feeQuotes = feeQuotesResponse.feeQuotes;
                    const spender = feeQuotesResponse.tokenPaymasterAddress || "";
                    const tokenFeeQuotes = feeQuotes[0];
                    finalUserOp = await smartAccount.buildTokenPaymasterUserOp(partialUserOp, {
                        feeQuote: tokenFeeQuotes,
                        spender: spender,
                        maxApproval: false,
                    });
                    let paymasterServiceData = {
                        mode: paymaster_1.PaymasterMode.ERC20,
                        feeTokenAddress: tokenFeeQuotes.tokenAddress,
                        calculateGasLimits: true,
                    };
                    const paymasterAndDataWithLimits = await biconomyPaymaster.getPaymasterAndData(finalUserOp, paymasterServiceData);
                    finalUserOp.paymasterAndData =
                        paymasterAndDataWithLimits.paymasterAndData;
                    if (paymasterAndDataWithLimits.callGasLimit &&
                        paymasterAndDataWithLimits.verificationGasLimit &&
                        paymasterAndDataWithLimits.preVerificationGas) {
                        finalUserOp.callGasLimit = paymasterAndDataWithLimits.callGasLimit;
                        finalUserOp.verificationGasLimit =
                            paymasterAndDataWithLimits.verificationGasLimit;
                        finalUserOp.preVerificationGas =
                            paymasterAndDataWithLimits.preVerificationGas;
                    }
                    const _paymasterAndDataWithLimits = await biconomyPaymaster.getPaymasterAndData(finalUserOp, paymasterServiceData);
                    finalUserOp.paymasterAndData =
                        _paymasterAndDataWithLimits.paymasterAndData;
                    return await this.callFunctionAsUserOp(smartAccount, finalUserOp, functionName, ...args);
                }
                catch (_err) {
                    //if erc20 mode didn't work use ethers.js
                    console.log("both sponsored and erc20 failed will use ethers: ");
                    return await this.callFunctionWithEthers(functionName, ...args);
                }
            }
        }
        else {
            //call contract through normal ether.js
            console.log("gassless not supported will use ethers");
            return await this.callFunctionWithEthers(functionName, ...args);
        }
    }
    getEvent(eventName, callback) {
        let res = {};
        this.contract.once(eventName, (...data) => {
            const dataToBeFormatted = data.splice(0, data.length - 1);
            res.response = this.tempOutput(ethers_1.utils.deepCopy(dataToBeFormatted));
            res.status = STATUS.SUCCESS;
            res.message = '';
            callback(res);
        });
    }
}
exports.VerifiedContract = VerifiedContract;
