import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
export default class ERC20 extends VerifiedContract {
    contractAddress: string;
    constructor(signer: VerifiedWallet, contractNetworkAddress: string);
    name(): any;
    symbol(): any;
    decimals(): any;
    totalSupply(): any;
    balanceOf(_account: string, options?: {
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
    allowance(_owner: string, _spender: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    increaseAllowance(_spender: string, _addedValue: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    decreaseAllowance(_spender: string, _subtractedValue: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    transferFrom(_senderAddress: string, _recieverAddress: string, _tokens: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
}
