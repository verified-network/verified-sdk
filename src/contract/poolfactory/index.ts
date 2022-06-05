// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/trades/PoolFactory.json';

enum FUNCTIONS {
  GETPOOL = 'getPool'
}

export default class PoolFactoryContract extends VerifiedContract {

  public contractAddress: string
  
  constructor(signer: VerifiedWallet) {

    const chainId: string = Object.keys(networks)
    const address = networks[chainId].address
    super(address, JSON.stringify(abi), signer)

    this.contractAddress = address
  }

  /**
   * Get pool [callable by user on PoolFactory.sol]
   * @param (address _security, address _cash)
   * @returns (address)
   */
  public async getPool(_security: string, _cash: string, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.ADDRESS, _security)
    await this.validateInput(DATATYPES.ADDRESS, _cash)
    return this.callContract(FUNCTIONS.GETPOOL, _security, _cash, options)
  }

}