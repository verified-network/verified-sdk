// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES, Options } from "../index";
import { VerifiedWallet } from "../../../wallet";
import { abi, networks } from "../../abi/distribution/Distribution.json";

enum FUNCTIONS {
  ADDREVENUESHAREHOLDER = "addRevenueShareholder",
  GETREVENUESHAREHOLDER = "getRevenueShareholders",
  GETPAYMENTFEECOLLECTED = "getPaymentFeeCollected",
  GETLOANFEECOLLECTED = "getLoanFeeCollected",
  GETISSUINGFEECOLLECTED = "getIssuingFeeCollected",
  GETTRADINGFEECOLLECTED = "getTradingFeeCollected",
  SHAREFEE = "shareFee",
  SHARECOLLECTION = "shareCollection",
  REVENUESHARE = "RevenueShare",
}

export default class Distribution extends VerifiedContract {
  public contractAddress: string;

  constructor(signer: VerifiedWallet, contractNetworkAddress: string) {
    const address = contractNetworkAddress;
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

  /**
        Shares fee income with revenue shareholders
     */
  public async shareFee(): any {
    return this.callContract(FUNCTIONS.SHAREFEE);
  }

  public async shareCollection(): any {
    return this.callContract(FUNCTIONS.SHARECOLLECTION);
  }

  /**
        Gets payment fee collected
        @param  _currency   payment fee in currency collected
     */
  public async getPaymentFeeCollected(
    _currency: string,
    options?: Options,
  ): any {
    await this.validateInput(DATATYPES.STRING, _currency);
    return this.callContract(
      FUNCTIONS.GETPAYMENTFEECOLLECTED,
      this.sanitiseInput(DATATYPES.BYTE32, _currency),
      options,
    );
  }

  /**
        Gets loan fee collected
        @param  _currency   loan fee in currency collected
     */
  public async getLoanFeeCollected(_currency: string, options?: Options): any {
    await this.validateInput(DATATYPES.STRING, _currency);
    return this.callContract(
      FUNCTIONS.GETLOANFEECOLLECTED,
      this.sanitiseInput(DATATYPES.BYTE32, _currency),
      options,
    );
  }

  /**
        Get revenue shareholders
        @param  _type       type of shareholder, ie, 'BUSINESS' or 'OPERATOR'
        @param  _currency   currency revenue is collected
     */
  public async getRevenueShareholders(
    _type: string,
    _currency: string,
    options?: Options,
  ): any {
    await this.validateInput(DATATYPES.STRING, _type);
    await this.validateInput(DATATYPES.ADDRESS, _currency);
    return this.callContract(
      FUNCTIONS.GETREVENUESHAREHOLDER,
      this.sanitiseInput(DATATYPES.BYTE32, _type),
      _currency,
      options,
    );
  }

  /**
        Add revenue shareholders
        @param  _type           type of shareholder, ie, 'BUSINESS' or 'OPERATOR'
        @param  _shareholder    address of shareholder to add
        @param  _currency       currency revenue is collected
     */
  public async addRevenueShareholder(
    _type: string,
    _shareholder: string,
    _currency: string,
    options?: Options,
  ): any {
    await this.validateInput(DATATYPES.STRING, _type);
    await this.validateInput(DATATYPES.STRING, _shareholder);
    await this.validateInput(DATATYPES.ADDRESS, _currency);
    return this.callContract(
      FUNCTIONS.ADDREVENUESHAREHOLDER,
      this.sanitiseInput(DATATYPES.BYTE32, _type),
      _shareholder,
      _currency,
      options,
    );
  }

  public async getIssuingFeeCollected(
    _platform: string,
    _token: string,
    options?: Options,
  ): any {
    await this.validateInput(DATATYPES.ADDRESS, _platform);
    await this.validateInput(DATATYPES.ADDRESS, _token);
    return this.callContract(
      FUNCTIONS.GETISSUINGFEECOLLECTED,
      _platform,
      _token,
      options,
    );
  }

  public async getTradingFeeCollected(
    _platform: string,
    _token: string,
    options?: Options,
  ): any {
    await this.validateInput(DATATYPES.ADDRESS, _platform);
    await this.validateInput(DATATYPES.ADDRESS, _token);
    return this.callContract(
      FUNCTIONS.GETTRADINGFEECOLLECTED,
      _platform,
      _token,
      options,
    );
  }

  public notifyRevenueShare(callback: any): object {
    this.getEvent(FUNCTIONS.REVENUESHARE, callback);
  }
}
