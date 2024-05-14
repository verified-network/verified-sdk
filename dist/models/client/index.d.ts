interface Initialize {
    _address: string;
}
interface SetCustody {
    _clientAddress: string;
    _accountAddress: string;
}
interface GetCustody {
    _clientAddress: string;
}
interface SetAccess {
    _login: boolean;
}
interface GetAccess {
    _clientAddress: string;
}
interface SetManager {
    _clientAddress: string;
    _managerAddress: string;
}
interface GetManager {
    _clientAddress: string;
}
interface IsRegistered {
    _clientAddress: string;
}
interface SetAMLStatus {
    _clientAddress: string;
    _status: boolean;
}
interface GetAMLStatus {
    _clientAddress: string;
}
interface GetClients {
    _managerAddress: string;
    _status: boolean;
}
interface GetManagers {
    _role: string;
    _country: string;
}
export { Initialize, SetCustody, GetCustody, SetAccess, GetAccess, SetManager, GetManager, IsRegistered, SetAMLStatus, GetAMLStatus, GetClients, GetManagers };
