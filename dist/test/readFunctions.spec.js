"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const index_1 = require("../utils/index");
const index_2 = require("../wallet/index");
const index_3 = require("../index");
describe("Test to check new tempOutout fix on sepolia chain(11155111)", () => {
    const INFURA_API_KEY = "e0951a7b82c84a6880f3c6f7bb182e21";
    const SIGNER_MNEMONICS = "correct galaxy various swap chair assault blue improve ivory pear infant oak";
    const sender = index_2.VerifiedWallet.importWallet(SIGNER_MNEMONICS);
    const signer = sender.setProvider(index_1.Provider.infuraProvider(11155111, INFURA_API_KEY));
    const liquidityContractAddress = "0x27006b68b3594EF5Ae04C5457c24F0c7CF1E5553";
    const primaryManagerAddress = "0x41bB86106CC5156d915052c3a3EFb4be70Ec544E";
    const currencyOffered = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"; //sepolia(11155111) USDC
    // test using getSupportedTokens on liquidity contract and getOffered on primaryIssueManager contract due to dapp error
    describe("getSupportedTokens Test", () => {
        const liquidityContract = new index_3.Liquidity(signer, liquidityContractAddress);
        it("it call getSupportedTokens on liquidity contract and return response without error(s)", async () => {
            const getSupportedTokenRes = await liquidityContract.getSupportedTokens();
            console.log("get supported tokens response: ", getSupportedTokenRes.response); //log response to better explain
            (0, assert_1.default)(getSupportedTokenRes.status === 0); //check no error(s)
        });
    });
    describe("getOffered Test", () => {
        const primarymanagerContract = new index_3.PrimaryIssueManager(signer, primaryManagerAddress, "balancer");
        it("it call getOffered on balancer primaryissue manager contract and return response without error(s)", async () => {
            const getOfferedRes = await primarymanagerContract.getOffered(currencyOffered);
            console.log("get offered response: ", getOfferedRes.response.result); //log response
            (0, assert_1.default)(getOfferedRes.status === 0); //check no error(s)
        });
    });
});
