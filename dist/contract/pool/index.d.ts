import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../../wallet";
declare type SingleSwap = {
    poolId: string;
    kind: string;
    assetIn: string;
    assetOut: string;
    amount: string;
    userData: string;
};
declare type Swap = {
    poolId: string;
    assetInIndex: string;
    assetOutIndex: string;
    amount: string;
    userData: string;
};
declare type Funds = {
    sender: string;
    fromInternalBalance: boolean;
    recipient: string;
    toInternalBalance: boolean;
};
export default class PoolContract extends VerifiedContract {
    contractAddress: string;
    constructor(signer: VerifiedWallet);
    swap(_swap: SingleSwap, _funds: Funds, _limit: string, _deadline: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    batchSwap(_kind: string, _swaps: Swap[], _assests: string[], _funds: Funds, _limits: string[], _deadline: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    getPoolTokens(_poolId: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
}
export {};
