export type Expense = {
  employeeId: string
  name: string
  itemCount: number
  totalAmount: number | string
  submittedAt: string // yyyy-MM-dd
  approver: string
  status: string
}

// 明細1行分の型
export type ExpenseItem = {
  date: string
  category: string
  amount: number
  paymentMethod: string
  taxType: string
  remarks: string
}