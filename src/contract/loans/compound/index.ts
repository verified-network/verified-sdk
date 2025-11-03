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

  public async setSigner(_address: string, options?: Options): any {
    await this.validateInput(DATATYPES.ADDRESS, _address);
    return this.callContract(FUNCTIONS.SETSIGNER, _address, options);
  }

  /**
   * Submits new RWA to Compound
   * @params submitNewRWA(
        address asset,
        address collateral,
        address bond,
        uint256 apy,
        string memory issuingDocs,
        uint256 frequency,
        uint256 faceValue,
        address factory
    )
   * @returns
   */

  public async submitNewRWA(
    asset: string,
    collateral: string,
    bond: string,
    apy: string,
    issuingDocs: string,
    frequency: string,
    faceValue: string,
    factory: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.ADDRESS, asset);
    await this.validateInput(DATATYPES.ADDRESS, collateral);
    await this.validateInput(DATATYPES.ADDRESS, bond);
    await this.validateInput(DATATYPES.NUMBER, apy);
    await this.validateInput(DATATYPES.STRING, issuingDocs);
    await this.validateInput(DATATYPES.NUMBER, frequency);
    await this.validateInput(DATATYPES.NUMBER, faceValue);
    await this.validateInput(DATATYPES.ADDRESS, factory);
    return this.callContract(
      FUNCTIONS.SUBMITNEWRWA,
      asset,
      collateral,
      bond,
      apy,
      issuingDocs,
      frequency,
      faceValue,
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
   * @params (address bond)
   * @returns
   */
  public async borrowBase(bond: string, options?: Options): any {
    await this.validateInput(DATATYPES.ADDRESS, bond);
    return this.callContract(FUNCTIONS.BORROWBASE, bond, options);
  }

  /**
   * Repays to Compound
   * @params (address bond, uint256 amount)
   * @returns
   */
  public async repayBase(bond: string, amount: string, options?: Options): any {
    await this.validateInput(DATATYPES.ADDRESS, bond);
    await this.validateInput(DATATYPES.NUMBER, amount);
    return this.callContract(FUNCTIONS.REPAYBASE, bond, amount, options);
  }

  /**
   * Withdraws collateral
   * @params (address bond, address issuer)
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
    return this.callContract(
      FUNCTIONS.WITHDRAWCOLLATERAL,
      bond,
      issuer,
      options
    );
  }

  public async repayLenders(
    bond: string,
    collateral: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.ADDRESS, bond);
    await this.validateInput(DATATYPES.ADDRESS, collateral);
    return this.callContract(FUNCTIONS.REPAYLENDERS, bond, collateral, options);
  }
}
