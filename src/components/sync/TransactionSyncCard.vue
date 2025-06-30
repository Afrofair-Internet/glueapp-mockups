<template>
  <v-card class="pa-4">
    <div class="d-flex justify-space-between align-center mb-2">
      <div>
        <div class="text-subtitle-1 font-weight-medium">{{ service.label }}</div>
          <v-select
            v-model="selectedMonth"
            :items="monthOptions"
            item-title="label"
            item-value="value"
            label="対象月度"
            variant="outlined"
            density="compact"
          />
        </div>

      <v-chip :color="statusColor" variant="outlined" size="small">
        <v-icon start :icon="statusIcon" /> {{ statusLabel }}
      </v-chip>
    </div>

    <div class="d-flex justify-space-between align-center text-caption mb-2">
      <div>
        最終更新日時：{{ currentMonthData?.lastSynced || '未取得' }}
      </div>
      <!-- エラー表示 -->
      <div class="text-caption mb-2" style="min-height: 1.5em;">
        <span v-if="currentMonthData?.errorMessage" class="text-error">
          エラー：{{ currentMonthData.errorMessage }}
        </span>
      </div>
    </div>


    <!-- 取得ボタン -->
    <v-btn block variant="outlined" color="info" class="my-2" @click="emit('fetch', service.id, selectedMonth)">
      <v-icon left size="small">mdi-download</v-icon>取得（{{ selectedMonth }}）
    </v-btn>

    <!-- 確認ボタン -->
    <v-btn block variant="outlined" color="orange" class="mb-2" @click="emit('confirm', service.id)">
      <v-icon left size="small">mdi-magnify</v-icon> 取得内容を確認
    </v-btn>

    <!-- 承認ボタン -->
    <v-btn block variant="outlined" color="success" class="mb-2" @click="emit('approve', service.id)">
      <v-icon left size="small">mdi-check</v-icon> 承認
    </v-btn>

    <!-- 同期ボタン -->
    <v-btn block variant="outlined" color="primary" @click="$emit('sync', service.id)" class="mt-2">
      <v-icon left size="small">mdi-upload</v-icon> 送信
    </v-btn>
  </v-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { TransactionService } from '@/types/transactionService'

const props = defineProps<{ service: TransactionService }>()

const emit = defineEmits<{
  (e: 'sync', id: string): void
  (e: 'reconcile', id: string): void
  (e: 'month-change', id: string, month: string): void
  (e: 'fetch', id: string, month: string): void
  (e: 'confirm', id: string): void
  (e: 'approve', id: string): void
}>()

// 過去12ヶ月〜今月までの年月を自動生成
const monthOptions = computed(() => {
  const result = []
  const now = new Date()
  for (let i = 0; i < 12; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const y = date.getFullYear()
    const m = (date.getMonth() + 1).toString().padStart(2, '0')
    result.push({ label: `${y}年${m}月`, value: `${y}-${m}` })
  }
  return result
})

// 初期値候補
const availableMonths = Object.keys(props.service.monthData ?? {})

// computedで生成されたmonthOptionsは.valueで展開が必要！
const initialMonth =
  monthOptions.value[0]?.value ?? availableMonths[0] ?? ''

const selectedMonth = ref<string>(initialMonth)

// 選択中の月データを computed で安全に取得
const currentMonthData = computed(() => {
  return props.service.monthData?.[selectedMonth.value] ?? null
})

const statusLabel = computed(() => {
  const status = currentMonthData.value?.syncStatus
  switch (status) {
    case 'fetched': return '取得済'
    case 'confirmed': return '確認済'
    case 'approved': return '承認済'
    case 'synced': return '送信済'
    default: return '未取得'
  }
})

const statusIcon = computed(() => {
  const status = currentMonthData.value?.syncStatus
  switch (status) {
    case 'fetched': return 'mdi-download'
    case 'confirmed': return 'mdi-magnify'
    case 'approved': return 'mdi-check-bold'
    case 'synced': return 'mdi-upload'
    default: return 'mdi-cloud-question'
  }
})

const statusColor = computed(() => {
  const status = currentMonthData.value?.syncStatus
  switch (status) {
    case 'fetched': return 'info'
    case 'confirmed': return 'warning'
    case 'approved': return 'success'
    case 'synced': return 'primary'
    default: return 'grey'
  }
})
</script>

<style scoped>
.v-card {
  min-height: 350px;
}
</style>
