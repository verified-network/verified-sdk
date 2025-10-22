// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES, Options } from "../../index";
import { VerifiedWallet } from "../../../wallet";
import {
  abi,
  networks,
} from "../../../abi/loans/compound/VerifiedMarkets.json";

enum FUNCTIONS {
  SUBMITNEWRWA = "submitNewRWA",
  POSTCOLLATERAL = "postCollateral",
  BORROWBASE = "borrowBase",
  REPAYBASE = "repayBase",
  WITHDRAWCOLLATERAL = "withdrawCollateral",
  REPAYLENDERS = "repayLenders",
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

  public setSigner(_address: string, options?: Options): any {
    await this.validateInput(DATATYPES.ADDRESS, _address);
    return this.callContract(FUNCTIONS.SETSIGNER, _address, options);
  }

  /**
   * Submits new RWA to Compound
   * @params (address asset, address bond, uint256 apy, string memory issuingDocs, uint256 frequency, address factory)
   * @returns
   */

  public async submitNewRWA(
    asset: string,
    bond: string,
    apy: string,
    issuingDocs: string,
    frequency: string,
    factory: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.ADDRESS, asset);
    await this.validateInput(DATATYPES.ADDRESS, bond);
    await this.validateInput(DATATYPES.NUMBER, apy);
    await this.validateInput(DATATYPES.STRING, issuingDocs);
    await this.validateInput(DATATYPES.NUMBER, faceValue);
    await this.validateInput(DATATYPES.ADDRESS, factory);
    return this.callContract(
      FUNCTIONS.SUBMITNEWRWA,
      asset,
      bond,
      apy,
      issuingDocs,
      frequency,
      factory,
      options
    );
  }

  /**
   * Posts collateral to Compound
   * @params (address bond, address issuer, address factory)
   * @returns
   */
  public async postCollateral(
    bond: string,
    issuer: string,
    factory: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.ADDRESS, bond);
    await this.validateInput(DATATYPES.ADDRESS, issuer);
    await this.validateInput(DATATYPES.ADDRESS, factory);
    return this.callContract(
      FUNCTIONS.POSTCOLLATERAL,
      bond,
      issuer,
      factory,
      options
    );
  }

  /**
   * Borrows from Compound
   * @params (address asset, uint256 amount)
   * @returns
   */
  public async borrowBase(asset: string, options?: Options): any {
    await this.validateInput(DATATYPES.ADDRESS, asset);
    return this.callContract(FUNCTIONS.BORROWBASE, asset, options);
  }

  /**
   * Repays to Compound
   * @params (address asset, uint256 amount)
   * @returns
   */
  public async repayBase(
    asset: string,
    amount: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.ADDRESS, asset);
    await this.validateInput(DATATYPES.NUMBER, amount);
    return this.callContract(FUNCTIONS.REPAYBASE, asset, amount, options);
  }

  /**
   * Withdraws collateral
   * @params (address bond, address issuer, address factory)
   * @returns
   */
  public async withdrawCollateral(
    bond: string,
    issuer: string,
    factory: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.ADDRESS, bond);
    await this.validateInput(DATATYPES.ADDRESS, issuer);
    await this.validateInput(DATATYPES.ADDRESS, factory);
    return this.callContract(
      FUNCTIONS.WITHDRAWCOLLATERAL,
      bond,
      issuer,
      factory,
      options
    );
  }

  public async repayLenders(
    asset: string,
    collateral: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.ADDRESS, asset);
    await this.validateInput(DATATYPES.ADDRESS, collateral);
    return this.callContract(
      FUNCTIONS.REPAYLENDERS,
      asset,
      collateral,
      options
    );
  }
}
