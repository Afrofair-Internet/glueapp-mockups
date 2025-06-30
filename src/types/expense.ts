export type Expense = {
  employeeId: string
  name: string
  itemCount: number
  totalAmount: number | string
  submittedAt: string // yyyy-MM-dd
  approver: string
  status: string
}
