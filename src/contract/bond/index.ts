// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES, Options } from "../index";
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from "../../abi/payments/Bond.json";

enum FUNCTIONS {
  REQUESTISSUE = "requestIssue",
  REQUESTPURCHASE = "requestPurchase",
  REQUESTREDEMPTION = "requestRedemption",
  GETBONDS = "getBonds",
  GETBONDISSUES = "getBondIssues",
  GETBONDPURCHASES = "getBondPurchases",
  ISSUE = "BondIssued",
  REDEEM = "BondRedeemed",
  PURCHASE = "BondPurchased",
  LIQUIDATE = "BondLiquidated",
  TRANSFERFROM = "transferFrom",
  NAME = "name",
  SYMBOL = "symbol",
  TOTALSUPPLY = "totalSupply",
  BALANCE = "balanceOf",
  DECIMALS = "decimals",
  TRANSFER = "transfer",
  APPROVE = "approve",
  ALLOWANCE = "allowance",
  TRANSFERFROM = "transferFrom",
  INCREASEALLOWANCE = "increaseAllowance",
  DECREASEALLOWANCE = "decreaseAllowance",
}

export default class Bond extends VerifiedContract {
  public contractAddress: string;

  constructor(signer: VerifiedWallet, bondCurrencyAddress: string) {
    const address = bondCurrencyAddress;
    super(address, JSON.stringify(abi), signer);

    this.contractAddress = address;
  }

  public async _getMeeQuote(
    paymentTokenAddress: string,
    functionName: string,
    args: any[]
  ): Promise<{
    tokenAddress: string;
    amount: string;
    amountInWei: string;
    amouuntValue: string;
    chainId: number;
    functionName: string;
  }> {
    return await this.getQuote(paymentTokenAddress, functionName, args);
  }

  public async requestIssue(
    _amount: string,
    _payer: string,
    _currency: string,
    _cashContract: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.NUMBER, _amount);
    await this.validateInput(DATATYPES.ADDRESS, _payer);
    await this.validateInput(DATATYPES.STRING, _currency);
    await this.validateInput(DATATYPES.ADDRESS, _cashContract);
    return this.callContract(
      FUNCTIONS.REQUESTISSUE,
      _amount,
      _payer,
      this.sanitiseInput(DATATYPES.BYTE32, _currency),
      _cashContract,
      options
    );
  }

  public async requestPurchase(
    _amount: string,
    _payer: string,
    _currency: string,
    _cashContract: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.NUMBER, _amount);
    await this.validateInput(DATATYPES.ADDRESS, _payer);
    await this.validateInput(DATATYPES.STRING, _currency);
    await this.validateInput(DATATYPES.ADDRESS, _cashContract);
    return this.callContract(
      FUNCTIONS.REQUESTPURCHASE,
      _amount,
      _payer,
      this.sanitiseInput(DATATYPES.BYTE32, _currency),
      _cashContract,
      options
    );
  }

  public async requestRedemption(
    _amount: string,
    _payer: string,
    _currency: string,
    _tokenContract: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.NUMBER, _amount);
    await this.validateInput(DATATYPES.ADDRESS, _payer);
    await this.validateInput(DATATYPES.STRING, _currency);
    await this.validateInput(DATATYPES.ADDRESS, _tokenContract);
    return this.callContract(
      FUNCTIONS.REQUESTREDEMPTION,
      _amount,
      _payer,
      this.sanitiseInput(DATATYPES.BYTE32, _currency),
      _tokenContract,
      options
    );
  }

  /*
   * Gets bond issued address
   * @param ()
   * @returns address[] memory
   */
  public async getBonds(): any {
    return this.callContract(FUNCTIONS.GETBONDS);
  }

  /**
   * Fetch bonds issued with their balance amounts to redeem [callable by client]
   * entries is count of results to return. Address[] has issued bond addresses, and uint[] has issued amount
   * @param ()
   * @returns (bytes16 parValue, bytes16 paidInAmount, bytes32 paidInCurrency, uint256 timeIssuedSubscribed)
   */
  public async getBondIssues(
    _issuer: string,
    _bond: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.ADDRESS, _issuer);
    await this.validateInput(DATATYPES.ADDRESS, _bond);
    return this.callContract(FUNCTIONS.GETBONDISSUES, _issuer, _bond, options);
  }

  /**
   * Fetch bonds purchased with their purchased amounts [callable by client]
   * entries is count of results to return. Address[] has purchased bond addresses, and uint[] has purchased amount
   * @param ()
   * @returns (bytes16 parValue, bytes16 paidInAmount, bytes32 paidInCurrency, uint256 timeIssuedSubscribed)
   */
  public async getBondPurchases(
    _issuer: string,
    _bond: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.ADDRESS, _issuer);
    await this.validateInput(DATATYPES.ADDRESS, _bond);
    return this.callContract(
      FUNCTIONS.GETBONDPURCHASES,
      _issuer,
      _bond,
      options
    );
  }

  public async balanceOf(_wallet: string, options?: Options): any {
    await this.validateInput(DATATYPES.ADDRESS, _wallet);
    return this.callContract(FUNCTIONS.BALANCE, _wallet, options);
  }

  public async name(): any {
    return this.callContract(FUNCTIONS.NAME);
  }

  public async symbol(): any {
    return this.callContract(FUNCTIONS.SYMBOL);
  }

  public async decimals(): any {
    return this.callContract(FUNCTIONS.DECIMALS);
  }

  public async totalSupply(): any {
    return this.callContract(FUNCTIONS.TOTALSUPPLY);
  }

  public async transfer(
    _recipient: string,
    _amount: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.ADDRESS, _recipient);
    await this.validateInput(DATATYPES.NUMBER, _amount);
    return this.callContract(FUNCTIONS.TRANSFER, _recipient, _amount, options);
  }

  public async approve(
    _spender: string,
    _amount: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.ADDRESS, _spender);
    await this.validateInput(DATATYPES.NUMBER, _amount);
    return this.callContract(FUNCTIONS.APPROVE, _spender, _amount, options);
  }

  public async allowance(
    _owner: string,
    _spender: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.ADDRESS, _spender);
    await this.validateInput(DATATYPES.ADDRESS, _owner);
    return this.callContract(FUNCTIONS.ALLOWANCE, _owner, _spender, options);
  }

  public async increaseAllowance(
    _spender: string,
    _addedValue: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.ADDRESS, _spender);
    await this.validateInput(DATATYPES.NUMBER, _addedValue);
    return this.callContract(
      FUNCTIONS.INCREASEALLOWANCE,
      _spender,
      _addedValue,
      options
    );
  }

  public async decreaseAllowance(
    _spender: string,
    _subtractedValue: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.ADDRESS, _spender);
    await this.validateInput(DATATYPES.NUMBER, _subtractedValue);
    return this.callContract(
      FUNCTIONS.DECREASEALLOWANCE,
      _spender,
      _subtractedValue,
      options
    );
  }

  /*
    emits event BondIssued(address indexed _token, address issuer, uint256 issuedAmount, bytes32 collateralCurrency, uint256 collateralValue);
    */
  public notifyBondIssue(callback: any): object {
    this.getEvent(FUNCTIONS.ISSUE, callback);
  }

  /*
    emits event BondRedeemed(address indexed _token, address redeemedBy, uint256 redemptionAmount, bytes32 redemptionCurrency);
    */
  public notifyBondRedemption(callback: any): object {
    this.getEvent(FUNCTIONS.REDEEM, callback);
  }

  /*
    emits event BondPurchased(address indexed _token, address purchaser, uint256 purchasedAmount, bytes32 paidInCurrency, uint256 paidInAmount);
    */
  public notifyBondPurchase(callback: any): object {
    this.getEvent(FUNCTIONS.PURCHASE, callback);
  }

  /*
    emits event BondLiquidated(address indexed _token, address redeemedBy, uint256 redemptionAmount, bytes32 redemptionCurrency);
    */
  public notifyBondLiquidation(callback: any): object {
    this.getEvent(FUNCTIONS.LIQUIDATE, callback);
  }
}
