// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/trades/SecuritiesRegistry.json';

enum FUNCTIONS {
  GETTOKEN = 'getToken'
}

export default class SecuritiesRegistryContract extends VerifiedContract {
  public contractAddress: string
  constructor(signer: VerifiedWallet) {

    const chainId: string = signer.provider._network.chainId.toString()
    const address = networks[chainId].address
    super(address, JSON.stringify(abi), signer)

    this.contractAddress = address
  }

  /**
   * Register demat account [sent by user on PreTrade.sol]
   * @param (bytes32 _currency, bytes32 _company, bytes32 _isin)
   * @returns Returns nothing. Ensure _countryCode maps to http://country.io/names.json 
   */
  public async getToken(_currency: string, _company: string, _isin: string, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.STRING, _currency)
    await this.validateInput(DATATYPES.STRING, _currency)
    return this.callContract(FUNCTIONS.GETTOKEN, this.sanitiseInput(DATATYPES.BYTE32, _currency), this.sanitiseInput(DATATYPES.BYTE32, _company), this.sanitiseInput(DATATYPES.BYTE32, _isin), options)
  }

}