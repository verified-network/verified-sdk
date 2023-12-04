"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../utils/index");
const index_2 = require("../wallet/index");
const index_3 = require("../index");
const ethers_1 = require("ethers");
const testSecurityFactoryIssueProduct = async (securityFactoryAddress) => {
    const INFURA_API_KEY = "95c1322d7c0e44de9ea77cc9eea18534";
    const SECURITY_HOLDER_MNEMONICS = "correct galaxy various swap chair assault blue improve ivory pear infant oak";
    const sender = index_2.VerifiedWallet.importWallet(SECURITY_HOLDER_MNEMONICS);
    const signer = sender.setProvider(index_1.Provider.infuraProvider(80001, INFURA_API_KEY));
    const securityFactoryContract = new index_3.SecuritiesFactory(signer, securityFactoryAddress);
    const zeroAddress = "0x0000000000000000000000000000000000000000";
    const BTCShortBytes = "0x425443";
    const currency = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F"; //usdc
    const defaultBytes = "0x4346440000000000000000000000000000000000000000000000000000000000";
    const indiaBytes = "0x496e646961000000000000000000000000000000000000000000000000000000";
    const restrictions = [];
    const abiCoder = ethers_1.ethers.utils.defaultAbiCoder;
    const encodedArray = abiCoder.encode(["bytes32[]"], [restrictions]);
    await securityFactoryContract
        .issueSecurity(zeroAddress, defaultBytes, BTCShortBytes, BTCShortBytes, currency, sender.address, sender.address, encodedArray, indiaBytes, "false")
        .then(async (res) => {
        console.log("Security Issued Succesfully with hash: ", res.response.hash);
        securityFactoryContract.notifySecuritiesAdded(async (evnt) => {
            const security = evnt.response.result[0];
            console.log("added security : ", security, "succesfully");
            if (security) {
                await securityFactoryContract
                    .addBalance(security, zeroAddress, sender.address, "1000000000000000000000000")
                    .then(async (_res) => {
                    console.log("Security Minted succesfully with hash: ", _res.response.hash);
                })
                    .catch((_err) => {
                    console.error("Mint security failed with error: ", _err);
                });
            }
        });
    })
        .catch((err) => {
        console.error("issueSecurity failed with error: ", err);
    });
};
testSecurityFactoryIssueProduct("0xf1f349C2CBDA5BCAfD7F95b20C812b4A17c9333D");
