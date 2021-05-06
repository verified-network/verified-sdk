// @ts-nocheck

import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/trades/SecuritiesRegistry.json';
import { DATATYPES } from "../index";


enum FUNCTIONS {
  GETTOKEN = 'getToken'
}

export default class SecuritiesRegistryContract extends VerifiedContract {

  constructor(signer: VerifiedWallet) {

    const chainId: string = signer.provider._network.chainId.toString()
    super(networks[chainId].address, JSON.stringify(abi), signer)
  }

  /**
   * Register demat account [sent by user on PreTrade.sol]
   * @param (bytes32 _currency, bytes32 _company, bytes32 _isin)
   * @returns Returns nothing. Ensure _countryCode maps to http://country.io/names.json 
   */
  public getToken(_countryCode: string, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.STRING, _countryCode)
    return this.callContract(FUNCTIONS.GETTOKEN, _countryCode, options)
  }

}