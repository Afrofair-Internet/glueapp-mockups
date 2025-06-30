import { ref } from 'vue'
import type { DailyRecord } from '@/types/dailyAttendance'

export function useDailyAttendance() {
  // dailyRecords を ref で初期化
  const dailyRecords = ref<DailyRecord[]>([])

  const fetchDailyRecords = async (employeeId: string, month: string) => {
    console.log(`fetchDailyRecords: ${employeeId}, ${month}`)
    // 仮データを代入（後でAPI呼び出しに置換予定）
    dailyRecords.value = [
  { date: '2025-06-01', dayOfWeek: '日', clockIn: '', clockOut: '', workingHours: '0:00', overtime: '0:00', lateNight: '0:00', late: '0:00', earlyLeave: '0:00', status: '休日' },
  { date: '2025-06-02', dayOfWeek: '月', clockIn: '09:00', clockOut: '18:00', workingHours: '8:00', overtime: '0:00', lateNight: '0:00', late: '0:00', earlyLeave: '0:00', status: '出勤' },
  { date: '2025-06-03', dayOfWeek: '火', clockIn: '09:10', clockOut: '19:00', workingHours: '8:50', overtime: '1:00', lateNight: '0:00', late: '0:10', earlyLeave: '0:00', status: '出勤' },
  { date: '2025-06-04', dayOfWeek: '水', clockIn: '09:00', clockOut: '18:30', workingHours: '8:30', overtime: '0:30', lateNight: '0:00', late: '0:00', earlyLeave: '0:00', status: '出勤' },
  { date: '2025-06-05', dayOfWeek: '木', clockIn: '', clockOut: '', workingHours: '0:00', overtime: '0:00', lateNight: '0:00', late: '0:00', earlyLeave: '0:00', status: '有休' },
  { date: '2025-06-06', dayOfWeek: '金', clockIn: '09:00', clockOut: '21:00', workingHours: '10:00', overtime: '2:00', lateNight: '1:00', late: '0:00', earlyLeave: '0:00', status: '出勤' },
  { date: '2025-06-07', dayOfWeek: '土', clockIn: '', clockOut: '', workingHours: '0:00', overtime: '0:00', lateNight: '0:00', late: '0:00', earlyLeave: '0:00', status: '休日' },
  { date: '2025-06-08', dayOfWeek: '日', clockIn: '', clockOut: '', workingHours: '0:00', overtime: '0:00', lateNight: '0:00', late: '0:00', earlyLeave: '0:00', status: '休日' },
  { date: '2025-06-09', dayOfWeek: '月', clockIn: '09:00', clockOut: '18:00', workingHours: '8:00', overtime: '0:00', lateNight: '0:00', late: '0:00', earlyLeave: '0:00', status: '出勤' },
  { date: '2025-06-10', dayOfWeek: '火', clockIn: '09:00', clockOut: '19:30', workingHours: '9:30', overtime: '1:30', lateNight: '0:00', late: '0:00', earlyLeave: '0:00', status: '出勤' },
  { date: '2025-06-11', dayOfWeek: '水', clockIn: '09:00', clockOut: '18:00', workingHours: '8:00', overtime: '0:00', lateNight: '0:00', late: '0:00', earlyLeave: '0:00', status: '出勤' },
  { date: '2025-06-12', dayOfWeek: '木', clockIn: '', clockOut: '', workingHours: '0:00', overtime: '0:00', lateNight: '0:00', late: '0:00', earlyLeave: '0:00', status: '欠勤' },
  { date: '2025-06-13', dayOfWeek: '金', clockIn: '09:00', clockOut: '18:00', workingHours: '8:00', overtime: '0:00', lateNight: '0:00', late: '0:00', earlyLeave: '0:00', status: '出勤' },
  { date: '2025-06-14', dayOfWeek: '土', clockIn: '', clockOut: '', workingHours: '0:00', overtime: '0:00', lateNight: '0:00', late: '0:00', earlyLeave: '0:00', status: '休日' },
  { date: '2025-06-15', dayOfWeek: '日', clockIn: '', clockOut: '', workingHours: '0:00', overtime: '0:00', lateNight: '0:00', late: '0:00', earlyLeave: '0:00', status: '休日' },
  { date: '2025-06-16', dayOfWeek: '月', clockIn: '09:00', clockOut: '18:00', workingHours: '8:00', overtime: '0:00', lateNight: '0:00', late: '0:00', earlyLeave: '0:00', status: '出勤' },
  { date: '2025-06-17', dayOfWeek: '火', clockIn: '09:00', clockOut: '20:00', workingHours: '9:00', overtime: '1:00', lateNight: '1:00', late: '0:00', earlyLeave: '0:00', status: '出勤' },
  { date: '2025-06-18', dayOfWeek: '水', clockIn: '09:00', clockOut: '18:00', workingHours: '8:00', overtime: '0:00', lateNight: '0:00', late: '0:00', earlyLeave: '0:00', status: '出勤' },
  { date: '2025-06-19', dayOfWeek: '木', clockIn: '09:00', clockOut: '19:00', workingHours: '9:00', overtime: '1:00', lateNight: '0:00', late: '0:00', earlyLeave: '0:00', status: '出勤' },
  { date: '2025-06-20', dayOfWeek: '金', clockIn: '09:00', clockOut: '18:30', workingHours: '8:30', overtime: '0:30', lateNight: '0:00', late: '0:00', earlyLeave: '0:00', status: '出勤' },
  { date: '2025-06-21', dayOfWeek: '土', clockIn: '', clockOut: '', workingHours: '0:00', overtime: '0:00', lateNight: '0:00', late: '0:00', earlyLeave: '0:00', status: '休日' },
  { date: '2025-06-22', dayOfWeek: '日', clockIn: '', clockOut: '', workingHours: '0:00', overtime: '0:00', lateNight: '0:00', late: '0:00', earlyLeave: '0:00', status: '休日' },
  { date: '2025-06-23', dayOfWeek: '月', clockIn: '09:00', clockOut: '18:00', workingHours: '8:00', overtime: '0:00', lateNight: '0:00', late: '0:00', earlyLeave: '0:00', status: '出勤' },
  { date: '2025-06-24', dayOfWeek: '火', clockIn: '09:00', clockOut: '18:00', workingHours: '8:00', overtime: '0:00', lateNight: '0:00', late: '0:00', earlyLeave: '0:00', status: '出勤' },
  { date: '2025-06-25', dayOfWeek: '水', clockIn: '09:00', clockOut: '18:00', workingHours: '8:00', overtime: '0:00', lateNight: '0:00', late: '0:00', earlyLeave: '0:00', status: '出勤' },
  { date: '2025-06-26', dayOfWeek: '木', clockIn: '09:00', clockOut: '18:00', workingHours: '8:00', overtime: '0:00', lateNight: '0:00', late: '0:00', earlyLeave: '0:00', status: '出勤' },
  { date: '2025-06-27', dayOfWeek: '金', clockIn: '09:00', clockOut: '18:00', workingHours: '8:00', overtime: '0:00', lateNight: '0:00', late: '0:00', earlyLeave: '0:00', status: '出勤' },
  { date: '2025-06-28', dayOfWeek: '土', clockIn: '', clockOut: '', workingHours: '0:00', overtime: '0:00', lateNight: '0:00', late: '0:00', earlyLeave: '0:00', status: '休日' },
  { date: '2025-06-29', dayOfWeek: '日', clockIn: '', clockOut: '', workingHours: '0:00', overtime: '0:00', lateNight: '0:00', late: '0:00', earlyLeave: '0:00', status: '休日' },
  { date: '2025-06-30', dayOfWeek: '月', clockIn: '09:00', clockOut: '18:00', workingHours: '8:00', overtime: '0:00', lateNight: '0:00', late: '0:00', earlyLeave: '0:00', status: '出勤' },
]
  }

  return {
    dailyRecords,
    fetchDailyRecords
  }
}
