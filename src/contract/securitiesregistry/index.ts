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

  /**
   * Registers corporate action. Can only be involved by issuer - company or registrar/DP
   * @param _category category of corporate action
   * @param _action corporate action passed as string
   * @param _isin isin number of financial instrument issued
   * @param options 
   * @returns 
   */
  public async registerCorporateAction(_category: string, _action: string, _isin: string, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.STRING, _category)
    await this.validateInput(DATATYPES.STRING, _action)
    await this.validateInput(DATATYPES.STRING, _isin)
    return this.callContract(FUNCTIONS.REGISTERCORPORATEACTION, this.sanitiseInput(DATATYPES.BYTE32, _category), _action, this.sanitiseInput(DATATYPES.BYTE32, _isin), options)
  }

  /**
   * Registers credit score of issuer. Can only be called by the admin contract on the Verified Network.
   * @param _score credit score
   * @param _company company whose score is reported
   * @param _isin isin of financial instrument which is credit scored
   * @param options 
   * @returns 
   */
  public async registerCreditScore(_score: string, _company: string, _isin: string, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.STRING, _score)
    await this.validateInput(DATATYPES.STRING, _company)
    await this.validateInput(DATATYPES.STRING, _isin)
    return this.callContract(FUNCTIONS.REGISTERCREDITSCORE, this.sanitiseInput(DATATYPES.BYTE32, _score), this.sanitiseInput(DATATYPES.BYTE32, _company), this.sanitiseInput(DATATYPES.BYTE32, _isin), options)
  }

  /**
   * Gets corporate action.
   * @param _category category of corporate action
   * @param _isin financial instrument for which corporate action is to be fetched
   * @param options 
   * @returns 
   */
  public async getCorporateActions(_category: string, _isin: string, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.STRING, _category)
    await this.validateInput(DATATYPES.STRING, _isin)
    return this.callContract(FUNCTIONS.GETCORPORATEACTION, this.sanitiseInput(DATATYPES.BYTE32, _category), this.sanitiseInput(DATATYPES.BYTE32, _isin), options)
  }

  /**
   * Gets credit score
   * @param _company company whose score is to be fetched
   * @param _isin financial instrument whose score is to be fetched
   * @param options 
   * @returns 
   */
  public async getCreditScore(_company: string, _isin: string, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.STRING, _company)
    await this.validateInput(DATATYPES.STRING, _isin)
    return this.callContract(FUNCTIONS.GETCREDITSCORE, this.sanitiseInput(DATATYPES.BYTE32, _company), this.sanitiseInput(DATATYPES.BYTE32, _isin), options)
  }

  /**
   * Gets price of financial instrument
   * @param _isin identifier of financial instrument
   * @param options 
   * @returns 
   */
  public async getPrice(_isin: string, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.STRING, _isin)
    return this.callContract(FUNCTIONS.GETPRICE, this.sanitiseInput(DATATYPES.BYTE32, _isin), options)
  }

}