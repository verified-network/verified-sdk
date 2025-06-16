// SPDX-License-Identifier: BUSL-1.1
// @ts-nocheck

import { VerifiedContract, DATATYPES, Options } from "../index";
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from "../../abi/custody/Vault.json";

enum FUNCTIONS {
  CREATEVAULT = "createVault",
  RESETPIN = "resetPin",
  GETVAULTS = "getVaults",
  TRANSFERVAULT = "transferVault",
  GETCREATOR = "getCreator",
  ADDPARTICIPANT = "addParticipant",
  REMOVEPARTICIPANT = "removeParticipant",
  CONFIRMPARTICIPANT = "confirmParticipant",
  DEFINEQUORUM = "defineQuorum",
  GETQUORUM = "getQuorum",
  PROMPTSIGNATURES = "promptSignatures",
  SIGNTRANSACTION = "signTransaction",
  CHECKQUORUM = "checkQuorum",
  GETSHARDS = "getShards",
  NEWPARTICIPANT = "NewParticipant",
  NEWTRANSACTION = "NewTransaction",
  SIGNATURE = "SignTransaction",
  SNAPSHOT = "snapshotBalance",
  CALCULATEAVERAGEBALANCE = "calculateAverageBalance",
  COLLECTCUSTODYFEE = "collectCustodyFee",
  SETDISTRIBUTOR = "setDistributor",
  SETCUSTODYFEE = "setCustodyFee",
}

export default class Custody extends VerifiedContract {
  public contractAddress: string;

  constructor(signer: VerifiedWallet, contractNetworkAddress: string) {
    const address = contractNetworkAddress;
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

  public async createVault(
    _creator: string,
    _id: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.STRING, _creator);
    await this.validateInput(DATATYPES.STRING, _id);
    return this.callContract(
      FUNCTIONS.CREATEVAULT,
      this.sanitiseInput(DATATYPES.BYTE32, _creator),
      _id,
      options
    );
  }

  public async resetPin(
    _creator: string,
    _id: string,
    _new: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.STRING, _creator);
    await this.validateInput(DATATYPES.STRING, _id);
    await this.validateInput(DATATYPES.STRING, _new);
    return this.callContract(
      FUNCTIONS.RESETPIN,
      this.sanitiseInput(DATATYPES.BYTE32, _creator),
      _id,
      _new,
      options
    );
  }

  public async getVaults(): any {
    return this.callContract(FUNCTIONS.GETVAULTS);
  }

  public async transferVault(
    _creator: string,
    _id: string,
    _transferee: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.STRING, _creator);
    await this.validateInput(DATATYPES.STRING, _id);
    await this.validateInput(DATATYPES.ADDRESS, _transferee);
    return this.callContract(
      FUNCTIONS.TRANSFERVAULT,
      this.sanitiseInput(DATATYPES.BYTE32, _creator),
      _id,
      _transferee,
      options
    );
  }

  public async getCreator(
    _creator: string,
    _pin: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.STRING, _creator);
    await this.validateInput(DATATYPES.NUMBER, _pin);
    return this.callContract(
      FUNCTIONS.GETCREATOR,
      this.sanitiseInput(DATATYPES.BYTE32, _creator),
      _pin,
      options
    );
  }

  public async addParticipant(
    _creator: string,
    _id: string,
    _participant: string,
    _shard: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.STRING, _creator);
    await this.validateInput(DATATYPES.STRING, _id);
    await this.validateInput(DATATYPES.STRING, _participant);
    await this.validateInput(DATATYPES.STRING, _shard);
    return this.callContract(
      FUNCTIONS.ADDPARTICIPANT,
      this.sanitiseInput(DATATYPES.BYTE32, _creator),
      _id,
      this.sanitiseInput(DATATYPES.BYTE32, _participant),
      _shard,
      options
    );
  }

  public async removeParticipant(
    _creator: string,
    _id: string,
    _participant: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.STRING, _creator);
    await this.validateInput(DATATYPES.STRING, _id);
    await this.validateInput(DATATYPES.STRING, _participant);
    return this.callContract(
      FUNCTIONS.REMOVEPARTICIPANT,
      this.sanitiseInput(DATATYPES.BYTE32, _creator),
      _id,
      this.sanitiseInput(DATATYPES.BYTE32, _participant),
      options
    );
  }

  public async confirmParticipant(
    _creator: string,
    _id: string,
    _participant: string,
    _pin: string,
    _confirmation: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.STRING, _creator);
    await this.validateInput(DATATYPES.STRING, _id);
    await this.validateInput(DATATYPES.STRING, _participant);
    await this.validateInput(DATATYPES.STRING, _pin);
    await this.validateInput(DATATYPES.BOOLEAN, _confirmation);
    return this.callContract(
      FUNCTIONS.CONFIRMPARTICIPANT,
      this.sanitiseInput(DATATYPES.BYTE32, _creator),
      _id,
      this.sanitiseInput(DATATYPES.BYTE32, _participant),
      _pin,
      _confirmation,
      options
    );
  }

  public async defineQuorum(
    _creator: string,
    _id: string,
    _minParticipants: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.STRING, _creator);
    await this.validateInput(DATATYPES.STRING, _id);
    await this.validateInput(DATATYPES.NUMBER, _minParticipants);
    return this.callContract(
      FUNCTIONS.DEFINEQUORUM,
      this.sanitiseInput(DATATYPES.BYTE32, _creator),
      _id,
      _minParticipants,
      options
    );
  }

  public async getQuorum(
    _creator: string,
    _id: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.STRING, _creator);
    await this.validateInput(DATATYPES.STRING, _id);
    return this.callContract(
      FUNCTIONS.GETQUORUM,
      this.sanitiseInput(DATATYPES.BYTE32, _creator),
      _id,
      options
    );
  }

  public async promptSignatures(
    _creator: string,
    _id: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.STRING, _creator);
    await this.validateInput(DATATYPES.STRING, _id);
    return this.callContract(
      FUNCTIONS.PROMPTSIGNATURES,
      this.sanitiseInput(DATATYPES.BYTE32, _creator),
      _id,
      options
    );
  }

  public async signTransaction(
    _creator: string,
    _id: string,
    _participant: string,
    _tx: string,
    _pin: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.STRING, _creator);
    await this.validateInput(DATATYPES.STRING, _id);
    await this.validateInput(DATATYPES.STRING, _participant);
    await this.validateInput(DATATYPES.STRING, _tx);
    await this.validateInput(DATATYPES.STRING, _pin);
    return this.callContract(
      FUNCTIONS.SIGNTRANSACTION,
      this.sanitiseInput(DATATYPES.BYTE32, _creator),
      _id,
      this.sanitiseInput(DATATYPES.BYTE32, _participant),
      _tx,
      _pin,
      options
    );
  }

  public async checkQuorum(
    _creator: string,
    _id: string,
    _participant: string,
    _txid: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.STRING, _creator);
    await this.validateInput(DATATYPES.STRING, _id);
    await this.validateInput(DATATYPES.STRING, _participant);
    await this.validateInput(DATATYPES.STRING, _txid);
    return this.callContract(
      FUNCTIONS.CHECKQUORUM,
      this.sanitiseInput(DATATYPES.BYTE32, _creator),
      _id,
      this.sanitiseInput(DATATYPES.BYTE32, _participant),
      _txid,
      options
    );
  }

  public async getShards(
    _creator: string,
    _id: string,
    _txid: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.STRING, _creator);
    await this.validateInput(DATATYPES.STRING, _id);
    await this.validateInput(DATATYPES.STRING, _txid);
    return this.callContract(
      FUNCTIONS.GETSHARDS,
      this.sanitiseInput(DATATYPES.BYTE32, _creator),
      _id,
      _txid,
      options
    );
  }

  public async snapshotBalance(
    _user: string,
    _token: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.ADDRESS, _user);
    await this.validateInput(DATATYPES.ADDRESS, _token);
    return this.callContract(FUNCTIONS.SNAPSHOT, _user, _token, options);
  }

  public async calculateAverageBalance(
    _user: string,
    _token: string,
    _fromTime: string,
    _toTime: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.ADDRESS, _user);
    await this.validateInput(DATATYPES.ADDRESS, _token);
    await this.validateInput(DATATYPES.NUMBER, _fromTime);
    await this.validateInput(DATATYPES.NUMBER, _toTime);
    return this.callContract(
      FUNCTIONS.CALCULATEAVERAGEBALANCE,
      _user,
      _token,
      _fromTime,
      _toTime,
      options
    );
  }

  public async collectCustodyFee(_token: string, options?: Options): any {
    await this.validateInput(DATATYPES.ADDRESS, _token);
    return this.callContract(FUNCTIONS.COLLECTCUSTODYFEE, _token, options);
  }

  public async setDistributor(_nominee: string, options?: Options): any {
    await this.validateInput(DATATYPES.ADDRESS, _nominee);
    return this.callContract(FUNCTIONS.SETDISTRIBUTOR, _nominee, options);
  }

  public async setCustodyFee(_fee: string, options?: Options): any {
    await this.validateInput(DATATYPES.NUMBER, _fee);
    return this.callContract(FUNCTIONS.SETCUSTODYFEE, _fee, options);
  }

  public notifyNewParticipant(callback: any): object {
    this.getEvent(FUNCTIONS.NEWPARTICIPANT, callback);
  }

  public notifyNewTransaction(callback: any): object {
    this.getEvent(FUNCTIONS.NEWTRANSACTION, callback);
  }

  public notifySignTransaction(callback: any): object {
    this.getEvent(FUNCTIONS.SIGNATURE, callback);
  }
}
