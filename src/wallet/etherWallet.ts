// SPDX-License-Identifier: BUSL-1.1

"use strict"
import { ethers } from 'ethers';
import { Provider } from "@ethersproject/abstract-provider";
import { ExternallyOwnedAccount } from "@ethersproject/abstract-signer";
import { BytesLike } from "@ethersproject/bytes";
import { _TypedDataEncoder } from "@ethersproject/hash";
import { SigningKey } from "@ethersproject/signing-key";
import { defineReadOnly } from "@ethersproject/properties";
import { defaultPath, HDNode, Mnemonic } from "@ethersproject/hdnode";

export type ExternalAccount = ExternallyOwnedAccount;
export type VerifiedBytesLike = BytesLike;

export class EtherWallet extends ethers.Wallet {

    constructor(privateKey: BytesLike | ExternallyOwnedAccount | SigningKey, provider?: Provider) {
        super(privateKey, provider);
    }

    static parseMnemonics(mnemonic: string, path?: string): ethers.utils.HDNode {
        if (!path) { path = defaultPath; }
        return HDNode.fromMnemonic(mnemonic).derivePath(path);
    }
    
    setMnemonics(srcMnemonic: Mnemonic) {
        defineReadOnly(this, "_mnemonic", () => (
            {
                phrase: srcMnemonic.phrase,
                path: srcMnemonic.path || defaultPath,
                locale: srcMnemonic.locale || "en"
            }
        ));
    }

}