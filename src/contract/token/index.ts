// @ts-nocheck

import { VerifiedContract } from '../index';
import { VerifiedWallet } from "../../wallet";
import { abi, networks } from '../../abi/payments/Token.json';
import { DATATYPES } from "../index";

enum FUNCTIONS {
    TRANSFERTOKEN = 'transferToken'
}

export default class TokenContract extends VerifiedContract {
    public contractAddress: string
    constructor(signer: VerifiedWallet) {

        const chainId: string = signer.provider._network.chainId.toString()
        const address = networks[chainId].address
        super(address, JSON.stringify(abi), signer)

        this.contractAddress = address
    }

    /**
  * Lend by purchasing bond token against other cash token  [callable by client] 
  * _sender is address of bond token redeemed, 
  * _receiver is bond token address,
  * _tokens is amount of tokens redeemed
  * @param (address _sender, address _receiver, uint256 _tokens) 
* @returns bool
*/
    public async transferToken(_senderAddress: string, _recieverAddress: string, _tokens: string, options?: { gasPrice: number, gasLimit: number }): any {
        await this.validateInput(DATATYPES.ADDRESS, _senderAddress)
        await this.validateInput(DATATYPES.ADDRESS, _recieverAddress)
        await this.validateInput(DATATYPES.STRING, _tokens)
        return this.callContract(FUNCTIONS.TRANSFERTOKEN, _senderAddress, _recieverAddress, _tokens, options)
    }
}