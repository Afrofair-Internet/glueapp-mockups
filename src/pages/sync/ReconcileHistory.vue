<template>
  <v-container fluid>
    <v-row align="center" class="mb-4">
      <v-col cols="auto">
        <v-btn icon variant="text" @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <h1 class="text-h5 font-weight-bold">突合履歴</h1>
      </v-col>
    </v-row>

    <v-card>
      <v-data-table
        :headers="headers"
        :items="historyItems"
        item-value="id"
        class="elevation-1"
        density="comfortable"
        :items-per-page="10"
      >
        <template #item.result="{ item }">
          <v-chip :color="item.result === '一致' ? 'success' : 'error'" size="small" variant="outlined">
            {{ item.result }}
          </v-chip>
        </template>
        <template #item.actions="{ item }">
          <v-btn icon variant="text" @click="viewDetail(item)">
            <v-icon>mdi-information</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const goBack = () => router.back()

interface ReconcileRecord {
  service: string
  targetMonth: string
  executedAt: string
  result: '一致' | '差異あり'
}

type HeaderItem = {
  title: string
  value: string
  sortable?: boolean
  width?: number
}

const headers: HeaderItem[] = [
  { title: '対象サービス', value: 'service' },
  { title: '対象月度', value: 'targetMonth' },
  { title: '実行日時', value: 'executedAt' },
  { title: '突合結果', value: 'result' },
  { title: '詳細', value: 'actions', sortable: false }
]

const historyItems = ref<ReconcileRecord[]>([
  {
    service: 'オフィスステーション：人事マスタ',
    targetMonth: '2025-06',
    executedAt: '2025-06-22 06:20',
    result: '一致'
  },
  {
    service: 'ジョブカン：人事マスタ',
    targetMonth: '2025-06',
    executedAt: '2025-06-22 06:10',
    result: '一致'
  },
  {
    service: 'jinjer：人事マスタ',
    targetMonth: '2025-06',
    executedAt: '2025-06-22 06:00',
    result: '差異あり'
  }
])


const viewDetail = (item: ReconcileRecord) => {
  console.log('突合履歴の詳細へ:', item)
  // 必要なら router.push で ReconcileDiff などへ遷移
}
</script>

<style scoped>
.v-data-table {
  max-height: 600px;
  overflow-y: auto;
}
</style>
