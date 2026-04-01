// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from "../../index";
import { VerifiedWallet } from "../../../wallet";
import {
  abi,
  networks,
} from "../../../abi/assetmanager/balancer/SecondaryIssueManager.json";

enum FUNCTIONS {
  ISSUESECONDARY = "issueSecondary",
  SETISSUINGFEE = "setIssuingFee",
  GETSETTLEMENTREQUESTS = "getSettlementRequests",
  GETSETTLEMENTREQUEST = "getSettlementRequest",
  SETSETTLEMENTSTATUS = "setSettlementStatus",
  GETSUBSCRIBERS = "getSubscribers",
  CLOSE = "close",
}

export default class SecondaryIssueManager extends VerifiedContract {
  public contractAddress: string;

  constructor(signer: VerifiedWallet, contractNetworkAddress: string) {
    const address = contractNetworkAddress;
    //const chainId: string = Object.keys(networks)
    //const address = networks[chainId].address
    super(address, JSON.stringify(abi), signer);

    this.contractAddress = address;
  }

  public async _getMeeQuote(
    paymentTokenAddress: string,
    functionName: string,
    args: any[],
    apiKey?: string,
    rpcUrl?: string,
    isReactNative?: boolean,
  ): Promise<{
    tokenAddress: string;
    amount: string;
    amountInWei: string;
    amouuntValue: string;
    chainId: number;
    functionName: string;
  }> {
    return await this.getQuote(
      paymentTokenAddress,
      functionName,
      args,
      rpcUrl,
      apiKey,
      isReactNative,
    );
  }

  public async issueSecondary(
    security: string,
    currency: string,
    securityOutstanding: string,
    securityAmount: string,
    minOrderSize: string,
    currencyAmount: string,
    options?: Options,
  ): any {
    await this.validateInput(DATATYPES.ADDRESS, security);
    await this.validateInput(DATATYPES.ADDRESS, currency);
    await this.validateInput(DATATYPES.NUMBER, securityOutstanding);
    await this.validateInput(DATATYPES.NUMBER, securityAmount);
    await this.validateInput(DATATYPES.NUMBER, minOrderSize);
    await this.validateInput(DATATYPES.NUMBER, currencyAmount);
    return this.callContract(
      FUNCTIONS.ISSUESECONDARY,
      security,
      currency,
      securityOutstanding,
      securityAmount,
      minOrderSize,
      currencyAmount,
      options,
    );
  }

  public async setIssuingFee(
    security: string,
    currency: string,
    swapfee: string,
    options?: Options,
  ): any {
    await this.validateInput(DATATYPES.ADDRESS, security);
    await this.validateInput(DATATYPES.ADDRESS, currency);
    await this.validateInput(DATATYPES.NUMBER, swapfee);
    return this.callContract(
      FUNCTIONS.SETISSUINGFEE,
      security,
      currency,
      swapfee,
      options,
    );
  }

  public async getSettlementRequests(
    dpid: string,
    poolid: string,
    options?: Options,
  ): any {
    await this.validateInput(DATATYPES.STRING, dpid);
    await this.validateInput(DATATYPES.STRING, poolid);
    return this.callContract(
      FUNCTIONS.GETSETTLEMENTREQUESTS,
      this.sanitiseInput(DATATYPES.BYTE32, dpid),
      poolid,
      options,
    );
  }

  public async getSettlementRequest(ref: string, options?: Options): any {
    await this.validateInput(DATATYPES.STRING, ref);
    return this.callContract(FUNCTIONS.GETSETTLEMENTREQUEST, ref, options);
  }

  public async setSettlementStatus(
    ref: string,
    status: string,
    options?: Options,
  ): any {
    await this.validateInput(DATATYPES.STRING, ref);
    await this.validateInput(DATATYPES.STRING, status);
    return this.callContract(
      FUNCTIONS.SETSETTLEMENTSTATUS,
      ref,
      this.sanitiseInput(DATATYPES.BYTE32, status),
      options,
    );
  }

  public async getSubscribers(poolId: string, options?: Options): any {
    await this.validateInput(DATATYPES.STRING, poolId);
    return this.callContract(FUNCTIONS.GETSUBSCRIBERS, poolId, options);
  }

  public async close(poolId: string, options?: Options): any {
    await this.validateInput(DATATYPES.STRING, poolId);
    return this.callContract(FUNCTIONS.CLOSE, poolId, options);
  }
}
