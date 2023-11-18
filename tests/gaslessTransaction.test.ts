import { ethers } from "ethers";
import web3 from 'web3'
import {VerifiedWallet, Provider,SecuritiesFactory} from '../src'

require('dotenv').config();
// 34f77e7fce3a4563ac1b268979ea04d2
describe("Perform SecuritiesFactory with userop gasless transaction", () => {

    test('issueSecurity contract should succeed with gasless transaction', async() => { 
        const mnemonics = await VerifiedWallet.generateMnemonic()
        const wallet = VerifiedWallet.importWallet(mnemonics)
        const signer = wallet.setProvider(
          Provider.stackUpProvider(process.env.BUNDLE_URL)
      )

      const secFactoryContract = new SecuritiesFactory(signer,wallet.address)
      const zeroAddress = "0x0000000000000000000000000000000000000000";
      const currency = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F"; //usdc
      const defaultBytes = "0x53544f434b000000000000000000000000000000000000000000000000000000"; //STOCK as bytes
      const indiaBytes = "0x496e646961000000000000000000000000000000000000000000000000000000"; //India as bytes
      const abiCoder = ethers.utils.defaultAbiCoder;
      // @ts-ignore
      const restrictions = [];
      // @ts-ignore
      const encodedArray = abiCoder.encode(["bytes32[]"], [restrictions]);
      const response =  await secFactoryContract
        .issueSecurity(
        zeroAddress,
        defaultBytes,
        web3.utils.asciiToHex("VERIFIED"),
        web3.utils.asciiToHex("tata"),
        currency,
        wallet.address,
        wallet.address,
        encodedArray,
        indiaBytes,
        //@ts-ignore
        false,
        { gasPrice: 0,gasLimit:0}
        )

        console.log(response);
        //@ts-ignore
        expect(response?.blockHash).toBeDefined()
        // // @ts-ignore
        expect(response?.transactionHash).toBeDefined()
          
     },1000000)

     test('setSigner contract should succeed with gasless transaction', async () => { 
          const mnemonics = await VerifiedWallet.generateMnemonic()
          const wallet = VerifiedWallet.importWallet(mnemonics)
          const signer = wallet.setProvider(
            Provider.stackUpProvider(process.env.BUNDLE_URL)
          )
          const secFactoryContract = new SecuritiesFactory(signer,wallet.address)
          const response = await secFactoryContract.setSigner(wallet.address,{gasPrice:0,gasLimit:0});
            //@ts-ignore
          expect(response?.blockHash).toBeDefined()
           // @ts-ignore
          expect(response?.transactionHash).toBeDefined()
      },1000000)
})