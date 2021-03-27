var user = require('../index');
var system = require('../wallet/register');

//let client = '0x5469DD6891EE2aF053657e587A4Fd6A2E1a8608F'; // put public address of client 
//let manager = '0x19836182a3786CD592523cAB7445325be26c3334'; //put public address of manager
let client = '0xea9c03DA067A6e089A339438F64a3003AB613539'; // put account[1] of ganache
let manager = '0xf5451893caC30E4B8774d39f42081A1269B88ef3'; // put account[0] of ganache
let custodian = '0x0D6dA05B44De7694d2e8fAFF39634dCd8Dbe2112'; //put any address that is valid

console.log("User's wallet address is " + user.wallet.address);

system.setManager(client, manager); //manager should not be client itself + manager should be deployer of contracts on the network

console.log("Set manager as " + system.getManager(client));
/*
system.setKycStatus(client, 'true'); //only manager can set KYC status

console.log("Set status as "+system.getKycStatus(client));

system.setAccess('true');

console.log("Set access as "+system.getAccess(client));

system.setCustodian(client, custodian);

console.log("Set custodian as "+system.getCustodian);

system.updateKycRecord(client, 'file', 'address', 'photo', 'video', 'fatca', 'crs');
*/