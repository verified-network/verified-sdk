import assert from 'assert';
import { Provider } from "../utils/index";
import { VerifiedWallet } from "../wallet/index";
import Custody from "../contract/custody/index";
import sinon from 'sinon';

describe("Read Function Test", () => {      
  const CREATOR_MNEMONICS = "omit floor sport lend knock alpha dumb three gentle hungry screen early";
  const INFURA_API_KEY = "e0951a7b82c84a6880f3c6f7bb182e21";
  const sender = VerifiedWallet.importWallet(CREATOR_MNEMONICS);
  const provider = Provider.infuraProvider(11155111, INFURA_API_KEY);
  const signer = sender.setProvider(provider);
  const custodyAddress = "0x7aE9f79067AB4FDc8d41B18f1e6491590ac76f9d";
  const custodyContract = new Custody(signer, custodyAddress);

  describe("Tests some functions on custody contract", () => {
    it("should get vaults without calling callFunctionAsUserOp", async () => {
      // Mock callFunctionAsUserOp to check if it's called
      const callFunctionAsUserOpStub = sinon.stub(custodyContract, 'callFunctionAsUserOp');
      
      // Call getVaults method
      const getVaultsRes = await custodyContract.getVaults();

      // Assert callFunctionAsUserOp was not called
      assert.strictEqual(callFunctionAsUserOpStub.called, false);

      // Assert response status is success
      assert(getVaultsRes.status === 0);

      // Assert response result is returned
      assert(getVaultsRes.response, 'Expected response to be returned');

      // Clean up the stub
      callFunctionAsUserOpStub.restore();
    });
  });
});
