"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const index_1 = require("../utils/index");
const index_2 = require("../wallet/index");
const index_3 = require("../index");
describe("Polygon Mumbai Custody Gassless Tests", () => {
    const INFURA_API_KEY = "e0951a7b82c84a6880f3c6f7bb182e21";
    const SECURITY_HOLDER_MNEMONICS = "omit floor sport lend knock alpha dumb three gentle hungry screen early";
    const sender = index_2.VerifiedWallet.importWallet(SECURITY_HOLDER_MNEMONICS);
    const signer = sender.setProvider(index_1.Provider.infuraProvider(80001, INFURA_API_KEY));
    describe("Tests some functions on custody contract", () => {
        const custodyAddress = "0x27006b68b3594EF5Ae04C5457c24F0c7CF1E5553";
        const custodyContract = new index_3.Custody(signer, custodyAddress);
        it("it should create vault", async () => {
            const createVaultRes = await custodyContract.createVault("0x7665726966696564", "vltt");
            assert_1.default(createVaultRes.response.status === 0);
        });
    });
});
