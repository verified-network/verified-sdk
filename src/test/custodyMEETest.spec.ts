import assert from "assert";
import { Provider } from "../utils/index";
import { VerifiedWallet } from "../wallet/index";
import { Custody, ERC20 } from "../index";

describe("Base Sepolia() Custody MEE ERC20 Gas Payment Tests", () => {
  const newWallet = new VerifiedWallet(
    "0x083702d10b28bc7ca462ebf0f22f40684f3d86f255f64ac51d35ea70d517d253"
  );
  const provider = new Provider("https://sepolia.base.org");
  const signer = newWallet.setProvider(provider);

  describe("Tests some functions on custody contract", () => {
    const custodyAddress = "0xd942BF5772Ccd05B0a0a2a29D060bFA82FF4a031";
    const custodyContract = new Custody(signer, custodyAddress);
    it("it should create vault", async () => {
      const createVaultRes = await custodyContract.createVault(
        Date.now().toString(),
        Date.now().toString(),
        {
          paymentToken: "0x036CbD53842c5426634e7929541eC2318f3dCF7e", // USDC
        }
      );
      console.log("result: ", createVaultRes);
      assert(createVaultRes.status === 0);
    });
  });
});
