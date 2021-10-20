// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/trades/PreTrade.json';

enum FUNCTIONS {
  REGISTERDEMATACCOUNT = 'registerDematAccount',
  GETREGISTRATIONREQUESTS = 'getRegistrationRequests',
  GETREGISTRATIONREQUEST = 'getRegistrationRequest',
  SETREGISTRATIONSTATUS = 'setRegistrationStatus',
  REGISTERSECURITIES = 'registerSecurities',
  GETCONFIRMATIONREQUESTS = 'getConfirmationRequests',
  GETCONFIRMATIONREQUEST = 'getConfirmationRequest',
  CONFIRMSECURITIES = 'confirmSecurities',
}

export default class PreTradeContract extends VerifiedContract {

  public contractAddress: string
  
  constructor(signer: VerifiedWallet) {

    const chainId: string = signer.provider._network.chainId.toString()
    const address = networks[chainId].address
    super(address, JSON.stringify(abi), signer)

    this.contractAddress = address
  }

  /**
   * Register demat account [sent by user on PreTrade.sol]
   * @param (bytes32 _countryCode)
   * @returns Returns nothing. Ensure _countryCode maps to http://country.io/names.json 
   */
  public async registerDematAccount(_countryCode: string, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.STRING, _countryCode)
    return this.callContract(FUNCTIONS.REGISTERDEMATACCOUNT, sanitiseInput(DATATYPES.BYTE32, _countryCode), options)
  }


  /**
   * Get no of registrations [sent by manager on PreTrade.sol, only works if manager’s role is DP]
   * @param (bytes32 _countryCode) external view
   * @returns (bytes32[] memory) array of registration request references
   */
  public async getRegistrationRequests(_countryCode: string, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.STRING, _countryCode)
    return this.callContract(FUNCTIONS.GETREGISTRATIONREQUESTS, sanitiseInput(DATATYPES.BYTE32, _countryCode), options)
  }


  /**
   * Get registration request for passed registration reference
   * @param (bytes32 _ref)
   * @returns (address user, bytes32 countryCode, bytes32 dematAccountNo, bytes32 DPID, uint registrationDate) 
   */
  public async getRegistrationRequest(_ref: string, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.STRING, _ref)
    return this.callContract(FUNCTIONS.GETREGISTRATIONREQUEST, sanitiseInput(DATATYPES.BYTE32, _ref), options)
  }

  /**
   * Set registration status [sent by manager on PreTrade.sol, only works if manager’s role is DP]
   * @param (bytes32 _ref, bytes32 _DPID, bytes32 _dematAccountNo)
   * @returns
   */
  public async setRegistrationStatus(_ref: string, _DPID: string, _dematAccountNo: string, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.STRING, _ref)
    await this.validateInput(DATATYPES.STRING, _DPID)
    await this.validateInput(DATATYPES.STRING, _dematAccountNo)
    return this.callContract(FUNCTIONS.SETREGISTRATIONSTATUS, sanitiseInput(DATATYPES.BYTE32, _ref), sanitiseInput(DATATYPES.BYTE32, _DPID), sanitiseInput(DATATYPES.BYTE32, _dematAccountNo), options)
  }

  /**
   * Set registration status [sent by manager on PreTrade.sol, only works if manager’s role is DP]
   * @param ( bytes32 _currencyCode,bytes32 _stype,bytes32 _isin,bytes32 _company,bytes32 _itype, uint _noOfCertificates,  uint _faceValue,bytes32 _lockInReason,uint256 _lockInReleaseDate)
   * @returns
   */
  public async registerSecurities(_currencyCode: string, _stype: string, _isin: string, _company: string, _itype: string, _noOfCertificates: string, _faceValue: string, _lockInReason: string, _lockInReleaseDate: string, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.STRING, _currencyCode)
    await this.validateInput(DATATYPES.STRING, _stype)
    await this.validateInput(DATATYPES.STRING, _isin)
    await this.validateInput(DATATYPES.STRING, _company)
    await this.validateInput(DATATYPES.STRING, _itype)
    await this.validateInput(DATATYPES.STRING, _noOfCertificates)
    await this.validateInput(DATATYPES.STRING, _faceValue)
    await this.validateInput(DATATYPES.STRING, _lockInReason)
    await this.validateInput(DATATYPES.STRING, _lockInReleaseDate)

    return this.callContract(FUNCTIONS.REGISTERSECURITIES, this.sanitiseInput(DATATYPES.BYTE32, _currencyCode), this.sanitiseInput(DATATYPES.BYTE32, _stype), this.sanitiseInput(DATATYPES.BYTE32, _isin), this.sanitiseInput(DATATYPES.BYTE32, _company), this.sanitiseInput(DATATYPES.BYTE32, _itype), _noOfCertificates, _faceValue, this.sanitiseInput(DATATYPES.BYTE32, _lockInReason), _lockInReleaseDate, options)
  }

  /**
    * Get no of securities registration requests [sent by manager on PreTrade.sol, only works if manager’s role is DP]
    * @param (bytes32 _countryCode) 
    * @returns
    */
  public async getConfirmationRequests(_countryCode: string, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.STRING, _countryCode)
    return this.callContract(FUNCTIONS.GETCONFIRMATIONREQUESTS, this.sanitiseInput(DATATYPES.BYTE32, _countryCode), options)
  }

  /**
  * View security registration request [sent by manager on PreTrade.sol, only works if manager’s role is DP]
  * @param (bytes32 _ref) 
  * @returns (struct security{  address requestor;
                                address token;
                                bytes32 currencyCode;
                                bytes32 stype;
                                bytes32 isin; 
                                bytes32 company; 
                                bytes32 itype;
                                bytes32 lockInReason;
                                bytes32 approvalStatus;
                                uint noOfCertificates;
                                uint lockInReleaseDate;
                                uint registrationRequestDate;
                                uint256 faceValue;
                            } )
  */
  public async getConfirmationRequest(_ref: string, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.STRING, _ref)
    return this.callContract(FUNCTIONS.GETCONFIRMATIONREQUEST, this.sanitiseInput(DATATYPES.BYTE32, _ref), options)
  }


  /**
   * Confirm security registration request [sent by manager on PreTrade.sol, only works if manager’s role is DP]
   * @param (address _user, bytes32 _ref, bytes32 _status)
   * @returns
   */
  public async confirmSecurities(_user: string, _ref: string, _status: string, options?: { gasPrice: number, gasLimit: number }): any {
    await this.validateInput(DATATYPES.ADDRESS, _user)
    await this.validateInput(DATATYPES.STRING, _ref)
    await this.validateInput(DATATYPES.STRING, _status)
    return this.callContract(FUNCTIONS.CONFIRMSECURITIES, _user, this.sanitiseInput(DATATYPES.BYTE32, _ref), this.sanitiseInput(DATATYPES.BYTE32, _status), options)
  }
  
}