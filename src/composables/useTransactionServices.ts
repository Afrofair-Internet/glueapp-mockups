import { ref } from 'vue'
import type { TransactionService } from '@/types/transactionService'

const transactionServices = ref<TransactionService[]>([
  {
    id: 'jinjer_attendance',
    label: 'jinjer：勤怠データ',
    monthData: {
      '2025-06': {
        syncStatus: 'fetched',
        lastSynced: '2025-06-22 06:00',
        errorMessage: ''
      },
      '2025-05': {
        syncStatus: 'confirmed',
        lastSynced: '2025-05-25 09:30',
        errorMessage: ''
      },
      '2025-04': {
        syncStatus: 'synced',
        lastSynced: '2025-04-20 12:15',
        errorMessage: ''
      }
    }
  },
  {
    id: 'jobcan_expense',
    label: 'ジョブカン：経費データ',
    monthData: {
      '2025-06': {
        syncStatus: 'none',
        lastSynced: '2025-06-22 06:00',
        errorMessage: '通信エラー'
      },
      '2025-05': {
        syncStatus: 'confirmed',
        lastSynced: '2025-05-28 10:20',
        errorMessage: ''
      },
      '2025-04': {
        syncStatus: 'synced',
        lastSynced: '2025-04-18 14:10',
        errorMessage: ''
      }
    }
  }
])

export function useTransactionServices() {
  return { transactionServices }
}
