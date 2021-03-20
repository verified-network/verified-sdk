interface GetAccountHolder {
    _accountCreatorAddress: string
}

interface GetAccountLedger {
    _accountHolderAddress: string
}


interface GetLedgerAccount {
    _accountLedgerAddress: string
}

export { GetAccountHolder, GetAccountLedger, GetLedgerAccount }