import { ref } from 'vue'
import type { Expense } from '@/types/expense'

export function useExpense() {
  const expenses = ref<Expense[]>([])

  const fetchExpenses = async () => {
    expenses.value = [
      {
        employeeId: '0001',
        name: 'ユーザー01',
        itemCount: 3,
        totalAmount: 15200,
        submittedAt: '2025-06-25',
        approver: '',
        status: '申請中'
      },
      {
        employeeId: '0002',
        name: 'ユーザー02',
        itemCount: 5,
        totalAmount: 23800,
        submittedAt: '2025-06-22',
        approver: '上長B',
        status: '承認済み'
      },
      {
        employeeId: '0003',
        name: 'ユーザー03',
        itemCount: 2,
        totalAmount: 8900,
        submittedAt: '2025-06-20',
        approver: '上長A',
        status: '差戻し'
      },
      {
        employeeId: '0004',
        name: 'ユーザー04',
        itemCount: 4,
        totalAmount: 17300,
        submittedAt: '2025-06-23',
        approver: '',
        status: '申請中'
      },
      {
        employeeId: '0005',
        name: 'ユーザー05',
        itemCount: 6,
        totalAmount: 30100,
        submittedAt: '2025-06-19',
        approver: '上長B',
        status: '差戻し'
      },
      {
        employeeId: '0006',
        name: 'ユーザー06',
        itemCount: 3,
        totalAmount: 14200,
        submittedAt: '2025-06-18',
        approver: '上長A',
        status: '承認済み'
      },
      {
        employeeId: '0007',
        name: 'ユーザー07',
        itemCount: 2,
        totalAmount: 7600,
        submittedAt: '2025-06-26',
        approver: '',
        status: '申請中'
      },
      {
        employeeId: '0008',
        name: 'ユーザー08',
        itemCount: 5,
        totalAmount: 22100,
        submittedAt: '2025-06-21',
        approver: '上長B',
        status: '差戻し'
      },
      {
        employeeId: '0009',
        name: 'ユーザー09',
        itemCount: 4,
        totalAmount: 18900,
        submittedAt: '2025-06-24',
        approver: '上長A',
        status: '承認済み'
      },
      {
        employeeId: '0010',
        name: 'ユーザー10',
        itemCount: 1,
        totalAmount: 4300,
        submittedAt: '2025-06-27',
        approver: '',
        status: '申請中'
      }
    ]
  }

  return {
    expenses,
    fetchExpenses
  }
}
