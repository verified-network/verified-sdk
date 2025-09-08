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
  CLEANTX = "cleanTx"
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
    args: any[],
    apiKey?: string,
    rpcUrl?: string
  ): Promise<{
    tokenAddress: string;
    amount: string;
    amountInWei: string;
    amouuntValue: string;
    chainId: number;
    functionName: string;
  }> {
    return await this.getQuote(
      paymentTokenAddress,
      functionName,
      args,
      rpcUrl,
      apiKey
    );
  }

  public async createVault(
    _creator: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.BYTE32, _creator);
    return this.callContract(FUNCTIONS.CREATEVAULT, _creator, options);
  }

  public async getVaults(): any {
    return this.callContract(FUNCTIONS.GETVAULTS);
  }

  public async transferVault(
    _creator: string,
    _transferee: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.BYTE32, _creator);
    await this.validateInput(DATATYPES.ADDRESS, _transferee);
    return this.callContract(
      FUNCTIONS.TRANSFERVAULT,
      _creator,
      _transferee,
      options
    );
  }

  public async addParticipant(
    _creator: string,
    _participant: string,
    _shard: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.BYTE32, _creator);
    await this.validateInput(DATATYPES.BYTE32, _participant);
    await this.validateInput(DATATYPES.STRING, _shard);
    return this.callContract(
      FUNCTIONS.ADDPARTICIPANT,
      _creator,
      _participant,
      _shard,
      options
    );
  }

  public async removeParticipant(
    _creator: string,
    _participant: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.BYTE32, _creator);
    await this.validateInput(DATATYPES.BYTE32, _participant);
    return this.callContract(
      FUNCTIONS.REMOVEPARTICIPANT,
      _creator,
      _participant,
      options
    );
  }

  public async confirmParticipant(
    _creator: string,
    _participant: string,
    _confirmation: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.BYTE32, _creator);
    await this.validateInput(DATATYPES.BYTE32, _participant);
    await this.validateInput(DATATYPES.BOOLEAN, _confirmation);
    return this.callContract(
      FUNCTIONS.CONFIRMPARTICIPANT,
      _creator,
      _participant,
      _confirmation,
      options
    );
  }

  public async defineQuorum(
    _creator: string,
    _minParticipants: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.BYTE32, _creator);
    await this.validateInput(DATATYPES.NUMBER, _minParticipants);
    return this.callContract(
      FUNCTIONS.DEFINEQUORUM,
      _creator,
      _minParticipants,
      options
    );
  }

  public async getQuorum(
    _creator: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.BYTE32, _creator);
    return this.callContract(FUNCTIONS.GETQUORUM, _creator, options);
  }

  public async promptSignatures(
    _creator: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.BYTE32, _creator);
    return this.callContract(
      FUNCTIONS.PROMPTSIGNATURES,
      _creator,
      options
    );
  }

  public async signTransaction(
    _creator: string,
    _participant: string,
    _tx: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.BYTE32, _creator);
    await this.validateInput(DATATYPES.BYTE32, _participant);
    await this.validateInput(DATATYPES.STRING, _tx);
    return this.callContract(
      FUNCTIONS.SIGNTRANSACTION,
      _creator,
      _participant,
      _tx,
      options
    );
  }

  public async checkQuorum(
    _creator: string,
    _txid: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.BYTE32, _creator);
    await this.validateInput(DATATYPES.STRING, _txid);
    return this.callContract(
      FUNCTIONS.CHECKQUORUM,
      _creator,
      _txid,
      options
    );
  }

  public async getShards(
    _creator: string,
    _txid: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.BYTE32, _creator);
    await this.validateInput(DATATYPES.STRING, _txid);
    return this.callContract(
      FUNCTIONS.GETSHARDS,
      _creator,
      _txid,
      options
    );
  }

  public async cleanTx(
    _creator: string,
    _txid: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.BYTE32, _creator);
    await this.validateInput(DATATYPES.STRING, _txid);
    return this.callContract(
      FUNCTIONS.CLEANTX,
      _creator,
      _txid,
      options
    );
  }

  public async snapshotBalance(
    _creator: string,
    _token: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.BYTE32, _creator);
    await this.validateInput(DATATYPES.ADDRESS, _token);
    return this.callContract(
      FUNCTIONS.SNAPSHOT,
      _creator,
      _token,
      options
    );
  }

  public async calculateAverageBalance(
    _creator: string,
    _token: string,
    _fromTime: string,
    _toTime: string,
    options?: Options
  ): any {
    await this.validateInput(DATATYPES.BYTE32, _creator);
    await this.validateInput(DATATYPES.ADDRESS, _token);
    await this.validateInput(DATATYPES.NUMBER, _fromTime);
    await this.validateInput(DATATYPES.NUMBER, _toTime);
    return this.callContract(
      FUNCTIONS.CALCULATEAVERAGEBALANCE,
      _creator,
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
