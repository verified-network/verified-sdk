import {GasLessTransaction} from '../src'
// Only for testing
const signingKey ='a6645c57b516720cc218e98a645887d59fa53b3e1e08fed0c58de17b3589b799'
const rpcUrl = "https://api.stackup.sh/v1/node/a6645c57b516720cc218e98a645887d59fa53b3e1e08fed0c58de17b3589b799"
const paymasterUrl = 'https://api.stackup.sh/v1/paymaster/a6645c57b516720cc218e98a645887d59fa53b3e1e08fed0c58de17b3589b799'
const token = "0x3870419Ba2BBf0127060bCB37f69A1b1C090992B";

describe("userop gasless transaction", () => {

    test('gasless transaction should succeed', async() => { 
        const transaction = new GasLessTransaction({
                            apiKey:signingKey,
                            bundlerUrl:rpcUrl,
                            paymasterUrl,
                            tokenAddress:token,
                        });
        const response =  await transaction.makeTransaction({
                            to:'0xb695f8baf4CC0a6a9A676CE917F795Ffa1947a7c',
                            amount:'0'
                            })
        console.log(response)
        const {signedUserOperation,transactionHash,userOperationHash} = response;
        expect(userOperationHash).toBeDefined()
        expect(signedUserOperation?.signature).toBeDefined();
        expect(transactionHash).toBeDefined()
     },100000)
})