// SPDX-License-Identifier: BUSL-1.1
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifiedContract = exports.DATATYPES = void 0;
require("dotenv").config();
const ethers_1 = require("ethers");
const {
  BiconomySmartAccountV2,
  DEFAULT_ENTRYPOINT_ADDRESS,
} = require("@biconomy/account");
const {
  ECDSAOwnershipValidationModule,
  DEFAULT_ECDSA_OWNERSHIP_MODULE,
} = require("@biconomy/modules");
const { Bundler } = require("@biconomy/bundler");
const {
  BiconomyPaymaster,
  PaymasterMode,
  SponsorUserOperationDto,
} = require("@biconomy/paymaster");
var STATUS;
(function (STATUS) {
  STATUS[(STATUS["SUCCESS"] = 0)] = "SUCCESS";
  STATUS[(STATUS["ERROR"] = 1)] = "ERROR";
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
})((DATATYPES = exports.DATATYPES || (exports.DATATYPES = {})));
class VerifiedContract {
  constructor(address, abi, signer) {
    this.signer = signer;
    this.abiInterface = new ethers_1.utils.Interface(abi);
    this.contract = new ethers_1.ethers.Contract(
      address,
      this.abiInterface,
      signer
    );
  }
  async validateInput(type, data) {
    let error = "";
    let status = true;
    switch (type) {
      case DATATYPES.ADDRESS:
        if (ethers_1.utils.isAddress(data)) error = "Invalid address value";
        else status = false;
        break;
      case DATATYPES.NUMBER:
        if (data !== Number(data)) error = "Invalid numerical value";
        else status = false;
        break;
      case DATATYPES.BOOLEAN:
        // const arr = [true, false, "true", "false"]
        if (typeof data === "boolean") error = "Invalid boolean value";
        else status = false;
        break;
      case DATATYPES.STRING:
        if (
          typeof data === "string" ||
          data instanceof String ||
          Object.prototype.toString.call(data) === "[object String]"
        )
          error = "Invalid string value";
        else status = false;
        break;
    }
    if (!status) throw TypeError(error);
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
    } catch (error) {
      console.error(error);
    }
  }
  sanitiseOutput(type, data) {
    switch (type) {
      case DATATYPES.BYTE32:
        const len = data.length;
        let finalData = data;
        if (len == 34) finalData = `${data}00000000000000000000000000000000`;
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
    const response = { hash: "", result: [] };
    data.forEach((element) => {
      if (element.hash !== undefined || element.transactionHash)
        return (response.hash = element.hash || element.transactionHash);
      if (element._isBigNumber) return response.result.push(element.toString());
      if (ethers_1.utils.isAddress(element))
        return response.result.push(element);
      //if (utils.isBytesLike(element)) return response.result.push(this.sanitiseOutput(DATATYPES.BYTE32, element))
      if (ethers_1.utils.isBytesLike(element))
        return response.result.push(element);
      if (
        typeof element === "boolean" ||
        this.validateInput(DATATYPES.ADDRESS, element)
      )
        return response.result.push(element);
    });
    return response;
  }
  /** Converts any datatype to array */
  convertToArray(data) {
    if (Array.isArray(data)) return data;
    else return [data];
  }
  /** Checks if a contract support gasless transaction */
  supportsGasless(contract, chainId) {
    let isSupported = false;
    const contractPaymasterUrl =
      process.env[`${chainId}_${contract.toUpperCase()}_API_KEY`];
    if (contractPaymasterUrl && contractPaymasterUrl.length > 0)
      isSupported = true;
    return isSupported;
  }

  async createSmartAccount(chainId, contractName) {
    //create bundler instance
    const bundler = new Bundler({
      bundlerUrl: `${process.env.BUNDLER_URL_FIRST_SECTION}/${chainId}/${process.env.BUNDLER_URL_SECTION_SECTION}`,
      chainId: chainId,
      entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
    });
    //create paymaster instance
    const paymaster = new BiconomyPaymaster({
      paymasterUrl: `${process.env.GENERAL_PAYMASTER_URL}/${chainId}/${
        process.env[`${chainId}_${contractName.toUpperCase()}_API_KEY`]
      }`,
    });
    const module = await ECDSAOwnershipValidationModule.create({
      signer: this.signer,
      moduleAddress: DEFAULT_ECDSA_OWNERSHIP_MODULE,
    });
    //create biconomy smart account
    let biconomyAccount = await BiconomySmartAccountV2.create({
      chainId: chainId,
      bundler: bundler,
      paymaster: paymaster,
      entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
      defaultValidationModule: module,
      activeValidationModule: module,
    });
    // console.log("address", await biconomyAccount.getAccountAddress());
    //return smart account
    return biconomyAccount;
  }

  async callContract(functionName, ...args) {
    let res = {};
    const chainId = await this.signer.getChainId();
    const contractName = this.constructor.name.toString();
    if (this.supportsGasless(contractName, chainId)) {
      //call contract through userop for gasless transaction
      let options = [];
      const totalArguments = args.length;
      //reduce args to exclude options
      if (totalArguments > 1) options = args.splice(-1);
      //console.log('options before', options);
      if (options == 0) options[0] = {};
      //create smart account for signer
      const smartAccount = await this.createSmartAccount(chainId, contractName);
      //construct calldata for function
      const functionData = this.abiInterface.encodeFunctionData(functionName, [
        ...args,
      ]);
      const transaction = {
        to: this.contractAddress,
        data: functionData,
      };
      //build userops transaction
      let partialUserOp = await smartAccount.buildUserOp([transaction]);
      const biconomyPaymaster = smartAccount.paymaster;
      //query paymaster to get neccesary params and update userops
      try {
        const paymasterAndDataResponse =
          await biconomyPaymaster.getPaymasterAndData(partialUserOp, {
            mode: PaymasterMode.SPONSORED,
          });
        partialUserOp.paymasterAndData =
          paymasterAndDataResponse.paymasterAndData;
        if (
          paymasterAndDataResponse.callGasLimit &&
          paymasterAndDataResponse.verificationGasLimit &&
          paymasterAndDataResponse.preVerificationGas
        ) {
          partialUserOp.callGasLimit = paymasterAndDataResponse.callGasLimit;
          partialUserOp.verificationGasLimit =
            paymasterAndDataResponse.verificationGasLimit;
          partialUserOp.preVerificationGas =
            paymasterAndDataResponse.preVerificationGas;
        }
      } catch (err) {
        console.log("error received from paymaster query", err);
      }
      //send userops transaction and construct transaction response
      try {
        const userOpResponse = await smartAccount.sendUserOp(partialUserOp);
        const transactionDetails = await userOpResponse.wait();
        console.log("tx details: ", transactionDetails);
        res.response = {
          hash: transactionDetails.receipt.transactionHash,
          result: [],
        }; //TODO: update response
        res.status = STATUS.SUCCESS;
        res.message = "";
        return res;
      } catch (err) {
        console.log("error received when sending transaction", err);
        res.status = STATUS.ERROR;
        res.reason = err.reason;
        res.message = err.message;
        res.code = err.code;
        return res;
      }
    } else {
      //call contract through normal ether.js
      try {
        let options = [];
        const totalArguments = args.length;
        if (totalArguments > 1) options = args.splice(-1);
        //console.log('options before', options);
        if (options == 0) options[0] = {};
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
        res.response = this.tempOutput(
          this.convertToArray(ethers_1.utils.deepCopy(_resp))
        );
        res.status = STATUS.SUCCESS;
        res.message = "";
        return res;
      } catch (error) {
        console.error(error);
        res.status = STATUS.ERROR;
        res.reason = error.reason;
        res.message = error.message;
        res.code = error.code;
        return res;
      }
    }
  }
  getEvent(eventName, callback) {
    let res = {};
    this.contract.once(eventName, (...data) => {
      const dataToBeFormatted = data.splice(0, data.length - 1);
      res.response = this.tempOutput(
        ethers_1.utils.deepCopy(dataToBeFormatted)
      );
      res.status = STATUS.SUCCESS;
      res.message = "";
      callback(res);
    });
  }
}

exports.VerifiedContract = VerifiedContract;
