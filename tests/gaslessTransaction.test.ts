import {VerifiedWallet, Provider} from '../src'
import {UseropContract} from '../src'

require('dotenv').config();

describe("userop gasless transaction", () => {

    test('gasless transaction should succeed', async() => { 
        const mnemonics = await VerifiedWallet.generateMnemonic()
        const wallet = VerifiedWallet.importWallet(mnemonics)
        const signer = wallet.setProvider(
          Provider.stackUpProvider(process.env.BUNDLE_URL)
      )
        const contract = new UseropContract(wallet.address,signer)
        const response =  await contract.makeTransaction({ value:'0'})
        console.log(response)
        expect(response.result?.blockHash).toBeDefined()
        expect(response.result?.transactionHash).toBeDefined()
          
     },1000000)
})