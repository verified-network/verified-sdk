// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES, Options } from "../../index";
import { VerifiedWallet } from "../../../wallet";
import {
  abi,
  networks,
} from "../../../abi/loans/compound/VerifiedMarkets.json";

enum FUNCTIONS {
  NEWRWA = "submitNewRWA",
  POSTCOLLATERAL = "postCollateral",
  BORROW = "borrowBase",
  REPAY = "repayBase",
}

export default class Compound extends VerifiedContract {
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
    rpcUrl?: string
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
      apiKey
    );
  }

  public setSigner(_address: string): any {
    return this.callContract(FUNCTIONS.SETSIGNER, _address);
  }

  /**
   * Submits new RWA to Compound
   * @params (address asset, address bond, uint256 apy, string memory issuingDocs, uint256 faceValue)
   * @returns
   */
  public async submitNewRWA(
    asset: string,
    bond: string,
    apy: string,
    issuingDocs: string,
    faceValue: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.ADDRESS, asset);
    await this.validateInput(DATATYPES.ADDRESS, bond);
    await this.validateInput(DATATYPES.NUMBER, apy);
    await this.validateInput(DATATYPES.STRING, issuingDocs);
    await this.validateInput(DATATYPES.NUMBER, faceValue);
    return this.callContract(
      FUNCTIONS.NEWRWA,
      asset,
      bond,
      apy,
      issuingDocs,
      faceValue,
      options
    );
  }

  /**
   * Posts collateral to Compound
   * @params (address asset, address collateral, uint256 amount)
   * @returns
   */
  public async postCollateral(
    asset: string,
    collateral: string,
    amount: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.ADDRESS, asset);
    await this.validateInput(DATATYPES.ADDRESS, collateral);
    await this.validateInput(DATATYPES.NUMBER, amount);
    return this.callContract(
      FUNCTIONS.POSTCOLLATERAL,
      asset,
      collateral,
      amount,
      options
    );
  }

  /**
   * Borrows from Compound
   * @params (address base, uint256 amount)
   * @returns
   */
  public async borrowBase(
    base: string,
    amount: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.ADDRESS, base);
    await this.validateInput(DATATYPES.NUMBER, amount);
    return this.callContract(FUNCTIONS.BORROW, base, amount, options);
  }

  /**
   * Repays to Compound
   * @params (address base, uint256 amount)
   * @returns
   */
  public async repayBase(base: string, amount: string, options?: Options): any {
    await this.validateInput(DATATYPES.ADDRESS, base);
    await this.validateInput(DATATYPES.NUMBER, amount);
    return this.callContract(FUNCTIONS.REPAY, base, amount, options);
  }
}
