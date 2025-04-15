// SPDX-License-Identifier: BUSL-1.1
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifiedContract = exports.DATATYPES = void 0;
const ethers_1 = require("ethers");
const account_1 = require("@biconomy/account");
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
})(DATATYPES || (exports.DATATYPES = DATATYPES = {}));
class VerifiedContract {
    constructor(address, abi, signer) {
        this.signer = signer;
        this.abiInterface = new ethers_1.utils.Interface(abi);
        this.contract = new ethers_1.ethers.Contract(address, this.abiInterface, signer);
    }
    async validateInput(type, data) {
        let error = "";
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
                    error = "Invalid numerical value";
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
                if (typeof data === "string" ||
                    data instanceof String ||
                    Object.prototype.toString.call(data) === "[object String]")
                    error = "Invalid string value";
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
                    const arr = [true, false, "true", "false", "TRUE", "FALSE"];
                    return arr.indexOf(data) !== -1
                        ? true
                        : new Error("Invalid Boolean value");
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
     * gets a function state mutability to differenciate between read and write functions
     * @param functionName
     * @returns true or false
     */
    isReadFunction(functionName) {
        const functionFragment = this.abiInterface.getFunction(functionName);
        if (!functionFragment) {
            throw new Error(`Function ${functionName} not found in ABI`);
        }
        return (functionFragment.stateMutability === "view" ||
            functionFragment.stateMutability === "pure");
    }
    /**
     * Parses output to standard response
     * @param data
     * @returns
     */
    tempOutput(data) {
        const response = {
            hash: "",
            result: [],
        };
        data.forEach(async (element) => {
            if (element.hash !== undefined || element.transactionHash) {
                return (response.hash = element.hash || element.transactionHash);
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
            else if (typeof element === "boolean") {
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
        if (constants_1.PaymasterConstants[`${chainId}`] &&
            constants_1.PaymasterConstants[`${chainId}`]["PAYMASTER_API_KEY"] &&
            constants_1.PaymasterConstants[`${chainId}`]["BUNDLER_API_KEY"])
            isSupported = true;
        return isSupported;
    }
    /** Creates Biconomy smart account */
    async createSmartAccount(chainId) {
        // Create Biconomy Smart Account instance
        const signer = this.signer;
        const smartAccount = await (0, account_1.createSmartAccountClient)({
            signer,
            biconomyPaymasterApiKey: constants_1.PaymasterConstants[`${chainId}`]["PAYMASTER_API_KEY"],
            bundlerUrl: `${constants_1.PaymasterConstants.BUNDLER_URL_FIRST_SECTION}/${chainId}/${constants_1.PaymasterConstants[`${chainId}`]["BUNDLER_API_KEY"]}`,
        });
        // console.log("smart account address", await smartAccount.getAccountAddress());
        return smartAccount;
    }
    async fetchUserOpReceipt(userOpHash) {
        var _a;
        try {
            const chainId = await this.signer.getChainId();
            const requestData = {
                jsonrpc: "2.0",
                method: "eth_getUserOperationReceipt",
                id: Date.now(),
                params: [userOpHash],
            };
            const response = await fetch(`${constants_1.PaymasterConstants.BUNDLER_URL_FIRST_SECTION}/${chainId}/${constants_1.PaymasterConstants[`${chainId}`]["BUNDLER_API_KEY"]}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });
            const data = await response.json();
            return (_a = data === null || data === void 0 ? void 0 : data.result) === null || _a === void 0 ? void 0 : _a.receipt;
        }
        catch (err) {
            console.error("Error trying to fetch gassless receipt", (err === null || err === void 0 ? void 0 : err.message) || err);
            return { failed: true };
        }
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
    async callFunctionAsUserOp(smartAccount, tx, functionName, paymentToken, ...args) {
        var _a, _b, _c;
        //send userops transaction and construct transaction response
        let res = {};
        try {
            const userOpResponse = await smartAccount.sendTransaction(tx, {
                paymasterServiceData: { mode: "SPONSORED" },
            });
            const { transactionHash } = await userOpResponse.waitForTxHash();
            console.log("Gassless Transaction Hash", transactionHash);
            const userOpReceipt = await userOpResponse.wait();
            if (userOpReceipt.success == "true") {
                res.status = STATUS.SUCCESS;
                res.response = {
                    hash: (userOpReceipt === null || userOpReceipt === void 0 ? void 0 : userOpReceipt.transactionHash) || transactionHash,
                    result: userOpReceipt.receipt.result ||
                        userOpReceipt.receipt.response ||
                        userOpReceipt.receipt,
                }; //TODO: update result on response
                res.message = "";
                return res;
            }
            else {
                console.log("Gassless failed will try ERC20...");
                const ERC20userOpResponse = await smartAccount.sendTransaction(tx, {
                    paymasterServiceData: { mode: "ERC20", preferredToken: paymentToken },
                });
                const { ERC20transactionHash } = await ERC20userOpResponse.waitForTxHash();
                console.log("ERC20 Transaction Hash", ERC20transactionHash);
                const userOpReceipt = await ERC20userOpResponse.wait();
                if (userOpReceipt.success == "true") {
                    res.status = STATUS.SUCCESS;
                    res.response = {
                        hash: (userOpReceipt === null || userOpReceipt === void 0 ? void 0 : userOpReceipt.transactionHash) || ERC20transactionHash,
                        result: ERC20userOpResponse.receipt.result ||
                            ERC20userOpResponse.receipt.response ||
                            ERC20userOpResponse.receipt,
                    }; //TODO: update result on response
                    res.message = "";
                    return res;
                }
                else {
                    console.error("ERC20 failed");
                    console.log("will use ethers....");
                    return await this.callFunctionWithEthers(functionName, ...args);
                }
            }
        }
        catch (err) {
            if ((_a = err === null || err === void 0 ? void 0 : err.message) === null || _a === void 0 ? void 0 : _a.includes("Try getting the receipt manually using eth_getUserOperationReceipt rpc method on bundler")) {
                //extract hash from message due to difference in hash???
                const messageArray = (_b = err === null || err === void 0 ? void 0 : err.message) === null || _b === void 0 ? void 0 : _b.split(" ");
                const txHash = (_c = messageArray === null || messageArray === void 0 ? void 0 : messageArray.find((msg) => msg === null || msg === void 0 ? void 0 : msg.startsWith("0x"))) === null || _c === void 0 ? void 0 : _c.replace(".", "");
                //wait up to max round to fetch receipt ???
                if (txHash) {
                    for (let i = 0; i < Number(constants_1.PaymasterConstants.MAX_WAITING_ROUND); i++) {
                        await new Promise((resolve) => {
                            setTimeout(resolve, 6000); //1 minute delay per round
                        });
                        console.log("Gassless timeout exceeded, fetching receipt for round: ", i + 1, "out of ", Number(constants_1.PaymasterConstants.MAX_WAITING_ROUND));
                        return await this.fetchUserOpReceipt(txHash).then(async (_res) => {
                            if (_res && !(_res === null || _res === void 0 ? void 0 : _res.failed)) {
                                //if receipt received stop and configure return
                                res.status = STATUS.SUCCESS;
                                res.response = {
                                    hash: (_res === null || _res === void 0 ? void 0 : _res.transactionHash) || txHash,
                                    result: _res,
                                }; //TODO: update result on response
                                res.message = "";
                                return res;
                            }
                            else if (_res && (_res === null || _res === void 0 ? void 0 : _res.failed)) {
                                //if receipt failed stop and use ethers
                                console.log("will use ethers....");
                                return await this.callFunctionWithEthers(functionName, ...args);
                            }
                        });
                    }
                }
                else {
                    console.error("gasless transaction failed with error: ", "No TX-hash from error message.");
                    console.log("will use ethers....");
                    return await this.callFunctionWithEthers(functionName, ...args);
                }
            }
            else {
                console.error("gasless transaction failed with error: ", err);
                console.log("will use ethers....");
                return await this.callFunctionWithEthers(functionName, ...args);
            }
        }
    }
    async callContract(functionName, ...args) {
        // Check if the function is a read function
        if (this.isReadFunction(functionName)) {
            console.log("read function will use ethers");
            return await this.callFunctionWithEthers(functionName, ...args);
        }
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
            /*const newArgs = args.map((_arg: any) => {
              if (
                typeof _arg === "string" &&
                _arg.toLowerCase() === signerAddress.toLowerCase()
              ) {
                _arg = account;
              }
              return _arg;
            });*/
            //construct calldata for function
            let fn = this.contract.populateTransaction[functionName];
            let _res = await fn(...args);
            const tx1 = {
                to: this.contract.address,
                data: _res.data,
            };
            const paymentToken = constants_1.PaymasterConstants[`${chainId}`]["PAYMENT_TOKEN"] || "";
            return await this.callFunctionAsUserOp(smartAccount, tx1, functionName, paymentToken, ...args);
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
            res.message = "";
            callback(res);
        });
    }
}
exports.VerifiedContract = VerifiedContract;
