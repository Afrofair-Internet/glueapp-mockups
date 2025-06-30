import { ref } from 'vue'
import type { ExpenseItem } from '@/types/expense'

const mockExpenseItems: ExpenseItem[] = [
  {
    date: '2025/06/03(火)',
    category: '宿泊費',
    amount: 12000,
    paymentMethod: '立替',
    taxType: '課税',
    remarks: '東京出張'
  },
  {
    date: '2025/06/12(木)',
    category: '交通費',
    amount: 10000,
    paymentMethod: '仮払',
    taxType: '非課税',
    remarks: '東京出張'
  },
  {
    date: '2025/06/17(火)',
    category: '交通費',
    amount: 16000,
    paymentMethod: '立替',
    taxType: '課税',
    remarks: '東京出張'
  }
]

export function useExpenseItem() {
  const expenseItems = ref<ExpenseItem[]>([])

  const fetchExpenseItems = (employeeId: string, month: string) => {
    // 現状はモックをそのまま
    expenseItems.value = mockExpenseItems
  }

  return {
    expenseItems,
    fetchExpenseItems
  }
}