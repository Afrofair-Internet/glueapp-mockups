import type { TransactionSyncStatus } from './sync'

export interface TransactionMonthStatus {
  syncStatus: TransactionSyncStatus
  lastSynced: string | null
  errorMessage?: string
}
