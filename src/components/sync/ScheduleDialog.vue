<template>
  <v-dialog v-model="dialog" max-width="600">
    <template #activator="{ props }">
      <v-btn v-bind="props" color="primary" prepend-icon="mdi-calendar-clock">
        同期スケジュール設定
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="text-h6">定期的な同期スケジュール</v-card-title>
      <v-card-text>
        <v-select
          label="間隔の設定"
          :items="['日毎', '週毎', '月毎']"
          v-model="intervalType"
          variant="outlined"
          density="compact"
        />

        <v-select
          v-if="intervalType === '日毎'"
          label="繰り返す間隔"
          :items="['1日毎', '2日毎', '3日毎']"
          v-model="dailyInterval"
          variant="outlined"
          density="compact"
        />

        <template v-if="intervalType === '週毎'">
          <v-select
            label="繰り返す間隔"
            :items="['1週間毎', '2週間毎']"
            v-model="weeklyInterval"
            variant="outlined"
            density="compact"
          />
          <div class="mt-2">曜日:</div>
          <v-btn-toggle v-model="weeklyDays" multiple class="mt-1">
            <v-btn v-for="day in weekdays" :key="day.value" :value="day.value" size="small">
              {{ day.label }}
            </v-btn>
          </v-btn-toggle>
        </template>

        <template v-if="intervalType === '月毎'">
          <v-select
            label="繰り返す間隔"
            :items="['1ヶ月毎', '2ヶ月毎']"
            v-model="monthlyInterval"
            variant="outlined"
            density="compact"
          />
          <v-radio-group v-model="monthlyMode" inline>
            <v-radio label="日付" value="date" />
            <v-radio label="曜日（第4月曜など）" value="weekday" />
          </v-radio-group>
        </template>

        <v-text-field
          label="開始日"
          v-model="startDate"
          type="date"
          variant="outlined"
          density="compact"
        />

        <v-text-field
          label="実行時刻"
          v-model="startTime"
          type="time"
          variant="outlined"
          density="compact"
          class="mt-2"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="dialog = false">キャンセル</v-btn>
        <v-btn color="primary" @click="save">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dialog = ref(false)
const intervalType = ref('日毎')
const dailyInterval = ref('1日毎')
const weeklyInterval = ref('1週間毎')
const monthlyInterval = ref('1ヶ月毎')
const monthlyMode = ref<'date' | 'weekday'>('date')

const weekdays = [
  { label: '月', value: 'mon' },
  { label: '火', value: 'tue' },
  { label: '水', value: 'wed' },
  { label: '木', value: 'thu' },
  { label: '金', value: 'fri' },
  { label: '土', value: 'sat' },
  { label: '日', value: 'sun' }
]
const weeklyDays = ref<string[]>([])

const startDate = ref('2025-06-28')
const startTime = ref('06:00')

const save = () => {
  dialog.value = false
  console.log('保存:', {
    intervalType: intervalType.value,
    dailyInterval: dailyInterval.value,
    weeklyInterval: weeklyInterval.value,
    monthlyInterval: monthlyInterval.value,
    monthlyMode: monthlyMode.value,
    weeklyDays: weeklyDays.value,
    startDate: startDate.value,
    startTime: startTime.value,
  })
}
</script>
