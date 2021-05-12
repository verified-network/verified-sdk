// @ts-nocheck

import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/trades/PoolFactory.json';
import { DATATYPES } from "../index";


enum FUNCTIONS {
  GETPOOL = 'getPool'
}

export default class PoolFactoryContract extends VerifiedContract {
  public contractAddress: string
  constructor(signer: VerifiedWallet) {

    const chainId: string = signer.provider._network.chainId.toString()
    const address = networks[chainId].address
    super(address, JSON.stringify(abi), signer)

    this.contractAddress = address
  }

  /**
   * Get pool [callable by user on PoolFactory.sol]
   * @param (address _security, address _cash)
   * @returns (address)
   */
  public async getPool(_countryCode: string, _cashTokenAddress: string, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.ADDRESS, _countryCode)
    await this.validateInput(DATATYPES.ADDRESS, _cashTokenAddress)
    return this.callContract(FUNCTIONS.GETPOOL, _countryCode, _cashTokenAddress, options)
  }

}