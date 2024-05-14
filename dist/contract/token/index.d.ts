import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
export default class Token extends VerifiedContract {
    contractAddress: string;
    constructor(signer: VerifiedWallet, bondCurrencyAddress: string);
    /**
     * Lend by purchasing bond token against other cash token  [callable by client]
     * _sender is address of bond token redeemed,
     * _receiver is bond token address,
     * _tokens is amount of tokens redeemed
     * @param (address _sender, address _receiver, uint256 _tokens)
    * @returns bool
    */
    transferFrom(_senderAddress: string, _recieverAddress: string, _tokens: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    balanceOf(_wallet: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    getIssuer(): any;
    requestTransfer(_recieverAddress: string, _tokens: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
    requestTransaction(_amount: string, _payer: string, _collateralName: string, _collateralContract: string, options?: {
        gasPrice: number;
        gasLimit: number;
    }): any;
}
