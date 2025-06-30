import { ref } from 'vue'
import type { MasterService } from '@/types/masterService'


const masterServices = ref<MasterService[]>([
  {
    id: 'jinjer_hr',
    label: 'jinjer',
    lastSynced: '2025-06-26 10:00',
    requestCount: 2,
    rejectedCount: 1,
    approvedCount: 3,
    reconcileDiffCount: 1,
    reconcileErrorCount: 0,
    syncErrorcount: 1,
    errorMessage: ''
  },
  {
    id: 'jobcan_hr',
    label: 'ジョブカン',
    lastSynced: '2025-06-25 18:30',
    requestCount: 0,
    rejectedCount: 0,
    approvedCount: 0,
    reconcileDiffCount: 0,
    reconcileErrorCount: 2,
    syncErrorcount: 1,
    errorMessage: 'API認証エラー'
  },
  {
    id: 'officestation_hr',
    label: 'オフィスステーション',
    lastSynced: '2025-06-25 15:45',
    requestCount: 0,
    rejectedCount: 0,
    approvedCount: 0,
    reconcileDiffCount: 0,
    reconcileErrorCount: 0,
    syncErrorcount: 1,
    errorMessage: ''
  }
])

export function useMasterServices() {
  return { masterServices }
}
