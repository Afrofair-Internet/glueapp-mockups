<template>
  <v-container>
    <div class="d-flex justify-space-between align-center mb-2">
      <div>
        <h3 class="mb-1">対象年月：{{ selectedMonth }}</h3>
        <h3 class="mb-1">{{ userName }}</h3>
      </div>
      <!-- 差戻し・承認ボタン -->
      <div class="d-flex justify-end align-center mb-2">
          <v-btn
            color="error"
            class="mr-2"
            :disabled="summary.status === '承認済み'"
            @click="handleReject"
          >
            差戻し
          </v-btn>
        <v-btn
          color="success"
          :disabled="summary.status !== '申請中'"
          @click="handleApprove"
        >
          {{ summary.status === '承認済み' ? '承認済み' : '承認' }}
        </v-btn>
      </div>
    </div>

        <!-- 上部サマリ -->
    <v-card class="mb-4 pa-4">
      <v-row>
        <v-col cols="12" sm="3">
          <strong>勤務日数：</strong> {{ summary.workDays }} 日
        </v-col>
        <v-col cols="12" sm="3">
          <strong>所定日数：</strong> {{ summary.scheduledDays }} 日
        </v-col>
        <v-col cols="12" sm="3">
          <strong>総労働時間：</strong> {{ summary.totalHours }}
        </v-col>
        <v-col cols="12" sm="3">
          <strong>残業時間：</strong> {{ summary.overtimeHours }}
        </v-col>
        <v-col cols="12" sm="3">
          <strong>深夜時間：</strong> {{ summary.lateHours }}
        </v-col>
        <v-col cols="12" sm="3">
          <strong>遅刻時間：</strong> {{ summary.lateTime }}
        </v-col>
        <v-col cols="12" sm="3">
          <strong>早退時間：</strong> {{ summary.earlyLeaveTime }}
        </v-col>
        <v-col cols="12" sm="3">
          <strong>ステータス：</strong> {{ summary.status }}
        </v-col>
      </v-row>
    </v-card>

    <!-- 明細テーブル -->
    <v-data-table
      :headers="headers"
      :items="dailyRecords"
      class="elevation-1"
      density="comfortable"
      fixed-header
      height="600"
      :items-per-page="-1"
      hide-default-footer
    />

    <div class="text-right mt-4">
      <v-btn color="primary" @click="goBack">一覧に戻る</v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import { useDailyAttendance } from '@/composables/useDailyAttendance'

const route = useRoute()
const router = useRouter()
const employeeId = route.params.employeeId as string

const selectedMonth = ref((route.query.month as string) || '2025年6月')

const summary = ref({
  workDays: Number(route.query.workDays || 0),
  scheduledDays: Number(route.query.scheduledDays || 0),
  totalHours: route.query.totalHours as string || '',
  overtimeHours: route.query.overtimeHours as string || '',
  lateHours: route.query.lateHours as string || '',
  lateTime: route.query.lateTime as string || '',
  earlyLeaveTime: route.query.earlyLeaveTime as string || '',
  status: route.query.status as string || ''
})


// 勤怠データ取得
const { dailyRecords, fetchDailyRecords } = useDailyAttendance()
onMounted(() => {
  fetchDailyRecords(employeeId, selectedMonth.value)
})

const headers = [
  { title: '日付', key: 'date' },
  { title: '曜日', key: 'dayOfWeek' },
  { title: '出勤', key: 'clockIn' },
  { title: '退勤', key: 'clockOut' },
  { title: '労働時間', key: 'workingHours' },
  { title: '残業', key: 'overtime' },
  { title: '深夜', key: 'lateNight' },
  { title: '遅刻', key: 'late' },
  { title: '早退', key: 'earlyLeave' },
  { title: '勤務状況', key: 'status' },
]

// ユーザー名表示（仮マッピング）
const userMap: Record<string, string> = {
  '0001': 'ユーザー01',
  '0002': 'ユーザー02',
  '0003': 'ユーザー03',
  '0004': 'ユーザー04',
  '0005': 'ユーザー05',
  '0006': 'ユーザー06',
  '0007': 'ユーザー07',
  '0008': 'ユーザー08',
}

const userName = computed(() => userMap[employeeId] || '不明')

const handleApprove = () => {
  summary.value.status = '承認済み'
}
const handleReject = () => {
  summary.value.status = '差戻し'
}

const goBack = () => {
  router.push({ name: 'AttendanceList' })
}
</script>
