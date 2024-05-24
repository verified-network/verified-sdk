"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const index_1 = require("../utils/index");
const index_2 = require("../wallet/index");
const index_3 = require("../index");
describe("Sepolia(11155111) Custody Gassless Tests", () => {
    const INFURA_API_KEY = "e0951a7b82c84a6880f3c6f7bb182e21";
    const newWallet = index_2.VerifiedWallet.createWallet();
    const provider = index_1.Provider.infuraProvider(11155111, INFURA_API_KEY);
    const signer = newWallet.setProvider(provider);

    describe("Tests some functions on custody contract", () => {
        const custodyAddress = "0x7aE9f79067AB4FDc8d41B18f1e6491590ac76f9d";
        const custodyContract = new index_3.Custody(signer, custodyAddress);
        it("it should create vault", async () => {
            const createVaultRes = await custodyContract.createVault(Date.now().toString(), Date.now().toString());
            (0, assert_1.default)(createVaultRes.response.status === 0);
            console.log("result: ", createVaultRes);
        });
    });
});
