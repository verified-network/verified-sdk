// @ts-nocheck

import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/trades/OrderPool.json';
import { DATATYPES } from "../index";


enum FUNCTIONS {
  NEWORDER = 'newOrder',
  EDITORDER = 'editOrder',
  CANCELORDER = 'cancelOrder',
}

export default class OrderPoolContract extends VerifiedContract {

  constructor(signer: VerifiedWallet) {

    const chainId: string = signer.provider._network.chainId.toString()
    super(networks[chainId].address, JSON.stringify(abi), signer)
  }

  /**
   * Get pool [callable by user on PoolFactory.sol]
   * @param (address _security, address _cash, uint256 _price, uint256 _trigger, uint256 _qty, bytes32 _orderType, bytes32 _order)
   * @returns (bytes32)
   */
  public async newOrder(_security: string, _cash: string, _price: string, _trigger: string, _qty: string, _orderType: string, _order: string, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.ADDRESS, _security)
    await this.validateInput(DATATYPES.ADDRESS, _cash)
    await this.validateInput(DATATYPES.STRING, _price)
    await this.validateInput(DATATYPES.STRING, _trigger)
    await this.validateInput(DATATYPES.STRING, _qty)
    await this.validateInput(DATATYPES.STRING, _orderType)
    await this.validateInput(DATATYPES.STRING, _order)
    return this.callContract(FUNCTIONS.NEWORDER, _security, _cash, _price, _trigger, _qty, this.sanitiseInput(DATATYPES.BYTE32, _orderType), this.sanitiseInput(DATATYPES.BYTE32, _order), options)
  }


  /**
   * Get pool [callable by user on PoolFactory.sol]
   * @param ( bytes32 _ref, uint256 _price, uint256 _trigger, uint256 _qty, bytes32 _orderType, bytes32 _order)
   * @returns (bool)
   */
  public async editOrder(_ref: string, _price: string, _trigger: string, _qty: string, _orderType: string, _order: string, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.STRING, _ref)
    await this.validateInput(DATATYPES.STRING, _price)
    await this.validateInput(DATATYPES.STRING, _trigger)
    await this.validateInput(DATATYPES.STRING, _qty)
    await this.validateInput(DATATYPES.STRING, _orderType)
    await this.validateInput(DATATYPES.STRING, _order)
    return this.callContract(FUNCTIONS.EDITORDER, this.sanitiseInput(DATATYPES.BYTE32, _ref), _cash, _price, _trigger, _qty, this.sanitiseInput(DATATYPES.BYTE32, _orderType), this.sanitiseInput(DATATYPES.BYTE32, _order), options)
  }


  /**
   * Get pool [callable by user on PoolFactory.sol]
   * @param (bytes32 ref)
   * @returns (bool)
   */
  public async cancelOrder(ref: string, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.STRING, ref)
    return this.callContract(FUNCTIONS.CANCELORDER, this.sanitiseInput(DATATYPES.BYTE32, _ref), options)
  }

}