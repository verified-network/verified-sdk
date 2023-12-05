"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const index_1 = require("../utils/index");
const index_2 = require("../wallet/index");
const index_3 = require("../index");
const ethers_1 = require("ethers");
describe("Polygon Mumbai Testnet Tests", () => {
    const INFURA_API_KEY = "e0951a7b82c84a6880f3c6f7bb182e21";
    const SECURITY_HOLDER_MNEMONICS = "correct galaxy various swap chair assault blue improve ivory pear infant oak";
    const sender = index_2.VerifiedWallet.importWallet(SECURITY_HOLDER_MNEMONICS);
    const signer = sender.setProvider(index_1.Provider.infuraProvider(80001, INFURA_API_KEY));
    describe("SecurityFactories Gasless Test", () => {
        const securityFactoryAddress = "0xf1f349C2CBDA5BCAfD7F95b20C812b4A17c9333D";
        const securityFactoryContract = new index_3.SecuritiesFactory(signer, securityFactoryAddress);
        const zeroAddress = "0x0000000000000000000000000000000000000000";
        it("it should Issue Security", async () => {
            const BTCShortBytes = "0x425443";
            const currency = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F"; //usdc
            const defaultBytes = "0x4346440000000000000000000000000000000000000000000000000000000000";
            const indiaBytes = "0x496e646961000000000000000000000000000000000000000000000000000000";
            const abiCoder = ethers_1.ethers.utils.defaultAbiCoder;
            const encodedArray = abiCoder.encode(["bytes32[]"], [[]]);
            await securityFactoryContract
                .issueSecurity(zeroAddress, defaultBytes, BTCShortBytes, BTCShortBytes, currency, signer.address, signer.address, encodedArray, indiaBytes, "false")
                .then(async (res) => {
                let hash = res.response.hash || "";
                console.log("Issued Security successfully with transaction hash: ", hash);
                assert_1.default.notEqual(hash.length, 0);
            })
                .catch((err) => {
                console.error("IssueSecurity failed with error: ", err);
            });
        });
        it(`should add Balance(mint 100) security tokens to user's wallet `, async () => {
            const securityIssued = "0x46247bd421989de3beec138f37db892c8adfdf9c";
            await securityFactoryContract
                .addBalance(securityIssued, zeroAddress, signer.address, "1000000000000000000000")
                .then(async (res) => {
                let addBalanceHash = res.response.hash || "";
                console.log("Security Minted succesfully with hash: ", addBalanceHash);
                assert_1.default.notEqual(addBalanceHash.length, 0);
            })
                .catch((err) => {
                console.error("Mint security failed with error: ", err);
            });
        });
        it(`should test sending 1 security token from callers's wallet`, async () => {
            const securityIssued = "0x46247bd421989de3beec138f37db892c8adfdf9c";
            const securityContract = new index_3.Security(signer, securityIssued);
            const receiverAddress = "0x286a759DACfd0C533B88E42b9e7571040008D778";
            const amount = "1000000000000000000";
            await securityContract
                .transfer(receiverAddress, amount)
                .then((res) => {
                let transferHash = res.response.hash || "";
                console.log("Transfer succesful with hash: ", transferHash);
                assert_1.default.notEqual(transferHash, 0);
            })
                .catch((err) => {
                console.error("Transfer failed with error: ", err);
            });
        });
    });
});
