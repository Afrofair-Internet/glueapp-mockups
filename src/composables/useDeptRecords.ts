import { ref } from 'vue'
import type { DeptRecord } from '@/types/dept'

const deptRecords = ref<DeptRecord[]>([
  {
    departmentCode: '1000',
    departmentName: '営業部',
    departmentKana: 'エイギョウブ',
    parentDepartment: '',
    departmentType: 'department',
    installedAt: '2023-04-01',
    abolishedAt: '',
    location: '東京本社',
    manager: '佐藤一郎',
    zip: '1000001',
    address: '東京都千代田区丸の内1-1-1',
    remarks: '法人営業を担当',
    operationStatus: '運営中',
    approvalStatus: '承認済み'
  },
  {
    departmentCode: '1010',
    departmentName: '営業第一課',
    departmentKana: 'エイギョウダイイッカ',
    parentDepartment: '1000',
    departmentType: 'section',
    installedAt: '2023-04-01',
    abolishedAt: '',
    location: '東京本社',
    manager: '田中美咲',
    zip: '1000001',
    address: '東京都千代田区丸の内1-1-1',
    remarks: '',
    operationStatus: '運営中',
    approvalStatus: '承認済み'
  },
  {
    departmentCode: '2000',
    departmentName: '開発部',
    departmentKana: 'カイハツブ',
    parentDepartment: '',
    departmentType: 'department',
    installedAt: '2022-01-10',
    abolishedAt: '',
    location: '大阪開発センター',
    manager: '山本健太',
    zip: '5300001',
    address: '大阪府大阪市北区梅田1-1-1',
    remarks: '製品開発全般を統括',
    operationStatus: '運営中',
    approvalStatus: '承認済み'
  },
  {
    departmentCode: '2010',
    departmentName: '開発グループ',
    departmentKana: 'カイハツグループ',
    parentDepartment: '2000',
    departmentType: 'group',
    installedAt: '2022-04-01',
    abolishedAt: '',
    location: '大阪開発センター',
    manager: '鈴木彩',
    zip: '5300001',
    address: '大阪府大阪市北区梅田1-1-1',
    remarks: '',
    operationStatus: '運営中',
    approvalStatus: '承認済み'
  },
  {
    departmentCode: '3000',
    departmentName: '管理部',
    departmentKana: 'カンリブ',
    parentDepartment: '',
    departmentType: 'department',
    installedAt: '2021-07-01',
    abolishedAt: '',
    location: '東京本社',
    manager: '内田宏',
    zip: '1000001',
    address: '東京都千代田区丸の内1-1-1',
    remarks: '人事・総務・経理を統括',
    operationStatus: '運営中',
    approvalStatus: '承認済み'
  },
  {
    departmentCode: '4000',
    departmentName: '経営本部',
    departmentKana: 'ケイエイホンブ',
    parentDepartment: '',
    departmentType: 'headquarters',
    installedAt: '2020-01-01',
    abolishedAt: '',
    location: '東京本社',
    manager: '代表取締役社長',
    zip: '1000001',
    address: '東京都千代田区丸の内1-1-1',
    remarks: '',
    operationStatus: '運営中',
    approvalStatus: '申請中'
  },
  {
    departmentCode: '5000',
    departmentName: 'プロジェクト推進チーム',
    departmentKana: 'プロジェクトスイシンチーム',
    parentDepartment: '4000',
    departmentType: 'project',
    installedAt: '2024-06-01',
    abolishedAt: '',
    location: '東京本社',
    manager: '岸本亮',
    zip: '1000001',
    address: '東京都千代田区丸の内1-1-1',
    remarks: 'DX推進プロジェクト',
    operationStatus: '運営中',
    approvalStatus: '申請中'
  }
])

export function useDeptRecords() {
  return { deptRecords }
}