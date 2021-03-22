interface GetAccountStatement {
    //uint256 statementIndex
    _statementIndex: number
}


interface CreateLedger {
    //uint256 statementIndex
    _ledgerName: string
    _ledgerGroup: string
}


export { GetAccountStatement, CreateLedger }