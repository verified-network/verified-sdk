import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../../wallet";
export default class Security extends VerifiedContract {
    contractAddress: string;
    constructor(signer: VerifiedWallet, tokenAddress: string);
    whiteList(_spender: string, _amount: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    transfer(_recipient: string, _amount: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    approve(_spender: string, _amount: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    transferFrom(_spender: string, _recipient: string, _amount: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    increaseAllowance(_spender: string, _amount: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    decreaseAllowance(_spender: string, _amount: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    freeze(_holder: string, _amount: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    unfreeze(_holder: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    frozen(_account: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    burn(_holder: string, _amount: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    burnAll(options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    schedule(_time: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    reschedule(_oldtime: string, _newtime: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    unschedule(_time: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    createResolution(_time: string, _votes: string, _ipfslink: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    countVotes(_time: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    payoutProrata(_time: string, _wallet: string, _token: string, _amount: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    payout(_time: string, _holder: string, _wallet: string, _token: string, _amount: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    pause(options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    unpause(options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    withdrawableFundsOf(_holder: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    withdrawnFundsOf(_holder: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    accumulativeFundsOf(_holder: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    withdrawFunds(options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    pushFunds(_holder: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    updateFundsReceived(options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
}
