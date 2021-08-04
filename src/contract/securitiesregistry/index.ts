// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/trades/SecuritiesRegistry.json';

enum FUNCTIONS {
  GETTOKEN = 'getToken',
  REGISTERCORPORATEACTION = 'registerCorporateAction',
  REGISTERCREDITSCORE = 'registerCreditScore',
  GETPRICE = 'getPrice',
  GETCORPORATEACTION = 'getCorporateActions',
  GETCREDITSCORE = 'getCreditScore'
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
    await this.validateInput(DATATYPES.STRING, _company)
    await this.validateInput(DATATYPES.STRING, _isin)
    return this.callContract(FUNCTIONS.GETTOKEN, this.sanitiseInput(DATATYPES.BYTE32, _currency), this.sanitiseInput(DATATYPES.BYTE32, _company), this.sanitiseInput(DATATYPES.BYTE32, _isin), options)
  }

  public async registerCorporateAction(_category: string, _action: string, _isin: string, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.STRING, _category)
    await this.validateInput(DATATYPES.STRING, _action)
    await this.validateInput(DATATYPES.STRING, _isin)
    return this.callContract(FUNCTIONS.REGISTERCORPORATEACTION, this.sanitiseInput(DATATYPES.BYTE32, _category), this.sanitiseInput(DATATYPES.BYTE32, _action), this.sanitiseInput(DATATYPES.BYTE32, _isin), options)
  }

  public async registerCreditScore(_score: string, _company: string, _isin: string, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.STRING, _score)
    await this.validateInput(DATATYPES.STRING, _company)
    await this.validateInput(DATATYPES.STRING, _isin)
    return this.callContract(FUNCTIONS.REGISTERCREDITSCORE, this.sanitiseInput(DATATYPES.BYTE32, _score), this.sanitiseInput(DATATYPES.BYTE32, _company), this.sanitiseInput(DATATYPES.BYTE32, _isin), options)
  }

  public async getCorporateActions(_category: string, _isin: string, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.STRING, _category)
    await this.validateInput(DATATYPES.STRING, _isin)
    return this.callContract(FUNCTIONS.GETCORPORATEACTION, this.sanitiseInput(DATATYPES.BYTE32, _category), this.sanitiseInput(DATATYPES.BYTE32, _isin), options)
  }

  public async getCreditScore(_company: string, _isin: string, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.STRING, _company)
    await this.validateInput(DATATYPES.STRING, _isin)
    return this.callContract(FUNCTIONS.GETCREDITSCORE, this.sanitiseInput(DATATYPES.BYTE32, _company), this.sanitiseInput(DATATYPES.BYTE32, _isin), options)
  }

  public async getPrice(_isin: string, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.STRING, _isin)
    return this.callContract(FUNCTIONS.GETPRICE, this.sanitiseInput(DATATYPES.BYTE32, _isin), options)
  }

}