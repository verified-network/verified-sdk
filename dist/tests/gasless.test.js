require("dotenv").config();
const { Provider } = require("../utils/index");
const { VerifiedWallet } = require("../wallet/index");
const { Security } = require("../index");
const { MarginIssueManager } = require("../index");

const testGaslessTransactionOnSecurityTransfer = async (
  securityAddress,
  amount,
  receiverAddress
) => {
  const sender = VerifiedWallet.importWallet(
    process.env.SECURITY_HOLDER_MNEMONICS
  );
  const signer = sender.setProvider(
    Provider.infuraProvider("goerli", process.env.GEORLI_INFURA_API_KEY)
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

testGaslessTransactionOnSecurityTransfer(
  "0x89b60e2b51D5b604F54786D16b75F4E54594Cde8",
  5000000000000000000n,
  "0x7Ef2be68E4F122Ba53EaB873E29F3326999110Eb"
);
