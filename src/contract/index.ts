// SPDX-License-Identifier: BUSL-1.1
"use strict";
import { ethers, utils, Signer } from "ethers";
import { VerifiedWallet } from "../wallet";
import { PaymasterConstants } from "../utils/constants";
import {
  baseSepolia,
  mainnet,
  sepolia,
  gnosis,
  base,
  polygon,
  arbitrum,
  arbitrumSepolia,
} from "viem/chains";

enum STATUS {
  SUCCESS,
  ERROR,
}
interface SCResponse {
  response: object;
  status: STATUS;
  message: string;
  reason: string;
  code: number;
}

export enum DATATYPES {
  NUMBER = "number",
  STRING = "string",
  ADDRESS = "address",
  BOOLEAN = "boolean",
  BYTE32 = "byte32",
  BYTE16 = "byte16",
  BIGNUMBER = "bignumber",
}

export type Options = {
  gasPrice?: number;
  gasLimit?: number;
  paymentToken?: string;
  apiKey?: string;
  rpcUrl?: string;
  isReactNative?: boolean;
};

export class VerifiedContract {
  private signer: VerifiedWallet | Signer;
  private contract: ethers.Contract;
  private abiInterface: utils.Interface;

  constructor(address: string, abi: string, signer: VerifiedWallet | Signer) {
    this.signer = signer;
    this.abiInterface = new utils.Interface(abi);
    this.contract = new ethers.Contract(address, this.abiInterface, signer);
  }

  protected async validateInput(type: DATATYPES, data: any) {
    let error: string = "";
    let status: boolean = true;

    switch (type) {
      case DATATYPES.ADDRESS:
        if (utils.isAddress(data)) error = "Invalid address value";
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
          return utils.formatBytes32String(data);
        case DATATYPES.BYTE16:
          /**
           * Returns a bytes16 string representation of text.
           * If the length of text exceeds 31 bytes, it will throw an error.
           * @params (text)
           * @returns ⇒ string
           */
          return utils.formatBytes32String(data).slice(16);
        case DATATYPES.NUMBER:
          /**
           * Returns a BigNumber representation of value, parsed with unit digits
           * (if it is a number) or from the unit specified (if a string).
           * @param ( value [ , unit = "ether" ] )
           * @returns ⇒ BigNumber
           */
          return utils.parseUnits(data);
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

  protected sanitiseOutput(type: DATATYPES, data: any) {
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
        return utils.parseBytes32String(finalData);
      case DATATYPES.NUMBER:
        /**
         * Returns a string representation of value formatted with unit
         * digits (if it is a number) or to the unit specified (if a string).
         * @params ( value [ , unit = "ether" ] )
         * @returns ⇒ string
         */
        return utils.formatUnits(data);

      case DATATYPES.BIGNUMBER:
        return data.toString();
      case DATATYPES.STRING:
        return utils.toUtf8String(data);

      default:
        return data;
    }
  }

  /**
   * gets a function state mutability to differenciate between read and write functions
   * @param functionName
   * @returns true or false
   */
  private isReadFunction(functionName: string): boolean {
    const functionFragment = this.abiInterface.getFunction(functionName);
    if (!functionFragment) {
      throw new Error(`Function ${functionName} not found in ABI`);
    }
    return (
      functionFragment.stateMutability === "view" ||
      functionFragment.stateMutability === "pure"
    );
  }

  /**
   * Parses output to standard response
   * @param data
   * @returns
   */
  private tempOutput(data: any): object {
    const response: { hash: string; result: Array<any> } = {
      hash: "",
      result: [],
    };
    data.forEach(async (element: any) => {
      if (element.hash !== undefined || element.transactionHash) {
        return (response.hash = element.hash || element.transactionHash);
      } else if (element._isBigNumber) {
        return response.result.push(element.toString());
      } else if (utils.isAddress(element)) {
        return response.result.push(element);
      }
      //if (utils.isBytesLike(element)) return response.result.push(this.sanitiseOutput(DATATYPES.BYTE32, element))
      else if (utils.isBytesLike(element)) {
        return response.result.push(element);
      } else if (typeof element === "boolean") {
        return response.result.push(element);
      } else {
        return response.result.push(element);
      }
    });
    return response;
  }
  /** Converts any datatype to array */
  private convertToArray(data: any) {
    if (Array.isArray(data)) return data;
    else return [data];
  }

  /** Checks if a contract support gasless transaction */
  supportsGasless(chainId?: number) {
    return true;
  }

  /** Constructs and call function with ethers.js */
  async callFunctionWithEthers(functionName: string, ...args: any) {
    let res = <SCResponse>{};
    try {
      let options = [];
      const totalArguments = args.length;
      if (totalArguments > 1) options = args.splice(-1);
      if (options == 0) options[0] = {};
      /**
       * Actual Function call using Ethers.js
       */
      let fn = this.contract[functionName];
      let _res = await fn(...args, ...options);
      let _resp = _res.wait !== undefined ? await _res.wait(_res) : _res;
      res.response = this.tempOutput(
        this.convertToArray(utils.deepCopy(_resp)),
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

  /** Constructs and call function using Alchemy client that allows gassless sponsorship and payment in ERC20 tokens */
  async callFunctionWithAlchemyClient(
    chainId: number,
    tx: any,
    functionName: string,
    paymentToken: `0x${string}`,
    pk: string,
    isSponsor?: boolean,
    ...args: any
  ) {
    let res = <SCResponse>{};
    let txHash: any = "";
    try {
      const sponsorUrl: any = PaymasterConstants.HOSTED_SPONSOR_URL;

      let quote;

      // Execute the transaction using passed paymentToken or sponsored gasless

      if (isSponsor) {
        const response = await fetch(
          `${sponsorUrl}/sponsorship/sign/${chainId?.toString()}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              isSponsored: true,
              pk,
              tx,
            }),
          },
        );

        if (!response.ok) {
          quote = null;
        } else {
          quote = await response.json();
        }
      } else {
        const response = await fetch(
          `${sponsorUrl}/sponsorship/sign/${chainId?.toString()}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              isSponsored: false,
              paymentToken,
              pk,
              tx,
            }),
          },
        );

        if (!response.ok) {
          quote = null;
        } else {
          quote = await response.json();
        }
      }

      if (quote && quote?.receipts?.length > 0) {
        //always pick last receipt????
        const txReceipt = quote?.receipts[quote?.receipts?.length - 1];
        if (txReceipt?.status === "success") {
          res.status = STATUS.SUCCESS;
          res.response = {
            hash: txReceipt?.transactionHash,
            result: txReceipt,
          }; //TODO: update result on response
          res.message = "";
        } else {
          if (isSponsor) {
            console.log("Will use ethers...");
            return await this.callFunctionWithEthers(functionName, ...args);
          } else {
            res.status = STATUS.ERROR;
            res.response = {
              hash: txReceipt?.transactionHash,
              result: txReceipt,
            }; //TODO: update result on response
            res.message = "";
          }
        }
        return res;
      } else {
        console.error(
          "Gassless/ERC20 transaction failed with error: ",
          "Invalid receipts length",
        );
        if (isSponsor) {
          console.log("Will use ethers...");
          return await this.callFunctionWithEthers(functionName, ...args);
        } else {
          res.status = STATUS.ERROR;
          res.response = {
            hash: "",
            result: {},
          }; //TODO: update result on response
          res.message = "";
          return res;
        }
      }
    } catch (err: any) {
      console.error(
        "Gassless/ERC20 payment transaction failed with error: ",
        err?.message,
      );
      if (isSponsor) {
        //for sponsored transaction. Fallback to ethers
        console.log("Will use ethers...");
        return await this.callFunctionWithEthers(functionName, ...args);
      } else {
        res.status = STATUS.ERROR;
        res.response = {
          hash: txHash,
          result: {},
        }; //TODO: update result on response
        res.message = "";
        return res;
      }
    }
  }

  async callContract(functionName: string, ...args: any) {
    // Check if the function is a read function
    if (this.isReadFunction(functionName)) {
      console.log("read function will use ethers...");
      return await this.callFunctionWithEthers(functionName, ...args);
    }
    const chainId = await this.signer.getChainId();
    if (this.supportsGasless(chainId)) {
      console.log(
        "gassless supported will use gassless sponsorship or erc20 payment",
      );

      //call contract through userop for gasless transaction
      let options = [];
      const totalArguments = args.length;
      const optionsRaw = args.splice(-1);
      //reduce args to exclude options
      if (totalArguments > 1) options = optionsRaw;

      if (options == 0) options[0] = {};

      let fn = this.contract.populateTransaction[functionName];

      let _res = await fn(...args);

      const tx1 = {
        to: this.contract.address,
        data: _res.data,
      };

      const chainToUse = [
        base,
        mainnet,
        gnosis,
        polygon,
        sepolia,
        baseSepolia,
        arbitrum,
        arbitrumSepolia,
      ].find((nt) => Number(nt?.id) === Number(chainId));
      if (!chainToUse) {
        throw new Error(
          `Chaind id: ${chainId} not supported on Verified Sdk. Supported chain ids are: ${[
            base,
            mainnet,
            gnosis,
            polygon,
            sepolia,
            baseSepolia,
            arbitrum,
            arbitrumSepolia,
          ]
            ?.map((nt) => nt?.id)
            ?.join(", ")}`,
        );
      }

      const signerAny: any = this.signer;
      const signerPk = signerAny?._signingKey?.()?.privateKey;

      if (!signerPk) {
        //no pk on signer. Assume it's web wallets and use ethers
        console.log("Signer incomplete, will use ethers");
        return await this.callFunctionWithEthers(functionName, ...args);
      } else if (signerPk) {
        //pk exists signer. try gassless/erc20 first then ethers if they failed
        if (optionsRaw[0]?.paymentToken) {
          console.log(
            "Using ERC20 payment with paymentToken of: ",
            optionsRaw[0]?.paymentToken,
          );

          return await this.callFunctionWithAlchemyClient(
            chainId,
            tx1,
            functionName,
            optionsRaw[0]?.paymentToken,
            signerPk,
            undefined,
            ...args,
          );
        } else {
          console.log("Using gassless sponsorship since no payment token");
          return await this.callFunctionWithAlchemyClient(
            chainId,
            tx1,
            functionName,
            "0x",
            signerPk,
            true,
            ...args,
          );
        }
      }
    } else {
      //call contract through normal ether.js
      console.log("Gassless not supported for this chain will use ethers");
      return await this.callFunctionWithEthers(functionName, ...args);
    }
  }

  async getQuote(
    paymentTokenAddress: string,
    functionName: string,
    args: any[],
    rpc?: string,
    _apiKey?: string,
    isReactNative?: boolean,
  ) {
    const chainId = await this.signer.getChainId();
    if (this.supportsGasless(chainId)) {
      const chainToUse = [
        base,
        mainnet,
        gnosis,
        polygon,
        sepolia,
        baseSepolia,
        arbitrum,
        arbitrumSepolia,
      ].find((nt) => Number(nt?.id) === Number(chainId));

      const signerAny: any = this.signer;
      const signerPk = signerAny?._signingKey?.()?.privateKey;

      if (chainToUse && paymentTokenAddress && signerPk) {
        try {
          let fn = this.contract.populateTransaction[functionName];
          let _res = await fn(...args);
          const tx1: any = {
            to: this.contract.address,
            data: _res.data,
          };

          const sponsorUrl: any = PaymasterConstants.HOSTED_SPONSOR_URL;

          const response = await fetch(
            `${sponsorUrl}/sponsorship/fee/${chainId?.toString()}?paymentToken=${paymentTokenAddress}&pk=${signerPk}&tx=${JSON.stringify(tx1)}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          if (response.ok) {
            const feeRes = (await response.json()) || { maxAmount: "0" };
            return {
              tokenAddress: paymentTokenAddress,
              amount: feeRes?.maxAmount,
              amountInWei: feeRes?.maxAmount,
              amountValue: feeRes?.maxAmount,
              chainId,
              functionName,
            };
          }
        } catch (err: any) {
          if (
            err?.message?.includes("fn is not a function") ||
            err?.message?.includes("fnTransfer is not a function")
          ) {
            console.error(
              `Function ${functionName} not found in contract's ABI`,
            );
          } else if (err?.message?.includes("code=INVALID_ARGUMENT")) {
            console.error(`Invalid arguments type`);
          }
          console.error(err?.message || "getQuote failed.");
        }
      }
    }
    return {
      tokenAddress: "",
      amount: "0",
      amountInWei: "0",
      amouuntValue: "0",
      chainId,
      functionName,
    };
  }

  protected getEvent(eventName: string, callback: any) {
    let res = <SCResponse>{};
    this.contract.once(eventName, (...data: any) => {
      const dataToBeFormatted = data.splice(0, data.length - 1);
      res.response = this.tempOutput(utils.deepCopy(dataToBeFormatted));
      res.status = STATUS.SUCCESS;
      res.message = "";
      callback(res);
    });
  }
}
