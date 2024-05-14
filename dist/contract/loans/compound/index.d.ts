import { VerifiedContract } from '../../index';
import { VerifiedWallet } from "../../../wallet";
export default class Compound extends VerifiedContract {
    contractAddress: string;
    constructor(signer: VerifiedWallet, contractNetworkAddress: string);
    setSigner(_address: string): any;
    /**
   * Submits new RWA to Compound
   * @params (address asset, address bond, uint256 apy, string memory issuingDocs, uint256 faceValue)
   * @returns
   */
    submitNewRWA(asset: string, bond: string, apy: string, issuingDocs: string, faceValue: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    /**
     * Posts collateral to Compound
     * @params (address asset, address collateral, uint256 amount)
     * @returns
     */
    postCollateral(asset: string, collateral: string, amount: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    /**
     * Borrows from Compound
     * @params (address base, uint256 amount)
     * @returns
     */
    borrowBase(base: string, amount: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    /**
     * Repays to Compound
     * @params (address base, uint256 amount)
     * @returns
     */
    repayBase(base: string, amount: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
}
