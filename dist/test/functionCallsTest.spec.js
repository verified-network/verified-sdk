"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const index_1 = require("../utils/index");
const index_2 = require("../wallet/index");
const index_3 = tslib_1.__importDefault(require("../contract/custody/index"));
const sinon_1 = tslib_1.__importDefault(require("sinon"));
describe("Read Function Test", () => {
    const CREATOR_MNEMONICS = "omit floor sport lend knock alpha dumb three gentle hungry screen early";
    const INFURA_API_KEY = "e0951a7b82c84a6880f3c6f7bb182e21";
    const sender = index_2.VerifiedWallet.importWallet(CREATOR_MNEMONICS);
    const provider = index_1.Provider.infuraProvider(11155111, INFURA_API_KEY);
    const signer = sender.setProvider(provider);
    const custodyAddress = "0x7aE9f79067AB4FDc8d41B18f1e6491590ac76f9d";
    const custodyContract = new index_3.default(signer, custodyAddress);
    describe("Tests some functions on custody contract", () => {
        it("should get vaults without calling callFunctionAsUserOp", async () => {
            // Mock callFunctionAsUserOp to check if it's called
            const callFunctionAsUserOpStub = sinon_1.default.stub(custodyContract, 'callFunctionAsUserOp');
            // Call getVaults method
            const getVaultsRes = await custodyContract.getVaults();
            // Assert callFunctionAsUserOp was not called
            assert_1.default.strictEqual(callFunctionAsUserOpStub.called, false);
            // Assert response status is success
            (0, assert_1.default)(getVaultsRes.status === 0);
            // Assert response result is returned
            (0, assert_1.default)(getVaultsRes.response, 'Expected response to be returned');
            // Clean up the stub
            callFunctionAsUserOpStub.restore();
        });
    });
});
