import { VerifiedContract } from '../../index';
import { VerifiedWallet } from "../../../wallet";
export default class SecondaryIssueManager extends VerifiedContract {
    contractAddress: string;
    constructor(signer: VerifiedWallet, contractNetworkAddress: string);
    issueSecondary(security: string, currency: string, securityOutstanding: string, securityAmount: string, minOrderSize: string, currencyAmount: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    setIssuingFee(security: string, currency: string, swapfee: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    getSettlementRequests(dpid: string, poolid: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    getSettlementRequest(ref: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    setSettlementStatus(ref: string, status: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    getSubscribers(poolId: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
    close(poolId: string, options?: {
        gasPrice: any;
        gasLimit: any;
    }): any;
}
