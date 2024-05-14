interface SetStatus {
    _clientAddress: string;
    _status: boolean;
}
interface GetStatus {
    _clientAddress: string;
}
interface KycUpdate {
    _clientAddress: string;
    _status: boolean;
}
interface SetFile {
    _clientAddress: string;
    _file: string;
}
interface SetFATCA {
    _clientAddress: string;
    _file: string;
}
interface SetCRS {
    _clientAddress: string;
    _file: string;
}
interface SetPhotoID {
    _clientAddress: string;
    _file: string;
}
interface SetVideoID {
    _clientAddress: string;
    _file: string;
}
interface SetAddress {
    _clientAddress: string;
    _file: string;
}
export { GetStatus, SetStatus, KycUpdate, SetFile, SetFATCA, SetCRS, SetPhotoID, SetVideoID, SetAddress };
