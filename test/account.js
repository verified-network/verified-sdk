var user = require('../index');
var system = require('../wallet/register');

//let client = '0x5469DD6891EE2aF053657e587A4Fd6A2E1a8608F'; // put public address of client 
//let manager = '0x19836182a3786CD592523cAB7445325be26c3334'; //put public address of manager
let client = '0x424185A8c72461Decf16B9C4bC870FDB3313CE58'; // put account[1] of ganache
let manager = '0xC60869fDB1c02ea0a98E7dbBF3357418845B4972'; // put account[0] of ganache
let custodian = '0x1718427c4A973CA99F49bd9310AA88aFEC1f5fbe'; //put any address that is valid

console.log("User's wallet address is " + user.wallet.address);

//all test cases below need nonce to be incremented

system.setManager(client, "manager"); 

//console.log("Set manager as " + system.getManager(client));

//system.setKycStatus(client, 'true'); 

//console.log("Set status as "+system.getKycStatus(client));

//system.setAccess('true');

//console.log("Set access as "+system.getAccess(client));

//system.setCustodian(client, custodian);

//console.log("Set custodian as "+system.getCustodian(client));

//system.updateKycRecord(client, 'file', 'address', 'photo', 'video', 'fatca', 'crs');
