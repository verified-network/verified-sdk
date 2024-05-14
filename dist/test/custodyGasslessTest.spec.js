"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const index_1 = require("../wallet/index");
const index_2 = require("../index");
const ethers_1 = require("ethers");
describe("Base Sepolia() Custody Gassless Tests", () => {
    const SECURITY_HOLDER_MNEMONICS = "omit floor sport lend knock alpha dumb three gentle hungry screen early";
    const sender = index_1.VerifiedWallet.importWallet(SECURITY_HOLDER_MNEMONICS);
    const provider = new ethers_1.ethers.providers.JsonRpcProvider("https://sepolia.base.org");
    const signer = sender.setProvider(provider);
    describe("Tests some functions on custody contract", () => {
        const custodyAddress = "0xB1ae3Fc5B16d3736bf0db20606fB9a10b435392c";
        const custodyContract = new index_2.Custody(signer, custodyAddress);
        it("it should create vault", async () => {
            const createVaultRes = await custodyContract.createVault("0x7665726966696564", "vltt");
            console.log("result: ", createVaultRes);
            assert_1.default(createVaultRes.response.status === 0);
        });
    });
});
