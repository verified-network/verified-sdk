import { Provider } from "../utils/index";
import { VerifiedWallet } from "../wallet/index";
import { Security } from "../index";

const testSecurityTransfer = async (
  securityAddress: string,
  amount: string,
  receiverAddress: string
) => {
  const INFURA_API_KEY = "95c1322d7c0e44de9ea77cc9eea18534";
  const SECURITY_HOLDER_MNEMONICS =
    "correct galaxy various swap chair assault blue improve ivory pear infant oak";
  const sender = VerifiedWallet.importWallet(SECURITY_HOLDER_MNEMONICS);
  const signer = sender.setProvider(
    Provider.infuraProvider(80001, INFURA_API_KEY)
  );

  const securityContract = new Security(signer, securityAddress);
  await securityContract
    .transfer(receiverAddress, amount)
    .then((res: any) => {
      console.log("Transfer succesful with hash: ", res.response.hash);
    })
    .catch((err: any) => {
      console.log("Transfer failed with error: ", err);
    });
};

// testSecurityTransfer(
//   "0xd7252bfa14C0Dca5A72d90a28Bb513E0f989Ee1e",
//   1000000000000000000n,
//   "0x286a759DACfd0C533B88E42b9e7571040008D778"
// );
