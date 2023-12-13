import assert from 'assert';
import { Provider } from "../utils/index";
import { VerifiedWallet } from "../wallet/index";
import { BalancerVault, Security } from "../index";

describe("Vault Tests on GOERLI", () => {
  const INFURA_API_KEY = "e0951a7b82c84a6880f3c6f7bb182e21";        
  const SECURITY_HOLDER_MNEMONICS =
    "correct galaxy various swap chair assault blue improve ivory pear infant oak";
  const sender = VerifiedWallet.importWallet(SECURITY_HOLDER_MNEMONICS);
  const signer = sender.setProvider(Provider.infuraProvider(5, INFURA_API_KEY));
  const vaultAddress = "0xba12222222228d8ba445958a75a0704d566bf2c8";
    const vaultContract = new BalancerVault(
      signer
    );
  const securityContract = new Security(signer, "0x89b60e2b51D5b604F54786D16b75F4E54594Cde8");
  let isApprove = false;
  beforeEach(async() => {
    await securityContract.approve(vaultAddress, "1000000000000000000").then(async (res: any) => {
      if(res.response.hash) {
        console.log("vault approve succesfully with hash: ", res.response.hash)
        isApprove = true;
      }
    }).catch((err: any) => {
      console.error("approve failed with error: ", err);
    })
  })
  describe("Swap Test", () => {
    const singleSwap = {
        poolId: "0x10fb5f3ce20f53cebc9d6e352c62fe7f86fc16f6000000000000000000000938",
        kind: "0",
        assetIn: "0x89b60e2b51D5b604F54786D16b75F4E54594Cde8",
        assetOut: "0x10fb5f3ce20f53cebc9d6e352c62fe7f86fc16f6",
        amount: "1000000000000000000",
        userData: "0x",
    }
    const fund = {
        sender: signer.address,
        fromInternalBalance: false,
        recipient: signer.address,
        toInternalBalance: false,
    }
    const limit = "0";
    const deadLine = "999999999999999999";

    it("it should create market order that swap security(BTC) => USDC", async () => {
      if(isApprove) {
        await vaultContract.swap(singleSwap, fund, limit, deadLine).then((_res: any) => {
          assert.notEqual(_res, null)
          assert.notEqual(_res.response.hash.length, 0)
          console.log("swap transaction succesfully with hash: ", _res.response.hash)
        }).catch((err: any) => {
          console.error("swap failed with error: ", err);
          assert.equal(1, 0) //should fail test
        })
      }else{
        assert.equal(1, 0) //should fail test
      }
    });

  });

  describe("Batch swap Test", () => {
    const assets = ["0x89b60e2b51D5b604F54786D16b75F4E54594Cde8", "0x07865c6E87B9F70255377e024ace6630C1Eaa37F", "0x10fb5f3ce20f53cebc9d6e352c62fe7f86fc16f6"]
    const swap = [
        {
            poolId: "0x10fb5f3ce20f53cebc9d6e352c62fe7f86fc16f6000000000000000000000938",
            assetInIndex: "0",
            assetOutIndex: "2",
            amount: "1000000000000000000",
            userData: "0x",
        }
    ]
    const fund = {
        sender: signer.address,
        fromInternalBalance: false,
        recipient: signer.address,
        toInternalBalance: false,
    }
    const limits = ["1000000000000000000", "0", "0"];
    const deadLine = "999999999999999999";

    it("it should create market order that batchswap security(BTC) => USDC", async () => {
      if(isApprove) {
        await vaultContract.batchSwap("0", swap, assets, fund, limits, deadLine).then((res: any) => {
          assert.notEqual(res, null)
          assert.notEqual(res.response.hash.length, 0)
          console.log("batchwap transaction succesfully with hash: ", res.response.hash)
        }).catch((err: any) => {
          console.error("Batchswap failed with error: ", err);
          assert.equal(1, 0) //should fail test
        })
      }else{
        assert.equal(1, 0) //should fail test
      }
    });

  });
});
