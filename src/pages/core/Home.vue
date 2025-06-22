<template>
  <v-container fluid>
    <v-row align="center" justify="space-between" class="mb-4">
      <v-col cols="auto">
        <h1 class="text-h5 font-weight-bold">データ同期ダッシュボード</h1>
      </v-col>
      <v-col cols="auto">
        <v-row class="align-center" dense>
          <v-col cols="auto">
            <v-btn
              color="primary"
              variant="flat"
              prepend-icon="mdi-sync"
              @click="syncAll"
              :loading="isSyncingAll"
              elevation="1"
              rounded
            >
              一括同期
            </v-btn>
          </v-col>

          <v-col cols="auto">
            <v-btn
              variant="outlined"
              color="secondary"
              prepend-icon="mdi-history"
              @click="goToHistory"
              elevation="1"
              rounded
            >
              同期履歴
            </v-btn>
          </v-col>

          <v-col cols="auto">
            <ScheduleDialog />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- 人事マスタ同期 -->
    <h2 class="text-subtitle-1 font-weight-bold mb-2">人事マスタ同期状況</h2>
    <v-row>
      <v-col cols="12" md="4" v-for="item in masterServices" :key="item.id">
        <SyncCard
          :service="item"
          @view-diff="viewDiff"
          @reconcile="reconcile"
        />
      </v-col>
    </v-row>

    <!-- トランザクション同期 -->
    <h2 class="text-subtitle-1 font-weight-bold mt-6 mb-2">トランザクション同期状況</h2>
    <v-row>
      <v-col cols="12" md="4" v-for="item in transactionServices" :key="item.id">
        <SyncCard
          :service="item"
          @view-diff="viewDiff"
          @reconcile="reconcile"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import SyncCard from '@/components/sync/SyncCard.vue'
import ScheduleDialog from '@/components/sync/ScheduleDialog.vue'
import axios from 'axios'

const isSyncingAll = ref(false)

const syncAll = async () => {
  isSyncingAll.value = true
  try {
    await axios.post('/api/sync/all')
    console.log('一括同期成功')
  } catch (err) {
    console.error('一括同期失敗:', err)
  } finally {
    isSyncingAll.value = false
  }
}

const goToHistory = () => {
  router.push({ name: 'SyncHistory' })
}

type SyncStatus = 'success' | 'error' | 'not_synced'

interface Service {
  id: string
  label: string
  syncStatus: SyncStatus
  lastSynced: string | null
  reconcileDiffCount: number
  errorMessage?: string
}

const masterServices = ref<Service[]>([
  {
    id: 'jinjer_hr',
    label: 'jinjer：人事マスタ',
    syncStatus: 'success',
    lastSynced: '2025-06-22 05:00',
    reconcileDiffCount: 2,
  },
  {
    id: 'jobcan_hr',
    label: 'ジョブカン：人事マスタ',
    syncStatus: 'error',
    lastSynced: null,
    reconcileDiffCount: 0,
    errorMessage: 'API認証エラー',
  },
  {
    id: 'office_hr',
    label: 'オフィスステーション：人事マスタ',
    syncStatus: 'success',
    lastSynced: '2025-06-22 06:30',
    reconcileDiffCount: 0,
  },
])

const transactionServices = ref<Service[]>([
  {
    id: 'jinjer_attendance',
    label: 'jinjer：勤怠データ',
    syncStatus: 'success',
    lastSynced: '2025-06-22 06:00',
    reconcileDiffCount: 3,
  },
  {
    id: 'jobcan_expense',
    label: 'ジョブカン：経費データ',
    syncStatus: 'error',
    lastSynced: null,
    reconcileDiffCount: 0,
    errorMessage: '通信エラー',
  },
])

const router = useRouter()
const reconcile = (id: string) => {
  console.log('再突合:', id)
}
const viewDiff = (id: string) => {
  router.push({ name: 'ReconcileDiff', params: { serviceId: id } })
}
</script>
