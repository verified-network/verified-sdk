// @ts-nocheck

import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/trades/PoolFactory.json';
import { DATATYPES } from "../index";


enum FUNCTIONS {
  GETPOOL = 'getPool'
}

export default class PoolFactoryContract extends VerifiedContract {

  constructor(signer: VerifiedWallet) {

    const chainId: string = signer.provider._network.chainId.toString()
    super(networks[chainId].address, JSON.stringify(abi), signer)
  }

  /**
   * Get pool [callable by user on PoolFactory.sol]
   * @param (address _security, address _cash)
   * @returns (address)
   */
  public getPool(_countryCode: string, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.STRING, _countryCode)
    return this.callContract(FUNCTIONS.GETPOOL, _countryCode, options)
  }

}