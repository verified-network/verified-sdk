// SPDX-License-Identifier: BUSL-1.1

"use strict"
import { config } from "dotenv";
import { ethers, utils, ContractInterface, Signer } from "ethers";
import { VerifiedWallet } from "../wallet";
import Web3 from "web3";
import { BiconomySmartAccountV2, DEFAULT_ENTRYPOINT_ADDRESS } from "@biconomy/account";
import { ECDSAOwnershipValidationModule, DEFAULT_ECDSA_OWNERSHIP_MODULE } from "@biconomy/modules";
import {IBundler, Bundler } from "@biconomy/bundler";
import { IPaymaster,
    BiconomyPaymaster,
    IHybridPaymaster,
    PaymasterMode,
    SponsorUserOperationDto, } from "@biconomy/paymaster";

config();

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
        data.forEach(async (element: any) => {
            if (element.hash !== undefined || element.transactionHash) return response.hash = element.hash || element.transactionHash
            if (element._isBigNumber) return response.result.push(element.toString())
            if (utils.isAddress(element)) return response.result.push(element)
            //if (utils.isBytesLike(element)) return response.result.push(this.sanitiseOutput(DATATYPES.BYTE32, element))
            if (utils.isBytesLike(element)) return response.result.push(element)
            if (typeof element === 'boolean' || (await this.validateInput(DATATYPES.ADDRESS, element))) return response.result.push(element)
        }); 
        return response
    }
    /** Converts any datatype to array */
    private convertToArray(data: any) {
        if (Array.isArray(data)) return data
        else return [data]
    }

    /** Checks if a contract support gasless transaction */
  supportsGasless(chainId: number) {
    let isSupported = false;
    const contractPaymasterUrl = process.env[`${chainId}_PAYMASTER_API_KEY`];
    if (contractPaymasterUrl && contractPaymasterUrl.length > 0)
      isSupported = true;
    return isSupported;
  }

  /** Creates Biconomy smart account */
  async createSmartAccount(chainId: number) {
    //create bundler instance
    const bundler: IBundler = new Bundler({
      bundlerUrl: `${process.env.BUNDLER_URL_FIRST_SECTION}/${chainId}/${process.env.BUNDLER_URL_SECTION_SECTION}`,
      chainId: chainId,
      entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
    });
    // console.log("bd: ", bundler);
    //create paymaster instance
    const paymaster: IPaymaster = new BiconomyPaymaster({
      paymasterUrl: `${process.env.GENERAL_PAYMASTER_URL}/${chainId}/${
        process.env[`${chainId}_PAYMASTER_API_KEY`]
      }`,
    });
    // console.log("pm: ", paymaster);
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

  /** Constructs and call function with ethers.js */
  async callFunctionWithEthers(functionName: string, ...args: any) {
    let res = <SCResponse>{};
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
        this.convertToArray(utils.deepCopy(_resp))
      );
      res.status = STATUS.SUCCESS;
      res.message = "";
      return res;
    } catch (error: any) {
      console.error(error);
      res.status = STATUS.ERROR;
      res.reason = error.reason;
      res.message = error.message;
      res.code = error.code;
      return res;
    }
  }

  /** Constructs and call function as userop for biconomy gassless(sponsored/erc20 mode) */
  async callFunctionAsUserOp(smartAccount: any, userOp: any) {
    //send userops transaction and construct transaction response
    let res = <SCResponse>{};
    try {
      const userOpResponse = await smartAccount.sendUserOp(userOp);
      const transactionDetails = await userOpResponse.wait();
      if (transactionDetails.success === "true") {
        res.response = {
          hash: transactionDetails.receipt.transactionHash,
          result: [],
        }; //TODO: update response
        res.status = STATUS.SUCCESS;
        res.message = "";
        return res;
      } else {
        const logs = transactionDetails.receipt.logs;
        let reason = "";
        const provider: any = this.contract.provider;
        logs.map((log: any) => {
          if (log.topics.includes(process.env.BICONOMY_REVERT_TOPIC)) {
            const web3 = new Web3(provider);
            reason = web3.utils.hexToAscii(log.data);
          }
        });
        throw Error(`execution reverted: ${reason}`);
      }
    } catch (err: any) {
      console.log(err);
      res.status = STATUS.ERROR;
      res.reason = err.reason;
      res.message = err.message;
      res.code = err.code;
      return res;
    }
  }

  async callContract(functionName: string, ...args: any) {
    const chainId = await this.signer.getChainId();
    if (this.supportsGasless(chainId)) {
      console.log("gassless supported will use userop");
      //call contract through userop for gasless transaction
      let options = [];
      const totalArguments = args.length;
      //reduce args to exclude options
      if (totalArguments > 1) options = args.splice(-1);
      //console.log('options before', options);
      if (options == 0) options[0] = {};
      //create smart account for signer
      const smartAccount = await this.createSmartAccount(chainId);
      const account = await smartAccount.getAccountAddress();
      const signerAddress = await this.signer.getAddress();
      //sanitize arguments to use smartaccount address
      const newArgs = args.map((_arg: any) => {
        if (
          typeof _arg === "string" &&
          _arg.toLowerCase() === signerAddress.toLowerCase()
        ) {
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
      let partialUserOp = await smartAccount.buildUserOp([tx1]);
      //query paymaster for sponsored mode to get neccesary params and update userop
      const biconomyPaymaster = smartAccount.paymaster as IHybridPaymaster<SponsorUserOperationDto>;
      try {
        const paymasterAndDataResponse =
          await biconomyPaymaster.getPaymasterAndData(partialUserOp, {
            mode: PaymasterMode.SPONSORED,
          });
        // console.log("pmR: ", paymasterAndDataResponse);
        if (paymasterAndDataResponse) {
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
        }
        return await this.callFunctionAsUserOp(smartAccount, partialUserOp);
      } catch (err) {
        console.log("sponsored failed will try erc20");
        //if userop can't be sponsored use ERC20 mode
        try {
          let finalUserOp = partialUserOp;
          //get fee quote for network cash token
          const feeQuotesResponse =
            await biconomyPaymaster.getPaymasterFeeQuotesOrData(partialUserOp, {
              mode: PaymasterMode.ERC20,
              tokenList: [process.env[`${chainId}_CASH_TOKEN_ADDRESS`]!],
            });
          // console.log("fq: ", feeQuotesResponse);
          const feeQuotes = feeQuotesResponse.feeQuotes;
          const spender = feeQuotesResponse.tokenPaymasterAddress || "";
          const tokenFeeQuotes = feeQuotes![0];
          finalUserOp = await smartAccount.buildTokenPaymasterUserOp(
            partialUserOp,
            {
              feeQuote: tokenFeeQuotes,
              spender: spender,
              maxApproval: false,
            }
          );
          let paymasterServiceData = {
            mode: PaymasterMode.ERC20,
            feeTokenAddress: tokenFeeQuotes.tokenAddress,
            calculateGasLimits: true,
          };
          const paymasterAndDataWithLimits =
            await biconomyPaymaster.getPaymasterAndData(
              finalUserOp,
              paymasterServiceData
            );
          finalUserOp.paymasterAndData =
            paymasterAndDataWithLimits.paymasterAndData;
          if (
            paymasterAndDataWithLimits.callGasLimit &&
            paymasterAndDataWithLimits.verificationGasLimit &&
            paymasterAndDataWithLimits.preVerificationGas
          ) {
            finalUserOp.callGasLimit = paymasterAndDataWithLimits.callGasLimit;
            finalUserOp.verificationGasLimit =
              paymasterAndDataWithLimits.verificationGasLimit;
            finalUserOp.preVerificationGas =
              paymasterAndDataWithLimits.preVerificationGas;
          }
          const _paymasterAndDataWithLimits =
            await biconomyPaymaster.getPaymasterAndData(
              finalUserOp,
              paymasterServiceData
            );
          finalUserOp.paymasterAndData =
            _paymasterAndDataWithLimits.paymasterAndData;
          return await this.callFunctionAsUserOp(smartAccount, finalUserOp);
        } catch (_err) {
          //if erc20 mode didn't work use ethers.js
          console.log("both sponsored and erc20 failed will use ethers: ");
          return await this.callFunctionWithEthers(functionName, ...args);
        }
      }
    } else {
      //call contract through normal ether.js
      console.log("gassless not supported will use ethers");
      return await this.callFunctionWithEthers(functionName, ...args);
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