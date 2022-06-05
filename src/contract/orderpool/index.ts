// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/trades/OrderPool.json';

enum FUNCTIONS {
  NEWORDER = 'newOrder',
  EDITORDER = 'editOrder',
  CANCELORDER = 'cancelOrder',
  GETORDERREF = 'getOrderRef'
}

export default class OrderPoolContract extends VerifiedContract {

  public contractAddress: string
  
  constructor(signer: VerifiedWallet, orderPool: string) {

    const address = orderPool
    super(address, JSON.stringify(abi), signer)

    this.contractAddress = address
  }

  /**
   * Get pool [callable by user on PoolFactory.sol]
   * @param (address _security, address _cash, uint256 _price, uint256 _trigger, uint256 _qty, bytes32 _orderType, bytes32 _order)
   * @returns (bytes32)
   */
  public async newOrder(_security: string, _cash: string, _price: string, _qty: string, _orderType: string, _order: string, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.ADDRESS, _security)
    await this.validateInput(DATATYPES.ADDRESS, _cash)
    await this.validateInput(DATATYPES.STRING, _price)
    await this.validateInput(DATATYPES.STRING, _qty)
    await this.validateInput(DATATYPES.STRING, _orderType)
    await this.validateInput(DATATYPES.STRING, _order)
    return this.callContract(FUNCTIONS.NEWORDER, _security, _cash, _price, _qty, this.sanitiseInput(DATATYPES.BYTE32, _orderType), this.sanitiseInput(DATATYPES.BYTE32, _order), options)
  }


  /**
   * Get pool [callable by user on PoolFactory.sol]
   * @param ( bytes32 _ref, uint256 _price, uint256 _trigger, uint256 _qty, bytes32 _orderType, bytes32 _order)
   * @returns (bool)
   */
  public async editOrder(_ref: string, _price: string, _qty: string, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.STRING, _ref)
    await this.validateInput(DATATYPES.STRING, _price)
    await this.validateInput(DATATYPES.STRING, _qty)
    return this.callContract(FUNCTIONS.EDITORDER, _ref, _price, _qty, options)
  }


  /**
   * Get pool [callable by user on PoolFactory.sol]
   * @param (bytes32 ref)
   * @returns (bool)
   */
  public async cancelOrder(_ref: string, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.STRING, _ref)
    return this.callContract(FUNCTIONS.CANCELORDER, _ref, options)
  }

  /**
   * Returns order reference for requestor
   * @param options 
   * @returns 
   */
  public async getOrderRef(options?: { gasPrice: number, gasLimit: number }): any {
    return this.callContract(FUNCTIONS.GETORDERREF, options)
  }

}