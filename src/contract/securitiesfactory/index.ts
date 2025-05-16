// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES, Options } from "../index";
import { VerifiedWallet } from "../../../wallet";
import { abi, networks } from "../../abi/securities/SecuritiesFactory.json";

enum FUNCTIONS {
  GETISSUES = "getIssues",
  SETSIGNER = "setSigner",
  ADDBALANCE = "addBalance",
  ISSUESECURITY = "issueSecurity",
  SECURITIESADDED = "securitiesAdded",
  GETSECURITYTOKEN = "getSecurityToken",
  GETHOLDER = "getHolder",
  GETSECURITY = "getSecurity",
  SETCUSTODIAN = "setCustodian",
  GETCUSTODIAN = "getCustodian",
  RESTRICTCOUNTRY = "restrictCountry",
  GETRESTRICTEDCOUNTRIES = "getRestrictedCountries",
  GETDP = "getDP",
}

export default class SecuritiesFactory extends VerifiedContract {
  public contractAddress: string;

  constructor(signer: VerifiedWallet, contractNetworkAddress: string) {
    const address = contractNetworkAddress;
    //const chainId: string = Object.keys(networks)
    //const address = networks[chainId].address
    super(address, JSON.stringify(abi), signer);

    this.contractAddress = address;
  }

  public async _getMeeQuote(
    paymentTokenAddress: string,
    functionName: string,
    args: any[]
  ): Promise<{
    tokenAddress: string;
    amount: string;
    amountInWei: string;
    amouuntValue: string;
    chainId: number;
    functionName: string;
  }> {
    return await this.getQuote(paymentTokenAddress, functionName, args);
  }

  /**
        Sets signer to verify bridge
        @param  _signer  address of signer that can only be set by owner of bridge
     */
  public async setSigner(_signer: string, options?: Options): any {
    await this.validateInput(DATATYPES.ADDRESS, _signer);
    return this.callContract(FUNCTIONS.SETSIGNER, _signer, options);
  }

  /**
   * Get issued security token addresses
   * @param
   * @returns returns array of addresses
   */
  public async getIssues(): any {
    return this.callContract(FUNCTIONS.GETISSUES);
  }

  public async getHolder(_token: string, options?: Options): any {
    await this.validateInput(DATATYPES.ADDRESS, _token);
    return this.callContract(FUNCTIONS.GETHOLDER, _token, options);
  }

  public async getSecurity(_token: string, options?: Options): any {
    await this.validateInput(DATATYPES.ADDRESS, _token);
    return this.callContract(FUNCTIONS.GETSECURITY, _token, options);
  }

  public async issueSecurity(
    _security: string,
    _category: string,
    _company: string,
    _isin: string,
    _currency: string,
    _issuer: string,
    _intermediary: string,
    _restrictions: string,
    _country: string,
    _qualified: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.ADDRESS, _security);
    await this.validateInput(DATATYPES.ADDRESS, _currency);
    await this.validateInput(DATATYPES.ADDRESS, _issuer);
    await this.validateInput(DATATYPES.ADDRESS, _intermediary);
    return this.callContract(
      FUNCTIONS.ISSUESECURITY,
      _security,
      _category,
      this.sanitiseInput(DATATYPES.BYTE32, _company),
      this.sanitiseInput(DATATYPES.BYTE32, _isin),
      _currency,
      _issuer,
      _intermediary,
      _restrictions,
      _country,
      _qualified,
      options
    );
  }

  public async getSecurityToken(
    security: string,
    issuer: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.ADDRESS, security);
    await this.validateInput(DATATYPES.ADDRESS, issuer);
    return this.callContract(
      FUNCTIONS.GETSECURITYTOKEN,
      security,
      issuer,
      options
    );
  }

  public async addBalance(
    _security: string,
    _transferor: string,
    _transferee: string,
    _amount: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.ADDRESS, _security);
    await this.validateInput(DATATYPES.ADDRESS, _transferor);
    await this.validateInput(DATATYPES.ADDRESS, _transferee);
    await this.validateInput(DATATYPES.NUMBER, _amount);
    return this.callContract(
      FUNCTIONS.ADDBALANCE,
      _security,
      _transferor,
      _transferee,
      _amount,
      options
    );
  }

  public notifySecuritiesAdded(callback: any): object {
    this.getEvent(FUNCTIONS.SECURITIESADDED, callback);
  }

  public async setCustodian(
    _securityToken: string,
    _issuer: string,
    _custodian: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.ADDRESS, _securityToken);
    await this.validateInput(DATATYPES.ADDRESS, _issuer);
    await this.validateInput(DATATYPES.ADDRESS, _custodian);
    return this.callContract(
      FUNCTIONS.SETCUSTODIAN,
      _securityToken,
      _issuer,
      _custodian,
      options
    );
  }

  public async getCustodian(
    _securityToken: string,
    _issuer: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.ADDRESS, _securityToken);
    await this.validateInput(DATATYPES.ADDRESS, _issuer);
    return this.callContract(
      FUNCTIONS.GETCUSTODIAN,
      _securityToken,
      _issuer,
      options
    );
  }

  public async restrictCountry(
    _security: string,
    _countries: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.ADDRESS, _security);
    await this.validateInput(DATATYPES.STRING, _countries);
    return this.callContract(
      FUNCTIONS.RESTRICTCOUNTRY,
      _security,
      _countries,
      options
    );
  }

  public async getRestrictedCountries(
    _security: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.ADDRESS, _security);
    return this.callContract(
      FUNCTIONS.GETRESTRICTEDCOUNTRIES,
      _security,
      options
    );
  }

  public async getDP(_securityToken: string, options?: Options): any {
    await this.validateInput(DATATYPES.ADDRESS, _securityToken);
    return this.callContract(FUNCTIONS.GETDP, _securityToken, options);
  }
}
