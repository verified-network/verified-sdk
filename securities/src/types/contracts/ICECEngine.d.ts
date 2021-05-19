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

export class ICECEngine extends Contract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  );
  clone(): ICECEngine;
  methods: {
    computeCyclicScheduleSegment(
      terms: {
        contractType: number | string;
        calendar: number | string;
        contractRole: number | string;
        dayCountConvention: number | string;
        businessDayConvention: number | string;
        endOfMonthConvention: number | string;
        creditEventTypeCovered: number | string;
        feeBasis: number | string;
        statusDate: number | string;
        maturityDate: number | string;
        notionalPrincipal: number | string;
        feeRate: number | string;
        coverageOfCreditEnhancement: number | string;
        contractReference_1: {
          object: string | number[];
          object2: string | number[];
          _type: number | string;
          role: number | string;
        };
        contractReference_2: {
          object: string | number[];
          object2: string | number[];
          _type: number | string;
          role: number | string;
        };
      },
      segmentStart: number | string,
      segmentEnd: number | string,
      eventType: number | string
    ): TransactionObject<string[]>;

    computeInitialState(terms: {
      contractType: number | string;
      calendar: number | string;
      contractRole: number | string;
      dayCountConvention: number | string;
      businessDayConvention: number | string;
      endOfMonthConvention: number | string;
      creditEventTypeCovered: number | string;
      feeBasis: number | string;
      statusDate: number | string;
      maturityDate: number | string;
      notionalPrincipal: number | string;
      feeRate: number | string;
      coverageOfCreditEnhancement: number | string;
      contractReference_1: {
        object: string | number[];
        object2: string | number[];
        _type: number | string;
        role: number | string;
      };
      contractReference_2: {
        object: string | number[];
        object2: string | number[];
        _type: number | string;
        role: number | string;
      };
    }): TransactionObject<{
      contractPerformance: string;
      statusDate: string;
      maturityDate: string;
      exerciseDate: string;
      terminationDate: string;
      feeAccrued: string;
      exerciseAmount: string;
    }>;

    computeNextCyclicEvent(
      terms: {
        contractType: number | string;
        calendar: number | string;
        contractRole: number | string;
        dayCountConvention: number | string;
        businessDayConvention: number | string;
        endOfMonthConvention: number | string;
        creditEventTypeCovered: number | string;
        feeBasis: number | string;
        statusDate: number | string;
        maturityDate: number | string;
        notionalPrincipal: number | string;
        feeRate: number | string;
        coverageOfCreditEnhancement: number | string;
        contractReference_1: {
          object: string | number[];
          object2: string | number[];
          _type: number | string;
          role: number | string;
        };
        contractReference_2: {
          object: string | number[];
          object2: string | number[];
          _type: number | string;
          role: number | string;
        };
      },
      lastScheduleTime: number | string,
      eventType: number | string
    ): TransactionObject<string>;

    computeNextNonCyclicEvent(
      terms: {
        contractType: number | string;
        calendar: number | string;
        contractRole: number | string;
        dayCountConvention: number | string;
        businessDayConvention: number | string;
        endOfMonthConvention: number | string;
        creditEventTypeCovered: number | string;
        feeBasis: number | string;
        statusDate: number | string;
        maturityDate: number | string;
        notionalPrincipal: number | string;
        feeRate: number | string;
        coverageOfCreditEnhancement: number | string;
        contractReference_1: {
          object: string | number[];
          object2: string | number[];
          _type: number | string;
          role: number | string;
        };
        contractReference_2: {
          object: string | number[];
          object2: string | number[];
          _type: number | string;
          role: number | string;
        };
      },
      lastNonCyclicEvent: string | number[]
    ): TransactionObject<string>;

    computeNonCyclicScheduleSegment(
      terms: {
        contractType: number | string;
        calendar: number | string;
        contractRole: number | string;
        dayCountConvention: number | string;
        businessDayConvention: number | string;
        endOfMonthConvention: number | string;
        creditEventTypeCovered: number | string;
        feeBasis: number | string;
        statusDate: number | string;
        maturityDate: number | string;
        notionalPrincipal: number | string;
        feeRate: number | string;
        coverageOfCreditEnhancement: number | string;
        contractReference_1: {
          object: string | number[];
          object2: string | number[];
          _type: number | string;
          role: number | string;
        };
        contractReference_2: {
          object: string | number[];
          object2: string | number[];
          _type: number | string;
          role: number | string;
        };
      },
      segmentStart: number | string,
      segmentEnd: number | string
    ): TransactionObject<string[]>;

    computePayoffForEvent(
      terms: {
        contractType: number | string;
        calendar: number | string;
        contractRole: number | string;
        dayCountConvention: number | string;
        businessDayConvention: number | string;
        endOfMonthConvention: number | string;
        creditEventTypeCovered: number | string;
        feeBasis: number | string;
        statusDate: number | string;
        maturityDate: number | string;
        notionalPrincipal: number | string;
        feeRate: number | string;
        coverageOfCreditEnhancement: number | string;
        contractReference_1: {
          object: string | number[];
          object2: string | number[];
          _type: number | string;
          role: number | string;
        };
        contractReference_2: {
          object: string | number[];
          object2: string | number[];
          _type: number | string;
          role: number | string;
        };
      },
      state: {
        contractPerformance: number | string;
        statusDate: number | string;
        maturityDate: number | string;
        exerciseDate: number | string;
        terminationDate: number | string;
        feeAccrued: number | string;
        exerciseAmount: number | string;
      },
      _event: string | number[],
      externalData: string | number[]
    ): TransactionObject<string>;

    computeStateForEvent(
      terms: {
        contractType: number | string;
        calendar: number | string;
        contractRole: number | string;
        dayCountConvention: number | string;
        businessDayConvention: number | string;
        endOfMonthConvention: number | string;
        creditEventTypeCovered: number | string;
        feeBasis: number | string;
        statusDate: number | string;
        maturityDate: number | string;
        notionalPrincipal: number | string;
        feeRate: number | string;
        coverageOfCreditEnhancement: number | string;
        contractReference_1: {
          object: string | number[];
          object2: string | number[];
          _type: number | string;
          role: number | string;
        };
        contractReference_2: {
          object: string | number[];
          object2: string | number[];
          _type: number | string;
          role: number | string;
        };
      },
      state: {
        contractPerformance: number | string;
        statusDate: number | string;
        maturityDate: number | string;
        exerciseDate: number | string;
        terminationDate: number | string;
        feeAccrued: number | string;
        exerciseAmount: number | string;
      },
      _event: string | number[],
      externalData: string | number[]
    ): TransactionObject<{
      contractPerformance: string;
      statusDate: string;
      maturityDate: string;
      exerciseDate: string;
      terminationDate: string;
      feeAccrued: string;
      exerciseAmount: string;
    }>;

    contractType(): TransactionObject<string>;

    isEventScheduled(
      _event: string | number[],
      terms: {
        contractType: number | string;
        calendar: number | string;
        contractRole: number | string;
        dayCountConvention: number | string;
        businessDayConvention: number | string;
        endOfMonthConvention: number | string;
        creditEventTypeCovered: number | string;
        feeBasis: number | string;
        statusDate: number | string;
        maturityDate: number | string;
        notionalPrincipal: number | string;
        feeRate: number | string;
        coverageOfCreditEnhancement: number | string;
        contractReference_1: {
          object: string | number[];
          object2: string | number[];
          _type: number | string;
          role: number | string;
        };
        contractReference_2: {
          object: string | number[];
          object2: string | number[];
          _type: number | string;
          role: number | string;
        };
      },
      state: {
        contractPerformance: number | string;
        statusDate: number | string;
        maturityDate: number | string;
        exerciseDate: number | string;
        terminationDate: number | string;
        feeAccrued: number | string;
        exerciseAmount: number | string;
      },
      underlyingState: { exerciseAmount: number | string; isSet: boolean }
    ): TransactionObject<boolean>;
  };
  events: {
    allEvents: (
      options?: EventOptions,
      cb?: Callback<EventLog>
    ) => EventEmitter;
  };
}