var user = require('../index');
var system = require('../wallet/register');

let client = '0x9f1641a4A0DdA03A406b60539Dd77Fa248d50380';
let manager = '0xca051e5f2860F46043Ae82Ed57587a61C11E8F4e';
let custodian = '0xfD6eF19639bDfbdf83ceB6bA1B00429a20DBc804';

console.log("User's wallet address is " + user.wallet.address);

system.setManager(client, manager);

console.log("Set manager as " + system.getManager(client));

system.setKycStatus(client, 'true');

console.log("Set status as "+system.getKycStatus(client));

system.setAccess('true');

console.log("Set access as "+system.getAccess(client));

system.setCustodian(client, custodian);

console.log("Set custodian as "+system.getCustodian);

system.updateKycRecord(client, 'file', 'address', 'photo', 'video', 'fatca', 'crs');
