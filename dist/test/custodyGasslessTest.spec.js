"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const index_1 = require("../utils/index");
const index_2 = require("../wallet/index");
const index_3 = require("../index");
describe("Base Sepolia() Custody Gassless Tests", () => {
    const newWallet = index_2.VerifiedWallet.createWallet();
    const provider = new index_1.Provider("https://sepolia.base.org");
    const signer = newWallet.setProvider(provider);
    describe("Tests some functions on custody contract", () => {
        const custodyAddress = "0xB1ae3Fc5B16d3736bf0db20606fB9a10b435392c";
        const custodyContract = new index_3.Custody(signer, custodyAddress);
        it("it should create vault", async () => {
            const createVaultRes = await custodyContract.createVault(Date.now().toString(), Date.now().toString());
            console.log("result: ", createVaultRes);
            (0, assert_1.default)(createVaultRes.status === 0);
        });
    });
});
