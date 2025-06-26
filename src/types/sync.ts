// マスタ用
export type MasterSyncStatus = 'success' | 'error' | 'none'

// トランザクション用
export type TransactionSyncStatus = 'none' | 'fetched' | 'confirmed' | 'approved' | 'synced'