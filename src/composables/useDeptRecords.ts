import { ref } from 'vue'
import type { DeptRecord } from '@/types/dept'

const deptRecords = ref<DeptRecord[]>([
  {
    departmentCode: '1000',
    departmentName: '保育',
    departmentKana: 'ホイク',
    location: '広島本社',
    manager: '山本花子',
    zip: '7300000',
    address: '',
    remarks: '',
    operationStatus: '運営中',
    approvalStatus: '申請中'
  },
  {
    departmentCode: '2000',
    departmentName: '認可事業',
    departmentKana: 'ニンカジギョウ',
    location: '広島本社',
    manager: '田中一郎',
    zip: '7300000',
    address: '',
    remarks: '',
    operationStatus: '運営中',
    approvalStatus: '承認済み'
  }
])

export function useDeptRecords() {
  return { deptRecords }
}