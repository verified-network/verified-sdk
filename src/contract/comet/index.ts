// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES, Options } from "../index";
import { VerifiedWallet } from "../../wallet";
import { abi } from "../../abi/loans/compound/Comet.json";

enum FUNCTIONS {
  ALLOW = "allow",
  HASPERMISSION = "hasPermission",
}

export default class Comet extends VerifiedContract {
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

  public async allow(
    manager: string,
    isAllowed: string,
    options?: Options,
  ): any {
    await this.validateInput(DATATYPES.ADDRESS, manager);
    await this.validateInput(DATATYPES.BOOLEAN, isAllowed);
    return this.callContract(FUNCTIONS.ALLOW, manager, isAllowed, options);
  }

  public async hasPermission(owner: string, manager: string): any {
    await this.validateInput(DATATYPES.ADDRESS, owner);
    await this.validateInput(DATATYPES.ADDRESS, manager);
    return this.callContract(FUNCTIONS.HASPERMISSION, owner, manager);
  }
}
