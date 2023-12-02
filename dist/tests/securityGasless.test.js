const { Provider } = require("../utils/index");
const { VerifiedWallet } = require("../wallet/index");
const { Security } = require("../index");
const { MarginIssueManager } = require("../index");

const testSecurityTransfer = async (
  securityAddress,
  amount,
  receiverAddress
) => {
  GEORLI_INFURA_API_KEY = "95c1322d7c0e44de9ea77cc9eea18534";
  SECURITY_HOLDER_MNEMONICS =
    "correct galaxy various swap chair assault blue improve ivory pear infant oak";
  const sender = VerifiedWallet.importWallet(SECURITY_HOLDER_MNEMONICS);
  const signer = sender.setProvider(
    Provider.infuraProvider("goerli", GEORLI_INFURA_API_KEY)
  );

  const securityContract = new Security(signer, securityAddress);
  await securityContract
    .transfer(receiverAddress, amount)
    .then((res) => {
      console.log("Transfer succesful with hash: ", res.response.hash);
    })
    .catch((err) => {
      console.log("Transfer failed with error: ", err);
    });
};

testSecurityTransfer(
  "0x89b60e2b51D5b604F54786D16b75F4E54594Cde8",
  1000000000000000000n,
  "0x286a759DACfd0C533B88E42b9e7571040008D778"
);
