// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES, Options } from "../index";
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from "../../abi/payments/ERC20.json";

enum FUNCTIONS {
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

export default class ERC20 extends VerifiedContract {
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

  public async balanceOf(_account: string, options?: Options): any {
    await this.validateInput(DATATYPES.ADDRESS, _account);
    return this.callContract(FUNCTIONS.BALANCE, _account, options);
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
}
