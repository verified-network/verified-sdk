// @ts-nocheck

import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/trades/PreTrade.json  ';
import { DATATYPES } from "../index";


enum FUNCTIONS {
  REGISTERDEMATACCOUNT = 'registerDematAccount',
  GETREGISTRATIONREQUESTS = 'getRegistrationRequests',
  GETREGISTRATIONREQUEST = 'getRegistrationRequest',
  SETREGISTRATIONSTATUS = 'setRegistrationStatus',
  CONFIRMSECURITIES = 'confirmSecurities',
  GETCONFIRMATIONREQUESTS = 'getConfirmationRequests',
}

export default class PreTradeContract extends VerifiedContract {

  constructor(signer: VerifiedWallet) {

    const chainId: string = signer.provider._network.chainId.toString()
    super(networks[chainId].address, JSON.stringify(abi), signer)
  }

  /**
   * Register demat account [sent by user on PreTrade.sol]
   * @param (bytes32 _countryCode)
   * @returns Returns nothing. Ensure _countryCode maps to http://country.io/names.json 
   */
  public registerDematAccount(_countryCode: string, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.STRING, _countryCode)
    return this.callContract(FUNCTIONS.REGISTERDEMATACCOUNT, _countryCode, options)
  }


  /**
   * Get no of registrations [sent by manager on PreTrade.sol, only works if manager’s role is DP]
   * @param (bytes32 _countryCode, uint entries) 
   * @returns (bytes32[] memory) array of registration request references
   */
  public getRegistrationRequests(_countryCode: string, entries: number, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.STRING, _senderAddress)
    await this.validateInput(DATATYPES.NUMBER, entries)
    return this.callContract(FUNCTIONS.GETREGISTRATIONREQUESTS, _senderAddress, entries, options)
  }


  /**
   * Register demat account [sent by user on PreTrade.sol]
   * @param (bytes32 _ref)
   * @returns ( address user, bytes32 countryCode,bytes32 dematAccountNo, bytes32 DPID, uint registrationDate) Return variables are quite clear from function signature. DPID means depositary participant ID.
   */
  public getRegistrationRequest(_ref: string, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.STRING, _ref)
    return this.callContract(FUNCTIONS.GETREGISTRATIONREQUEST, _ref, options)
  }

  /**
   * Set registration status [sent by manager on PreTrade.sol, only works if manager’s role is DP]
   * @param (bytes32 _ref, bytes32 _DPID, bytes32 _dematAccountNo)
   * @returns
   */
  public setRegistrationStatus(_ref: string, _DPID: string, _dematAccountNo: string, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.STRING, _ref)
    await this.validateInput(DATATYPES.STRING, _DPID)
    await this.validateInput(DATATYPES.STRING, _dematAccountNo)
    return this.callContract(FUNCTIONS.SETREGISTRATIONSTATUS, _ref, _DPID, _dematAccountNo, options)
  }

  /**
   * Set registration status [sent by manager on PreTrade.sol, only works if manager’s role is DP]
   * @param ( bytes32 _currencyCode,bytes32 _stype,bytes32 _isin,bytes32 _company,bytes32 _itype, uint _noOfCertificates,  uint _faceValue,bytes32 _lockInReason,uint _lockInReleaseDate)
   * @returns
   */
  public confirmSecurities(_currencyCode: string, _stype: string, _isin: string, _company: string, _itype: string, _noOfCertificates: number, _faceValue: number, _lockInReason: string, _lockInReleaseDate: number, options?: { gasPrice: number, gasLimit: number }): any {

    await this.validateInput(DATATYPES.STRING, _currencyCode)
    await this.validateInput(DATATYPES.STRING, _stype)
    await this.validateInput(DATATYPES.STRING, _isin)
    await this.validateInput(DATATYPES.STRING, _company)
    await this.validateInput(DATATYPES.STRING, _itype)
    await this.validateInput(DATATYPES.NUMBER, _noOfCertificates)
    await this.validateInput(DATATYPES.NUMBER, _faceValue)
    await this.validateInput(DATATYPES.STRING, _lockInReason)
    await this.validateInput(DATATYPES.NUMBER, _lockInReleaseDate)
    return this.callContract(FUNCTIONS.CONFIRMSECURITIES, _currencyCode, _stype, _isin, _company, _itype, _noOfCertificates, _faceValue, _lockInReason, _lockInReleaseDate, options)
  }


  /**
   * Get no of securities registration requests [sent by manager on PreTrade.sol, only works if manager’s role is DP]
   * @param (uint entries, bytes32 _countryCode) 
   * @returns
   */
  public getConfirmationRequests(entries: number, _countryCode: string, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.NUMBER, entries)
    await this.validateInput(DATATYPES.STRING, _countryCode)
    return this.callContract(FUNCTIONS.CONFIRMSECURITIES, _senderAddress, _countryCode, options)
  }


  /**
   * Confirm security registration request [sent by manager on PreTrade.sol, only works if manager’s role is DP]
   * @param (address _user, bytes32 _ref, bool _status) 
   * @returns
   */
  public confirmSecurities(_user: string, _ref: string, _status: number, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.STRING, _user)
    await this.validateInput(DATATYPES.STRING, _ref)
    await this.validateInput(DATATYPES.NUMBER, _status)
    return this.callContract(FUNCTIONS.TRANSFERFROM, _user, _ref, _status, options)
  }
}