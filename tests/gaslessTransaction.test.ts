import {VerifiedWallet, Provider} from '../src'
import VerifiedContract from '../src/contract/userop'
// Only for testing
const apiKey ='a6645c57b516720cc218e98a645887d59fa53b3e1e08fed0c58de17b3589b799'
const rpcUrl = "https://api.stackup.sh/v1/node/a6645c57b516720cc218e98a645887d59fa53b3e1e08fed0c58de17b3589b799"
const paymasterUrl = 'https://api.stackup.sh/v1/paymaster/a6645c57b516720cc218e98a645887d59fa53b3e1e08fed0c58de17b3589b799'

describe("userop gasless transaction", () => {

    test('gasless transaction should succeed', async() => { 
        const mnemonics = await VerifiedWallet.generateMnemonic()
        const wallet = VerifiedWallet.importWallet(mnemonics)
        const signer = wallet.setProvider(
          Provider.stackUpProvider(rpcUrl)
      )
        const response =  await VerifiedContract.callContract({ value:'0',apiKey,paymasterUrl,wallet,signer})
        console.log(response)
        expect(response.result?.blockHash).toBeDefined()
        expect(response.result?.transactionHash).toBeDefined()
          
     },1000000)
})