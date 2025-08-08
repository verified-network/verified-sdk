// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES, Options } from "../index";
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from "../../abi/payments/Cash.json";

enum FUNCTIONS {
  PAYIN = "payIn",
  REQUESTISSUE = "requestIssue",
  BURNCASHTOKENS = "burnCashTokens",
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
  ISSUE = "CashIssued",
  REDEEM = "CashRedeemed",
  TRANSFER = "CashTransfer",
  EXCHANGE = "CashDeposits",
}

export default class Cash extends VerifiedContract {
  public contractAddress: string;

  constructor(signer: VerifiedWallet, currencyAddress: string) {
    const address = currencyAddress;
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

  /**
   * Request pay out [callable by manager]
   * @param (uint256 _tokens, address _payer, bytes32 _currency, address _sender)
   * @returns boolean
   */
  public async payIn(
    _tokens: string,
    _payer: string,
    _currency: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.NUMBER, _tokens);
    await this.validateInput(DATATYPES.ADDRESS, _payer);
    await this.validateInput(DATATYPES.STRING, _currency);
    return this.callContract(
      FUNCTIONS.PAYIN,
      _tokens,
      _payer,
      this.sanitiseInput(DATATYPES.BYTE32, _currency),
      options
    );
  }

  public async requestIssue(
    _amount: string,
    _buyer: string,
    _currency: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.ADDRESS, _buyer);
    await this.validateInput(DATATYPES.NUMBER, _amount);
    await this.validateInput(DATATYPES.STRING, _currency);
    return this.callContract(
      FUNCTIONS.REQUESTISSUE,
      _amount,
      _buyer,
      this.sanitiseInput(DATATYPES.BYTE32, _currency),
      options
    );
  }

  public async burnCashTokens(
    _tokens: string,
    _payer: string,
    _currency: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.NUMBER, _tokens);
    await this.validateInput(DATATYPES.ADDRESS, _payer);
    await this.validateInput(DATATYPES.STRING, _currency);
    return this.callContract(
      FUNCTIONS.BURNCASHTOKENS,
      _tokens,
      _payer,
      this.sanitiseInput(DATATYPES.BYTE32, _currency),
      options
    );
  }

  /**
   * An investor can also request cash tokens from Verified by paying in another cash token.
   * For example, an investor can request a USD cash token by paying in a EUR cash token.
   * where, the sender is the address of cash token paid in, the receiver is the address of the cash token converted to
   * and the tokens parameter is a numeric specifying number of cash tokens paid in.
   * @param (address sender, address receiver, uint256 tokens)
   * @returns boolean
   */
  public async transferFrom(
    _senderAddress: string,
    _recieverAddress: string,
    _tokens: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.ADDRESS, _senderAddress);
    await this.validateInput(DATATYPES.ADDRESS, _recieverAddress);
    await this.validateInput(DATATYPES.NUMBER, _tokens);
    return this.callContract(
      FUNCTIONS.TRANSFERFROM,
      _senderAddress,
      _recieverAddress,
      _tokens,
      options
    );
  }

  /* Request balance of wallet in contract
   */
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
    emits event CashIssued(address indexed _party, bytes32 currency, uint256 amount);
    */
  public notifyCashIssue(callback: any): object {
    this.getEvent(FUNCTIONS.ISSUE, callback);
  }

  /* 
    emits event CashRedeemed(address indexed _party, bytes32 currency, bytes16 amount);
    */
  public notifyCashRedemption(callback: any): object {
    this.getEvent(FUNCTIONS.REDEEM, callback);
  }

  /* 
    emits event CashTransfer(address indexed from, address indexed to, uint tokens);
    */
  public notifyCashTransfer(callback: any): object {
    this.getEvent(FUNCTIONS.TRANSFER, callback);
  }

  /* 
    emits event CashDeposits(address indexed depositor, bytes32 currency, bytes16 amount);
    */
  public notifyCashExchange(callback: any): object {
    this.getEvent(FUNCTIONS.EXCHANGE, callback);
  }
}
