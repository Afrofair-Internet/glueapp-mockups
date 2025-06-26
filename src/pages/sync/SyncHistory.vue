<template>
  <v-container fluid>
    <v-row align="center" class="mb-4">
      <v-col cols="auto">
        <v-btn icon variant="text" @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <h1 class="text-h5 font-weight-bold">同期履歴</h1>
      </v-col>
    </v-row>

    <v-tabs v-model="tab" grow>
      <v-tab value="master">マスタ同期</v-tab>
      <v-tab value="transaction">トランザクション同期</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <!-- マスタ同期 -->
      <v-window-item value="master">
        <v-card class="mt-4">
          <v-data-table
            :headers="masterHeaders"
            :items="masterHistory"
            item-value="id"
            class="elevation-1"
            density="comfortable"
            :items-per-page="10"
          >
            <template #item.status="{ item }">
              <v-chip :color="statusColor(item.status)" size="small" variant="outlined">
                {{ item.status }}
              </v-chip>
            </template>
            <template #item.actions="{ item }">
              <v-btn icon variant="text" @click="viewDetail(item)">
                <v-icon>mdi-information</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-window-item>

      <!-- トランザクション同期 -->
      <v-window-item value="transaction">
        <v-card class="mt-4">
          <v-data-table
            :headers="transactionHeaders"
            :items="transactionHistory"
            item-value="id"
            class="elevation-1"
            density="comfortable"
            :items-per-page="10"
          >
            <template #item.status="{ item }">
              <v-chip :color="statusColor(item.status)" size="small" variant="outlined">
                {{ item.status }}
              </v-chip>
            </template>
            <template #item.actions="{ item }">
              <v-btn icon variant="text" @click="viewDetail(item)">
                <v-icon>mdi-information</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const goBack = () => router.back()

const tab = ref<'master' | 'transaction'>('master')

const masterHeaders = [
  { title: 'サービス名', value: 'service' },
  { title: '同期日時', value: 'syncedAt' },
  { title: '実行ユーザー', value: 'executedBy' },
  { title: '結果', value: 'status' },
  { title: '操作', value: 'actions', sortable: false }
]

const transactionHeaders = [
  { title: 'サービス名', value: 'service' },
  { title: '月度', value: 'targetMonth' },
  { title: '同期日時', value: 'syncedAt' },
  { title: '実行ユーザー', value: 'executedBy' },
  { title: '結果', value: 'status' },
  { title: '操作', value: 'actions', sortable: false }
]

const masterHistory = [
  { id: 1, service: 'jinjer：人事マスタ', syncedAt: '2025-06-26 10:01', executedBy: '山田 太郎', status: '同期済' },
  { id: 2, service: 'ジョブカン：人事マスタ', syncedAt: '2025-06-26 09:45', executedBy: '佐藤 花子', status: '同期済' },
  { id: 3, service: 'オフィスステーション：人事マスタ', syncedAt: '2025-06-26 09:30', executedBy: '管理者', status: '同期済' },
  { id: 4, service: 'jinjer：人事マスタ', syncedAt: '2025-06-25 17:10', executedBy: '鈴木 一郎', status: 'エラー' },
  { id: 5, service: 'ジョブカン：人事マスタ', syncedAt: '2025-06-25 15:00', executedBy: '山田 太郎', status: 'エラー' },
  { id: 6, service: 'オフィスステーション：人事マスタ', syncedAt: '2025-06-24 11:30', executedBy: '佐藤 花子', status: '同期済' },
  { id: 7, service: 'jinjer：人事マスタ', syncedAt: '2025-06-23 08:20', executedBy: '山田 太郎', status: '同期済' },
  { id: 8, service: 'ジョブカン：人事マスタ', syncedAt: '2025-06-22 14:50', executedBy: '管理者', status: '同期済' }
]

const transactionHistory = [
  { id: 101, service: '勤怠データ（jinjer）', targetMonth: '2025-06', syncedAt: '2025-06-26 09:30', executedBy: '山田 太郎', status: '同期済' },
  { id: 102, service: '経費データ（ジョブカン）', targetMonth: '2025-06', syncedAt: '2025-06-25 14:20', executedBy: '佐藤 花子', status: 'エラー' },
  { id: 103, service: '勤怠データ（jinjer）', targetMonth: '2025-05', syncedAt: '2025-05-30 16:15', executedBy: '鈴木 一郎', status: '同期済' },
  { id: 104, service: '経費データ（ジョブカン）', targetMonth: '2025-05', syncedAt: '2025-05-28 10:50', executedBy: '佐藤 花子', status: '同期済' },
  { id: 105, service: '勤怠データ（jinjer）', targetMonth: '2025-04', syncedAt: '2025-04-30 17:45', executedBy: '山田 太郎', status: '同期済' },
]

const viewDetail = (item: any) => {
  console.log('詳細表示:', item)
  // 例: router.push({ name: 'SyncDetail', params: { id: item.id } })
}

const statusColor = (status: string) => {
  switch (status) {
    case '同期済': return 'success'
    case 'エラー': return 'error'
    default: return 'default'
  }
}
</script>
