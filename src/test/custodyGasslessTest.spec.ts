import assert from 'assert';
import { Provider } from "../utils/index";
import { VerifiedWallet } from "../wallet/index";
import {Custody} from "../index";
import { ethers } from 'ethers';

describe("Base Sepolia() Custody Gassless Tests", () => {   
  const CREATOR_PRIVATE_KEY =
    "0xf73343e93261bbe8189f798007ae731151f2d596f8b018f69ec9ebb1adc6197b";
  const provider = new ethers.providers.JsonRpcProvider("https://sepolia.base.org");
  const sender = new VerifiedWallet(CREATOR_PRIVATE_KEY, provider)
  const signer = sender.setProvider(provider);
  describe("Tests some functions on custody contract", () => {
    const custodyAddress = "0xB1ae3Fc5B16d3736bf0db20606fB9a10b435392c";
    const custodyContract = new Custody(
      signer,
      custodyAddress
    );
    it("it should create vault", async () => {
      const createVaultRes = await custodyContract.createVault("Tessst", "vltt");
      console.log("result: ", createVaultRes)
      assert(createVaultRes.status === 0);
    })

  });
});
