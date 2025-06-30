<template>
  <v-container>
    <div class="d-flex justify-space-between align-center mb-4">
      <h2 class="text-h6 font-weight-bold">月次勤怠集計</h2>
      <v-btn color="success" @click="onSubmit">送信</v-btn>
    </div>

    <v-row class="mb-2">
      <v-col cols="12" md="4">
        <v-select
          v-model="selectedMonth"
          :items="months"
          label="対象年月"
          density="compact"
          variant="outlined"
        />
      </v-col>
    </v-row>

    <v-data-table
      :headers="headers"
      :items="attendances"
      class="elevation-1"
      density="comfortable"
      fixed-header
      height="400"
    >
      <template #item.actions="{ item }">
        <v-icon small @click="goToDetail(item)">mdi-information</v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import type { Attendance } from '@/types/attendance'
import { useAttendance } from '@/composables/useAttendance'

const router = useRouter()

const selectedMonth = ref('2025年6月')
const months = ['2025年6月', '2025年5月', '2025年4月']

const { attendances, fetchAttendances } = useAttendance()

onMounted(() => {
  fetchAttendances()
})

const headers = [
  { title: 'ID', key: 'employeeId' },
  { title: '氏名', key: 'name' },
  { title: '勤務日数', key: 'workDays' },
  { title: '所定日数', key: 'scheduledDays' },
  { title: '総労働時間', key: 'totalHours' },
  { title: '残業時間', key: 'overtimeHours' },
  { title: '深夜時間', key: 'lateHours' },
  { title: '遅刻時間', key: 'lateTime' },
  { title: '早退時間', key: 'earlyLeaveTime' },
  { title: 'ステータス', key: 'status' },
  { title: '詳細', key: 'actions', sortable: false },
]

const onSubmit = () => {
  console.log('送信ボタン押下')
}

const goToDetail = (item: Attendance) => {
  router.push({
    name: 'AttendanceDetail',
    params: { employeeId: item.employeeId },
    query: {
      month: selectedMonth.value,
      workDays: item.workDays,
      scheduledDays: item.scheduledDays,
      totalHours: item.totalHours,
      overtimeHours: item.overtimeHours,
      lateHours: item.lateHours,
      lateTime: item.lateTime,
      earlyLeaveTime: item.earlyLeaveTime,
      status: item.status
    }
  })
}
</script>
