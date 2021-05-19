/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import BN from "bn.js";
import { Contract, ContractOptions } from "web3-eth-contract";
import { EventLog } from "web3-core";
import { EventEmitter } from "events";
import { ContractEvent, Callback, TransactionObject, BlockType } from "./types";

interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export class DepositAllocater extends Contract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  );
  clone(): DepositAllocater;
  methods: {
    allowance(owner: string, spender: string): TransactionObject<string>;

    approve(
      spender: string,
      amount: number | string
    ): TransactionObject<boolean>;

    balanceOf(account: string): TransactionObject<string>;

    balanceOfAt(
      holder: string,
      timestamp: number | string
    ): TransactionObject<string>;

    calculateClaimOnDeposit(
      payee: string,
      depositId: string | number[]
    ): TransactionObject<string>;

    checkpointBalances(
      arg0: string,
      arg1: number | string
    ): TransactionObject<{
      timestamp: string;
      value: string;
      0: string;
      1: string;
    }>;

    checkpointTotalSupply(
      arg0: number | string
    ): TransactionObject<{
      timestamp: string;
      value: string;
      0: string;
      1: string;
    }>;

    claimDeposit(depositId: string | number[]): TransactionObject<void>;

    createDeposit(
      depositId: string | number[],
      scheduledFor: number | string,
      signalingCutoff: number | string,
      onlySignaled: boolean,
      token: string
    ): TransactionObject<void>;

    decimals(): TransactionObject<string>;

    decreaseAllowance(
      spender: string,
      subtractedValue: number | string
    ): TransactionObject<boolean>;

    deposits(
      arg0: string | number[]
    ): TransactionObject<{
      scheduledFor: string;
      signalingCutoff: string;
      amount: string;
      claimedAmount: string;
      totalAmountSignaled: string;
      token: string;
      onlySignaled: boolean;
      0: string;
      1: string;
      2: string;
      3: string;
      4: string;
      5: string;
      6: boolean;
    }>;

    getDeposit(
      depositId: string | number[]
    ): TransactionObject<{
      scheduledFor: string;
      amount: string;
      claimedAmount: string;
      totalAmountSignaled: string;
      onlySignaled: boolean;
      token: string;
      0: string;
      1: string;
      2: string;
      3: string;
      4: boolean;
      5: string;
    }>;

    getHolderSubsetAt(
      checkpointId: number | string,
      start: number | string,
      end: number | string
    ): TransactionObject<string[]>;

    getHoldersAt(checkpointId: number | string): TransactionObject<string[]>;

    getNumberOfHolders(): TransactionObject<string>;

    hasClaimedDeposit(
      holder: string,
      depositId: string | number[]
    ): TransactionObject<boolean>;

    holderCount(): TransactionObject<string>;

    holderExists(arg0: string): TransactionObject<boolean>;

    holders(arg0: number | string): TransactionObject<string>;

    increaseAllowance(
      spender: string,
      addedValue: number | string
    ): TransactionObject<boolean>;

    name(): TransactionObject<string>;

    pushFundsToAddresses(
      depositId: string | number[],
      payees: string[]
    ): TransactionObject<void>;

    signalAmountForDeposit(
      depositId: string | number[],
      signalAmount: number | string
    ): TransactionObject<void>;

    symbol(): TransactionObject<string>;

    totalAmountSignaledByHolder(arg0: string): TransactionObject<string>;

    totalSupply(): TransactionObject<string>;

    totalSupplyAt(timestamp: number | string): TransactionObject<string>;

    transfer(
      recipient: string,
      amount: number | string
    ): TransactionObject<boolean>;

    transferFrom(
      sender: string,
      recipient: string,
      amount: number | string
    ): TransactionObject<boolean>;

    updateDepositAmount(
      depositId: string | number[],
      amount: number | string
    ): TransactionObject<void>;
  };
  events: {
    Approval: ContractEvent<{
      owner: string;
      spender: string;
      value: string;
      0: string;
      1: string;
      2: string;
    }>;
    CheckpointCreated: ContractEvent<string>;
    Transfer: ContractEvent<{
      from: string;
      to: string;
      value: string;
      0: string;
      1: string;
      2: string;
    }>;
    allEvents: (
      options?: EventOptions,
      cb?: Callback<EventLog>
    ) => EventEmitter;
  };
}