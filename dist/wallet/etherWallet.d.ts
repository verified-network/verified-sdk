import { ethers } from 'ethers';
import { Provider } from "@ethersproject/abstract-provider";
import { ExternallyOwnedAccount } from "@ethersproject/abstract-signer";
import { BytesLike } from "@ethersproject/bytes";
import { SigningKey } from "@ethersproject/signing-key";
import { Mnemonic } from "@ethersproject/hdnode";
export type ExternalAccount = ExternallyOwnedAccount;
export type VerifiedBytesLike = BytesLike;
export declare class EtherWallet extends ethers.Wallet {
    constructor(privateKey: BytesLike | ExternallyOwnedAccount | SigningKey, provider?: Provider);
    static parseMnemonics(mnemonic: string, path?: string): ethers.utils.HDNode;
    setMnemonics(srcMnemonic: Mnemonic): void;
}
