
export interface MasterService {
  id: string
  label: string
  lastSynced: string | null
  reconcileDiffCount?: number
  errorMessage?: string
  requestCount: number
  rejectedCount: number
  approvedCount: number
  syncErrorcount: number
  reconcileErrorCount: number
}