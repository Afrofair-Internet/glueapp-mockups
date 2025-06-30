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
              variant="outlined"
              color="secondary"
              prepend-icon="mdi-history"
              @click="goToReconcileHistory"
              elevation="1"
              rounded
            >
              突合履歴
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn
              variant="outlined"
              color="secondary"
              prepend-icon="mdi-history"
              @click="goToSyncHistory"
              elevation="1"
              rounded
            >
              同期履歴
            </v-btn>
          </v-col>

        </v-row>
      </v-col>
    </v-row>

    <!-- 人事マスタ同期 -->
    <h2 class="text-subtitle-1 font-weight-bold mb-2">人事マスタ同期状況</h2>
    <!-- ステータスカード -->
    <StatusSummaryCard />
    <v-row>
      <v-col cols="12" md="4" v-for="item in masterServices" :key="item.id">
        <MasterSyncCard
          :service="item"
          @sync="sync"
        />
      </v-col>
    </v-row>

    <!-- トランザクション同期 -->
    <h2 class="text-subtitle-1 font-weight-bold mt-6 mb-2">トランザクション同期状況</h2>
    <v-row>
      <v-col cols="12" md="4" v-for="item in transactionServices" :key="item.id">
        <TransactionSyncCard
          :service="item"
          @sync="sync"
          @month-change="handleMonthChange"
          @fetch="fetchTransactionData"
          @confirm="confirm"
          @approve="approve"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import MasterSyncCard from '@/components/sync/MasterSyncCard.vue'
import TransactionSyncCard from '@/components/sync/TransactionSyncCard.vue'
import { useMasterServices } from '@/composables/useMasterServices'
import { useTransactionServices } from '@/composables/useTransactionServices'
import StatusSummaryCard from '@/components/status/StatusSummaryCard.vue'

const router = useRouter()

const { masterServices } = useMasterServices()
const { transactionServices } = useTransactionServices()


const goToReconcileHistory = () => {
  router.push({ name: 'ReconcileHistory' })
}

const goToSyncHistory = () => {
  router.push({ name: 'SyncHistory' })
}

const sync = (id: string) => {
  console.log('同期:', id)
  // ここに同期処理を実装する
}
// 対象月度変更
const handleMonthChange = (id: string, month: string) => {
  console.log(`月度変更：${id} → ${month}`)
}
// 取得
const fetchTransactionData = (id: string, month: string) => {
  console.log(`データ取得: サービスID=${id}, 月=${month}`)
  // 実際の API 呼び出しや状態更新処理
}
// 取得内容確認
const confirm = (id: string) => {
  console.log('確認:', id)
}
// 承認
const approve = (id: string) => {
  console.log('承認:', id)
}
</script>
