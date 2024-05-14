interface CreateHolder {
    _holderName: string;
    _accountHolder: string;
}
interface GetAccountHolder {
    _accountCreatorAddress: string;
}
interface GetAccountLedger {
    _accountHolderAddress: string;
}
interface GetLedgerAccount {
    _accountLedgerAddress: string;
}
export { CreateHolder, GetAccountHolder, GetAccountLedger, GetLedgerAccount };
