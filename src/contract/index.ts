// SPDX-License-Identifier: BUSL-1.1

"use strict";
import { ethers, utils, Signer } from "ethers";
import { VerifiedWallet } from "../wallet";
import { createSmartAccountClient } from "@biconomy/account";
import { PaymasterConstants } from "../utils/constants";
import {
  createMeeClient,
  DEFAULT_MEE_TESTNET_SPONSORSHIP_CHAIN_ID,
  DEFAULT_MEE_TESTNET_SPONSORSHIP_PAYMASTER_ACCOUNT,
  DEFAULT_MEE_TESTNET_SPONSORSHIP_TOKEN_ADDRESS,
  DEFAULT_PATHFINDER_URL,
  getExplorerTxLink,
  getMEEVersion,
  MEEVersion,
  toMultichainNexusAccount,
} from "@biconomy/abstractjs";
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
import { http, toFunctionSelector, zeroAddress } from "viem";
import {
  createMultiChainNexusAccount,
  createNexusAccount,
} from "../lib/biconomyRNFix";
import ERC20ABI from "../abi/payments/ERC20.json";

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
  private abiRaw: any;

  constructor(address: string, abi: string, signer: VerifiedWallet | Signer) {
    this.signer = signer;
    this.abiInterface = new utils.Interface(abi);
    this.abiRaw = JSON.parse(abi);
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
  supportsGasless(chainId: number) {
    // let isSupported = false;
    // if (
    //   PaymasterConstants[`${chainId}`] &&
    //   PaymasterConstants[`${chainId}`]["PAYMASTER_API_KEY"] &&
    //   PaymasterConstants[`${chainId}`]["BUNDLER_API_KEY"]
    // )
    //   isSupported = true;
    return true;
  }

  /** Creates Biconomy smart account */
  async createSmartAccount(chainId: number) {
    // Create Biconomy Smart Account instance
    const signer = this.signer;
    const smartAccount = await createSmartAccountClient({
      signer,
      biconomyPaymasterApiKey:
        PaymasterConstants[`${chainId}`]["PAYMASTER_API_KEY"],
      bundlerUrl: `${PaymasterConstants.BUNDLER_URL_FIRST_SECTION}/${chainId}/${
        PaymasterConstants[`${chainId}`]["BUNDLER_API_KEY"]
      }`,
    });
    return smartAccount;
  }

  async fetchUserOpReceipt(userOpHash: string) {
    try {
      const chainId = await this.signer.getChainId();
      const requestData = {
        jsonrpc: "2.0",
        method: "eth_getUserOperationReceipt",
        id: Date.now(),
        params: [userOpHash],
      };
      const response = await fetch(
        `${PaymasterConstants.BUNDLER_URL_FIRST_SECTION}/${chainId}/${
          PaymasterConstants[`${chainId}`]["BUNDLER_API_KEY"]
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        },
      );
      const data = await response.json();

      return data?.result?.receipt;
    } catch (err: any) {
      console.error(
        "Error trying to fetch gassless receipt",
        err?.message || err,
      );
      return { failed: true };
    }
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

  /** Constructs and call function as userop for biconomy gassless(sponsored/erc20 mode) */
  async callFunctionAsUserOp(
    smartAccount: any,
    tx: any,
    functionName: string,
    paymentToken: string,
    ...args: any
  ) {
    //send userops transaction and construct transaction response
    let res = <SCResponse>{};
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
          hash: userOpReceipt?.transactionHash || transactionHash,
          result:
            userOpReceipt.receipt.result ||
            userOpReceipt.receipt.response ||
            userOpReceipt.receipt,
        }; //TODO: update result on response
        res.message = "";
        return res;
      } else {
        console.log("Gassless failed will try ERC20...");
        const ERC20userOpResponse = await smartAccount.sendTransaction(tx, {
          paymasterServiceData: { mode: "ERC20", preferredToken: paymentToken },
        });
        const { ERC20transactionHash } =
          await ERC20userOpResponse.waitForTxHash();
        console.log("ERC20 Transaction Hash", ERC20transactionHash);
        const userOpReceipt = await ERC20userOpResponse.wait();
        if (userOpReceipt.success == "true") {
          res.status = STATUS.SUCCESS;
          res.response = {
            hash: userOpReceipt?.transactionHash || ERC20transactionHash,
            result:
              ERC20userOpResponse.receipt.result ||
              ERC20userOpResponse.receipt.response ||
              ERC20userOpResponse.receipt,
          }; //TODO: update result on response
          res.message = "";
          return res;
        } else {
          console.error("ERC20 failed");
          console.log("will use ethers....");
          return await this.callFunctionWithEthers(functionName, ...args);
        }
      }
    } catch (err: any) {
      if (
        err?.message?.includes(
          "Try getting the receipt manually using eth_getUserOperationReceipt rpc method on bundler",
        )
      ) {
        //extract hash from message due to difference in hash???
        const messageArray = err?.message?.split(" ");
        const txHash = messageArray
          ?.find((msg: string) => msg?.startsWith("0x"))
          ?.replace(".", "");
        //wait up to max round to fetch receipt ???
        if (txHash) {
          for (
            let i = 0;
            i < Number(PaymasterConstants.MAX_WAITING_ROUND);
            i++
          ) {
            await new Promise((resolve) => setTimeout(resolve, 6000)); // 6 second delay

            console.log(
              "Gassless timeout exceeded, fetching receipt for round:",
              i + 1,
              "out of",
              Number(PaymasterConstants.MAX_WAITING_ROUND),
            );

            const _res = await this.fetchUserOpReceipt(txHash);

            if (_res && !_res?.failed && _res?.status === "0x1") {
              res.status = STATUS.SUCCESS;
              res.response = {
                hash: _res?.transactionHash || txHash,
                result: _res,
              };
              res.message = "";
              break; // Exit the loop
            } else if (_res && !_res?.failed && _res?.status !== "0x1") {
              res.status = STATUS.ERROR;
              res.response = {
                hash: _res?.transactionHash || txHash,
                result: _res,
              };
              res.message = _res?.reason || _res?.message || "";
              break; // Exit the loop
            } else if (_res && _res?.failed) {
              console.log("will use ethers....");
              return await this.callFunctionWithEthers(functionName, ...args);
            } else {
              //no receipt found?? don't call with ethers transaction may get mined???
              res.status = STATUS.ERROR; //create additional status to mark this???
              res.response = {
                hash: txHash,
                result: [],
              };
              res.message = "Transaction Pending.";
            }
          }

          return res;
        } else {
          console.error(
            "gasless transaction failed with error: ",
            "No TX-hash from error message.",
          );
          console.log("will use ethers....");
          return await this.callFunctionWithEthers(functionName, ...args);
        }
      } else {
        console.error(
          "gasless transaction failed with error: ",
          err?.message || err,
        );
        console.log("will use ethers....");
        return await this.callFunctionWithEthers(functionName, ...args);
      }
    }
  }

  /** Constructs and call function using MEE client that allows gas payment in ERC20 tokens */
  async callFunctionWithMEEClient(
    nexusAccount: any,
    chainId: number,
    rpc: string,
    tx: any,
    functionName: string,
    paymentToken: `0x${string}`,
    isSponsor?: boolean,
    signerPk?: string,
    _apiKey?: string,
    ...args: any
  ) {
    let res = <SCResponse>{};
    let txHash: any = "";
    let recp: any;
    try {
      const meeClient = PaymasterConstants.TEST_CHAINS?.includes(chainId)
        ? await createMeeClient({
            account: nexusAccount,
            url: PaymasterConstants.MEE_URL_STAGING,
            apiKey: PaymasterConstants.MEE_API_KEY_STAGING,
          })
        : await createMeeClient({
            account: nexusAccount,
            apiKey: _apiKey || PaymasterConstants.MEE_API_KEY,
          });

      const transactionInstruction = await nexusAccount.build({
        type: "default",
        data: {
          chainId,
          calls: [tx],
        },
      });

      let transferInstruction, transferTx;

      if (!isSponsor) {
        const signerAny: any = this.signer;
        const tokenContract = new ethers.Contract(
          paymentToken,
          new utils.Interface(ERC20ABI?.abi),
          signerAny,
        );
        const tokenDecimals = await tokenContract.decimals();

        const fn = tokenContract.populateTransaction["transfer"];
        const amountFmt = ethers.utils.parseUnits(
          PaymasterConstants.COMPENSATION_AMOUNT,
          Number(tokenDecimals),
        );

        const transferArgs: any = [
          PaymasterConstants.ADMIN_WALLET_ADDRESS,
          amountFmt?.toString(),
        ];
        const transferFunc = await fn(...transferArgs);
        const _transferTx = {
          to: paymentToken,
          data: transferFunc.data,
        };
        transferTx = _transferTx;
        transferInstruction = await nexusAccount.build({
          type: "default",
          data: {
            chainId,
            calls: [_transferTx],
          },
        });
      }

      const isTestnet = PaymasterConstants.TEST_CHAINS?.includes(chainId);
      let sponsorInfo;

      //Use constant gas tanks instead of fetching from server to reduce tx time???
      if (isSponsor) {
        const response = await fetch(
          "https://network.biconomy.io/v1/sponsorship/info",
          { method: "GET" },
        );

        if (!response.ok) {
          sponsorInfo = {};
        } else {
          sponsorInfo = await response.json();
        }
      }

      const sponsorUrl: any = PaymasterConstants.HOSTED_SPONSOR_URL;

      let quote, cmpQuote;

      if (isSponsor) {
        const response = await fetch(
          `${sponsorUrl}/sponsorship/sign/${sponsorInfo[isTestnet ? "84532" : "8453"]?.chainId}/${sponsorInfo[isTestnet ? "84532" : "8453"]?.account}`,
          {
            method: "POST",
            headers: {
              "cnt-tx": JSON.stringify(tx),
              "cnt-chainid": chainId?.toString(),
              "cnt-rpc": rpc,
              "cnt-isquote": "true",
              "cnt-pk": signerPk!,
            },
            body: null,
          },
        );

        if (!response.ok) {
          quote = null;
        } else {
          quote = await response.json();
        }
      } else {
        cmpQuote = await meeClient.getQuote({
          instructions: [transferInstruction],
          feeToken: { address: paymentToken, chainId },
          simulation: {
            simulate: true,
          },
        });

        quote = await meeClient.getQuote({
          instructions: [transactionInstruction],
          feeToken: { address: paymentToken, chainId },
          simulation: {
            simulate: true,
          },
        });
      }

      const nowInSec = Math.floor(Date.now() / 1000);

      const transactionInstructionFinal = await nexusAccount.build({
        type: "default",
        data: {
          chainId,
          calls: [
            {
              ...tx,
              gasLimit: quote?.userOps[quote?.userOps?.length - 1]?.maxGasLimit,
            },
          ],
        },
      });

      let transferInstructionFinal;

      if (!isSponsor) {
        transferInstructionFinal = await nexusAccount.build({
          type: "default",
          data: {
            chainId,
            calls: [
              {
                ...transferTx,
                gasLimit:
                  cmpQuote?.userOps[cmpQuote?.userOps?.length - 1]?.maxGasLimit, //use gaslLimit for transfer???
              },
            ],
          },
        });
      }

      // Execute the transaction using passed paymentToken or gasless details
      let _txHash: any;

      if (isSponsor) {
        let res;
        const response = await fetch(
          `${sponsorUrl}/sponsorship/sign/${sponsorInfo[isTestnet ? "84532" : "8453"]?.chainId}/${sponsorInfo[isTestnet ? "84532" : "8453"]?.account}`,
          {
            method: "POST",
            headers: {
              "cnt-tx": JSON.stringify({
                ...tx,
                gasLimit:
                  quote?.userOps[quote?.userOps?.length - 1]?.maxGasLimit,
              }),
              "cnt-chainid": chainId?.toString(),
              "cnt-rpc": rpc,
              "cnt-isquote": "false",
              "cnt-pk": signerPk!,
            },
            body: null,
          },
        );

        if (!response.ok) {
          res = { hash: "" };
        } else {
          res = await response.json();
        }

        _txHash = res?.hash;
      } else {
        //handle it seperately as batch kept failing???
        const { hash: cmpHash } = await meeClient.execute({
          feeToken: {
            chainId,
            address: paymentToken,
          },
          instructions: [transferInstructionFinal], //take conpensation first???

          upperBoundTimestamp: nowInSec + 299, //highest is 5 minutes???
        });

        // console.log("Compensation tx MEE hash: ", cmpHash);

        const cmpReceipt = await meeClient.waitForSupertransactionReceipt({
          hash: cmpHash,
        });

        if (cmpReceipt?.receipts?.length > 0) {
          //always pick last receipt????
          const txReceipt =
            cmpReceipt?.receipts[cmpReceipt?.receipts?.length - 1];
          if (txReceipt?.status === "success") {
            // console.log(
            //   "Compensation tx successful will move to regular transaction...",
            // );
            const { hash } = await meeClient.execute({
              feeToken: {
                chainId,
                address: paymentToken,
              },
              instructions: [transactionInstructionFinal],

              upperBoundTimestamp: nowInSec + 299, //highest is 5 minutes???
            });
            _txHash = hash;
          } else {
            res.status = STATUS.ERROR;
            res.response = {
              hash: txReceipt?.transactionHash,
              result: txReceipt,
            }; //TODO: update result on response
            res.message = "";
            return res;
          }
        } else {
          console.error(
            "MEE client transaction failed with error: ",
            "Invalid receipts length",
          );
          res.status = STATUS.ERROR;
          res.response = {
            hash: cmpReceipt?.receipts[0]?.transactionHash,
            result: cmpReceipt?.receipts[0],
          }; //TODO: update result on response
          res.message = "";
          return res;
        }
      }
      txHash = _txHash;

      console.log(`MEE transaction hash: ${_txHash}`);

      // Wait for transaction to complete
      const receipt = await meeClient.waitForSupertransactionReceipt({
        hash: _txHash,
      });

      // console.log("receipts: ", receipt);

      // console.log("receiptsss...: ", receipt?.receipts);

      if (receipt?.receipts?.length > 0) {
        //always pick last receipt????
        const txReceipt = receipt?.receipts[receipt?.receipts?.length - 1];
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
          "MEE client transaction failed with error: ",
          "Invalid receipts length",
        );
        if (isSponsor) {
          console.log("Will use ethers...");
          return await this.callFunctionWithEthers(functionName, ...args);
        } else {
          res.status = STATUS.ERROR;
          res.response = {
            hash: receipt?.receipts[0]?.transactionHash,
            result: receipt?.receipts[0],
          }; //TODO: update result on response
          res.message = "";
          return res;
        }
      }
    } catch (err: any) {
      console.error("MEE client transaction failed with error: ", err?.message);
      if (isSponsor) {
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
      console.log("read function will use ethers");
      return await this.callFunctionWithEthers(functionName, ...args);
    }
    const chainId = await this.signer.getChainId();
    if (this.supportsGasless(chainId)) {
      console.log(
        "gassless supported will use mee gas sponsorship or erc20 payment",
      );

      //call contract through userop for gasless transaction
      let options = [];
      const totalArguments = args.length;
      const optionsRaw = args.splice(-1);
      //reduce args to exclude options
      if (totalArguments > 1) options = optionsRaw;

      //console.log('options before', options);
      if (options == 0) options[0] = {};

      let fn = this.contract.populateTransaction[functionName];

      let _res = await fn(...args);

      const tx1 = {
        to: this.contract.address,
        data: _res.data,
      };
      const _signer: any = this.signer;
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
      const prov: any = this.signer.provider;
      const rpcUrl = prov?.connection?.url;
      let nexusAccount: any;

      try {
        if (optionsRaw[0]?.isReactNative) {
          nexusAccount = await createMultiChainNexusAccount({
            chains: [chainToUse!],
            transports: [
              http(
                rpcUrl ||
                  optionsRaw[0]?.rpcUrl ||
                  PaymasterConstants[Number(chainId)]?.RPC_URL,
              ),
            ],
            signer: _signer,
          });
        } else {
          nexusAccount = await toMultichainNexusAccount({
            signer: _signer,
            chainConfigurations: [
              {
                chain: chainToUse!,
                transport: http(
                  rpcUrl ||
                    optionsRaw[0]?.rpcUrl ||
                    PaymasterConstants[Number(chainId)]?.RPC_URL,
                ),
                version: getMEEVersion(MEEVersion.V2_0_0),
              },
            ],
          });
        }
        // const meeAddress = nexusAccount.addressOn(chainId);
      } catch (err) {
        console.log("Gas sponsorship failed will use ethers...");
        return await this.callFunctionWithEthers(functionName, ...args);
      }

      if (optionsRaw[0]?.paymentToken) {
        console.log(
          "Using Mee erc20 payment with paymentToken of: ",
          optionsRaw[0]?.paymentToken,
        );

        // console.log("nexus account address: ", meeAddress);
        return await this.callFunctionWithMEEClient(
          nexusAccount,
          chainId,
          rpcUrl ||
            optionsRaw[0]?.rpcUrl ||
            PaymasterConstants[Number(chainId)]?.RPC_URL,
          tx1,
          functionName,
          optionsRaw[0]?.paymentToken,
          false,
          undefined,
          optionsRaw[0]?.apiKey,
          ...args,
        );
      } else {
        console.log("Using mee gas sponsorship since no payment token...");
        const signerAny: any = this.signer;
        const signerPk = signerAny?._signingKey()?.privateKey;
        return await this.callFunctionWithMEEClient(
          nexusAccount,
          chainId,
          rpcUrl ||
            optionsRaw[0]?.rpcUrl ||
            PaymasterConstants[Number(chainId)]?.RPC_URL,
          tx1,
          functionName,
          optionsRaw[0]?.paymentToken,
          true,
          signerPk,
          optionsRaw[0]?.apiKey,
          ...args,
        );
      }
    } else {
      //call contract through normal ether.js
      console.log("gassless not supported will use ethers...");
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
      const _signer: any = this.signer;
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

      if (chainToUse) {
        const prov: any = this.signer.provider;
        const rpcUrl = prov.connection?.url;
        let nexusAccount: any;
        if (isReactNative) {
          nexusAccount = await createMultiChainNexusAccount({
            chains: [chainToUse],
            transports: [
              http(
                rpcUrl || rpc || PaymasterConstants[Number(chainId)]?.RPC_URL,
              ),
            ],
            signer: _signer,
          });
        } else {
          nexusAccount = await toMultichainNexusAccount({
            signer: _signer,
            chainConfigurations: [
              {
                chain: chainToUse!,
                transport: http(
                  rpcUrl || rpc || PaymasterConstants[Number(chainId)]?.RPC_URL,
                ),
                version: getMEEVersion(MEEVersion.V2_1_0),
              },
            ],
          });
        }

        if (paymentTokenAddress) {
          //construct calldata for function
          try {
            let fn = this.contract.populateTransaction[functionName];
            let _res = await fn(...args);
            const tx1: any = {
              to: this.contract.address,
              data: _res.data,
            };

            const meeClient = PaymasterConstants.TEST_CHAINS?.includes(chainId)
              ? await createMeeClient({
                  account: nexusAccount,
                  url: PaymasterConstants.MEE_URL_STAGING,
                  apiKey: PaymasterConstants.MEE_API_KEY_STAGING,
                })
              : await createMeeClient({
                  account: nexusAccount,
                  apiKey: _apiKey || PaymasterConstants.MEE_API_KEY,
                });

            const transactionInstruction = await nexusAccount.build({
              type: "default",
              data: {
                chainId,
                calls: [tx1],
              },
            });

            const signerAny: any = this.signer;
            const tokenContract = new ethers.Contract(
              paymentTokenAddress,
              new utils.Interface(ERC20ABI?.abi),
              signerAny,
            );
            const tokenDecimals = await tokenContract.decimals();

            const fnTransfer = tokenContract.populateTransaction["transfer"];
            const amountFmt = ethers.utils.parseUnits(
              PaymasterConstants.COMPENSATION_AMOUNT,
              Number(tokenDecimals),
            );
            const transferArgs: any = [
              PaymasterConstants.ADMIN_WALLET_ADDRESS,
              amountFmt?.toString(),
            ];
            const transferFunc = await fnTransfer(...transferArgs);
            const transferTx = {
              to: paymentTokenAddress,
              data: transferFunc.data,
            };
            const transferInstruction = await nexusAccount.build({
              type: "default",
              data: {
                chainId,
                calls: [transferTx],
              },
            });

            const tkAddress: any = paymentTokenAddress;

            const cmpQuote = await meeClient.getQuote({
              instructions: [transferInstruction],
              feeToken: { address: tkAddress, chainId },
            });

            const quote = await meeClient.getQuote({
              instructions: [transactionInstruction],
              feeToken: { address: tkAddress, chainId },
            });

            const cmpQuoteDt = {
              tokenAddress: paymentTokenAddress,
              amount: (
                Number(cmpQuote?.paymentInfo.tokenAmount) +
                Number(PaymasterConstants.COMPENSATION_AMOUNT)
              )?.toString(),
              amountInWei: (
                Number(cmpQuote?.paymentInfo.tokenWeiAmount) + Number(amountFmt)
              )?.toString(),
              amountValue: (
                Number(cmpQuote?.paymentInfo.tokenValue) +
                (Number(cmpQuote?.paymentInfo.tokenAmount) /
                  Number(cmpQuote?.paymentInfo.tokenValue)) *
                  Number(PaymasterConstants.COMPENSATION_AMOUNT)
              )?.toString(),
              chainId,
              functionName: "transfer",
            };

            return {
              tokenAddress: paymentTokenAddress,
              amount: (
                Number(quote?.paymentInfo.tokenAmount) +
                Number(cmpQuoteDt?.amount)
              )?.toString(),
              amountInWei: (
                Number(quote?.paymentInfo.tokenWeiAmount) +
                Number(cmpQuoteDt?.amountInWei)
              )?.toString(),
              amountValue: (
                Number(quote?.paymentInfo.tokenValue) +
                Number(cmpQuoteDt?.amountValue)
              )?.toString(),
              chainId,
              functionName,
            };
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
