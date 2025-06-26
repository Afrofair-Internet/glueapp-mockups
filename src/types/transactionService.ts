import type { TransactionMonthStatus } from './transactionMonthStatus'

export interface TransactionService {
  id: string
  label: string
  monthData: Record<string, TransactionMonthStatus>
}