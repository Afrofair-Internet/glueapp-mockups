<template>
  <v-container>
    <div class="d-flex justify-space-between align-center mb-2">
      <div>
        <h3 class="mb-1">対象年月：{{ selectedMonth }}</h3>
        <h3 class="mb-1">{{ userName }}</h3>
      </div>

      <!-- 承認ボタン -->
      <div class="d-flex justify-end align-center mb-2">
          <v-btn
            color="error"
            class="mr-2"
            :disabled="summary.approvalStatus === '承認済み'"
            @click="handleReject"
          >
            差戻し
          </v-btn>
        <v-btn
          color="success"
          :disabled="summary.approvalStatus !== '申請中'"
          @click="handleApprove"
        >
          {{ summary.approvalStatus === '承認済み' ? '承認済み' : '承認' }}
        </v-btn>
      </div>
    </div>
    <!-- 上部サマリ表示 -->
    <v-card class="mb-4 pa-4">
      <v-row>
        <v-col cols="12" sm="3">
          <strong>件数：</strong> {{ summary.itemCount }} 件
        </v-col>
        <v-col cols="12" sm="3">
          <strong>合計金額：</strong> ¥{{ summary.totalAmount.toLocaleString() }}
        </v-col>
        <v-col cols="12" sm="3">
          <strong>申請日：</strong> {{ summary.submittedAt }}
        </v-col>
        <v-col cols="12" sm="3">
          <strong>ステータス：</strong> {{ summary.approvalStatus }}
        </v-col>
      </v-row>
    </v-card>

    <!-- 明細テーブル -->
    <v-data-table
      :headers="headers"
      :items="expenseItems"
      class="elevation-1"
      density="comfortable"
      fixed-header
      height="500"
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
import { useExpenseItem } from '@/composables/useExpenseItem'

const route = useRoute()
const router = useRouter()
const employeeId = route.params.employeeId as string
const selectedMonth = ref((route.query.month as string) || '2025年6月')

// 仮ユーザー名
const userMap: Record<string, string> = {
  '0001': 'ユーザー01',
  '0002': 'ユーザー02',
  // ...
}
const userName = computed(() => userMap[employeeId] || '不明')

// 上部概要情報（サマリ）
const summary = ref({
  itemCount: Number(route.query.itemCount || 0),
  totalAmount: Number(route.query.totalAmount || 0),
  submittedAt: String(route.query.submittedAt || ''),
  approvalStatus: String(route.query.approvalStatus || '')
})

// 明細データ
const { expenseItems, fetchExpenseItems } = useExpenseItem()
onMounted(() => {
  fetchExpenseItems(employeeId, selectedMonth.value)
})

// 明細列定義
const headers = [
  { title: '精算日', key: 'date' },
  { title: '経費種別', key: 'category' },
  { title: '金額', key: 'amount' },
  { title: '支払方法', key: 'paymentMethod' },
  { title: '税区分', key: 'taxType' },
  { title: '摘要・備考', key: 'remarks' }
]

const handleApprove = () => {
  summary.value.approvalStatus = '承認済み'
}
const handleReject = () => {
  summary.value.approvalStatus = '差戻し'
}


const goBack = () => {
  router.push({ name: 'ExpenseList' })
}
</script>
