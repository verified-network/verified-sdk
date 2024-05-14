"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const index_1 = require("../utils/index");
const index_2 = require("../wallet/index");
const index_3 = require("../index");
describe("Test to check decimals function just added on ERC20", () => {
    const INFURA_API_KEY = "e0951a7b82c84a6880f3c6f7bb182e21";
    const SIGNER_MNEMONICS = "correct galaxy various swap chair assault blue improve ivory pear infant oak";
    const sender = index_2.VerifiedWallet.importWallet(SIGNER_MNEMONICS);
    const signer = sender.setProvider(index_1.Provider.infuraProvider(11155111, INFURA_API_KEY));
    const currencyTokenAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"; //usdc
    const securityTokenAddress = "0xd67ab44e2b5Ed42559D9470bd367793f0eC183db";
    describe("Sepolia Currency decimals test", () => {
        const currencyContract = new index_3.ERC20(signer, currencyTokenAddress);
        it("call and return decimals", async () => {
            const decimalsRes = await currencyContract.decimals();
            console.log("decimals response: ", decimalsRes.response); //log response to better explain
            (0, assert_1.default)(decimalsRes.status === 0); //check no error(s)
        });
    });
    describe("Sepolia Security decimals test", () => {
        const securityContract = new index_3.ERC20(signer, securityTokenAddress);
        it("call and return decimals", async () => {
            const decimalsRes = await securityContract.decimals();
            console.log("decimals response: ", decimalsRes.response); //log response to better explain
            (0, assert_1.default)(decimalsRes.status === 0); //check no error(s)
        });
    });
});
