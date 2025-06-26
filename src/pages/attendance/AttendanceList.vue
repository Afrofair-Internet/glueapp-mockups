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
        <v-icon small @click="showDetail(item)">mdi-information</v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedMonth = ref('2025年6月')
const months = ['2025年6月', '2025年5月', '2025年4月']

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
  { title: '操作', key: 'actions', sortable: false },
]

const attendances = ref([
  {
    employeeId: '0001',
    name: 'ユーザー01',
    workDays: 20,
    scheduledDays: 22,
    totalHours: '144:00',
    overtimeHours: '12:00',
    lateHours: '2:00',
    lateTime: '0:30',
    earlyLeaveTime: '0:00',
    status: '申請中',
    department: '営業部',
  },
  // ... 他の行
])

const onSubmit = () => {
  console.log('送信ボタン押下')
}

const showDetail = (item: any) => {
  console.log('詳細表示:', item)
}
</script>
