import { Signer } from "ethers";
import { VerifiedWallet } from "../wallet";
declare enum STATUS {
    SUCCESS = 0,
    ERROR = 1
}
interface SCResponse {
    response: object;
    status: STATUS;
    message: string;
    reason: string;
    code: number;
}
export declare enum DATATYPES {
    NUMBER = "number",
    STRING = "string",
    ADDRESS = "address",
    BOOLEAN = "boolean",
    BYTE32 = "byte32",
    BYTE16 = "byte16",
    BIGNUMBER = "bignumber"
}
export declare class VerifiedContract {
    private signer;
    private contract;
    private abiInterface;
    constructor(address: string, abi: string, signer: VerifiedWallet | Signer);
    protected validateInput(type: DATATYPES, data: any): Promise<boolean>;
    protected sanitiseInput(type: DATATYPES, data: any): any;
    protected sanitiseOutput(type: DATATYPES, data: any): any;
    /**
     * gets a function state mutability to differenciate between read and write functions
     * @param functionName
     * @returns true or false
     */
    private isReadFunction;
    /**
     * Parses output to standard response
     * @param data
     * @returns
     */
    private tempOutput;
    /** Converts any datatype to array */
    private convertToArray;
    /** Checks if a contract support gasless transaction */
    supportsGasless(chainId: number): boolean;
    /** Creates Biconomy smart account */
    createSmartAccount(chainId: number): Promise<import("@biconomy/account").BiconomySmartAccountV2>;
    fetchUserOpReceipt(userOpHash: string): Promise<any>;
    /** Constructs and call function with ethers.js */
    callFunctionWithEthers(functionName: string, ...args: any): Promise<SCResponse>;
    /** Constructs and call function as userop for biconomy gassless(sponsored/erc20 mode) */
    callFunctionAsUserOp(smartAccount: any, tx: any, functionName: string, paymentToken: string, ...args: any): Promise<SCResponse | undefined>;
    callContract(functionName: string, ...args: any): Promise<SCResponse | undefined>;
    protected getEvent(eventName: string, callback: any): void;
}
export {};
