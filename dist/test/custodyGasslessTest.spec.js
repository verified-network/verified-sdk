"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const index_1 = require("../wallet/index");
const index_2 = require("../index");
const ethers_1 = require("ethers");
describe("Base Sepolia() Custody Gassless Tests", () => {
    // const CREATOR_PRIVATE_KEY =
    //   "0xf73343e93261bbe8189f798007ae731151f2d596f8b018f69ec9ebb1adc6197b";
    const newWallet = index_1.VerifiedWallet.createWallet();
    console.log("new wallet: ", newWallet, Date.now().toString());
    const provider = new ethers_1.ethers.providers.JsonRpcProvider("https://sepolia.base.org");
    // const sender = new VerifiedWallet(CREATOR_PRIVATE_KEY, provider)
    const signer = newWallet.setProvider(provider);
    describe("Tests some functions on custody contract", () => {
        const custodyAddress = "0xB1ae3Fc5B16d3736bf0db20606fB9a10b435392c";
        const custodyContract = new index_2.Custody(signer, custodyAddress);
        it("it should create vault", async () => {
            const createVaultRes = await custodyContract.createVault(ethers_1.ethers.utils.formatBytes32String(Date.now().toString()), Date.now().toString());
            console.log("result: ", createVaultRes);
            (0, assert_1.default)(createVaultRes.status === 0);
        });
    });
});
