"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const index_1 = require("../utils/index");
const index_2 = require("../wallet/index");
const index_3 = require("../index");
describe("Pool/Balancer Vault Tests on GOERLI", () => {
    const INFURA_API_KEY = "e0951a7b82c84a6880f3c6f7bb182e21";
    const SECURITY_HOLDER_MNEMONICS = "correct galaxy various swap chair assault blue improve ivory pear infant oak";
    const sender = index_2.VerifiedWallet.importWallet(SECURITY_HOLDER_MNEMONICS);
    const signer = sender.setProvider(index_1.Provider.infuraProvider(5, INFURA_API_KEY));
    const vaultAddress = "0xba12222222228d8ba445958a75a0704d566bf2c8";
    const vaultContract = new index_3.Pool(signer);
    const securityContract = new index_3.Security(signer, "0x89b60e2b51D5b604F54786D16b75F4E54594Cde8");
    let isApprove = false;
    beforeEach(async () => {
        await securityContract.approve(vaultAddress, "1000000000000000000").then(async (res) => {
            if (res.response.hash) {
                console.log("vault approve succesfully with hash: ", res.response.hash);
                isApprove = true;
            }
        }).catch((err) => {
            console.error("approve failed with error: ", err);
        });
    });
    describe("Swap Test", () => {
        const singleSwap = {
            poolId: "0x10fb5f3ce20f53cebc9d6e352c62fe7f86fc16f6000000000000000000000938",
            kind: "0",
            assetIn: "0x89b60e2b51D5b604F54786D16b75F4E54594Cde8",
            assetOut: "0x10fb5f3ce20f53cebc9d6e352c62fe7f86fc16f6",
            amount: "1000000000000000000",
            userData: "0x",
        };
        const fund = {
            sender: signer.address,
            fromInternalBalance: false,
            recipient: signer.address,
            toInternalBalance: false,
        };
        const limit = "0";
        const deadLine = "999999999999999999";
        it("it should create market order that swap security(BTC) => USDC", async () => {
            if (isApprove) {
                await vaultContract.swap(singleSwap, fund, limit, deadLine).then((_res) => {
                    assert_1.default.notEqual(_res, null);
                    assert_1.default.notEqual(_res.response.hash.length, 0);
                    console.log("swap transaction succesfully with hash: ", _res.response.hash);
                }).catch((err) => {
                    console.error("swap failed with error: ", err);
                    assert_1.default.equal(1, 0); //should fail test
                });
            }
            else {
                assert_1.default.equal(1, 0); //should fail test
            }
        });
    });
    describe("Batch swap Test", () => {
        const assets = ["0x89b60e2b51D5b604F54786D16b75F4E54594Cde8", "0x07865c6E87B9F70255377e024ace6630C1Eaa37F", "0x10fb5f3ce20f53cebc9d6e352c62fe7f86fc16f6"];
        const swap = [
            {
                poolId: "0x10fb5f3ce20f53cebc9d6e352c62fe7f86fc16f6000000000000000000000938",
                assetInIndex: "0",
                assetOutIndex: "2",
                amount: "1000000000000000000",
                userData: "0x",
            }
        ];
        const fund = {
            sender: signer.address,
            fromInternalBalance: false,
            recipient: signer.address,
            toInternalBalance: false,
        };
        const limits = ["1000000000000000000", "0", "0"];
        const deadLine = "999999999999999999";
        it("it should create market order that batchswap security(BTC) => USDC", async () => {
            if (isApprove) {
                await vaultContract.batchSwap("0", swap, assets, fund, limits, deadLine).then((res) => {
                    assert_1.default.notEqual(res, null);
                    assert_1.default.notEqual(res.response.hash.length, 0);
                    console.log("batchwap transaction succesfully with hash: ", res.response.hash);
                }).catch((err) => {
                    console.error("Batchswap failed with error: ", err);
                    assert_1.default.equal(1, 0); //should fail test
                });
            }
            else {
                assert_1.default.equal(1, 0); //should fail test
            }
        });
    });
});
