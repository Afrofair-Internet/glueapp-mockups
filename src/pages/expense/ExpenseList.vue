<template>
  <v-container>
    <div class="d-flex justify-space-between align-center mb-4">
      <h2 class="text-h6 font-weight-bold">月次経費精算一覧</h2>
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
      :items="expenses"
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Expense } from '@/types/expense'
import { useExpense } from '@/composables/useExpense'

const router = useRouter()

const selectedMonth = ref('2025年6月')
const months = ['2025年6月', '2025年5月', '2025年4月']

const { expenses, fetchExpenses } = useExpense()

onMounted(() => {
  fetchExpenses()
})

const headers = [
  { title: 'ID', key: 'employeeId' },
  { title: '氏名', key: 'name' },
  { title: '件数', key: 'itemCount' },
  { title: '合計金額', key: 'totalAmount' },
  { title: '申請日', key: 'submittedAt' },
  { title: '承認者', key: 'approver' },
  { title: 'ステータス', key: 'status' },
  { title: '詳細', key: 'actions', sortable: false },
]

const onSubmit = () => {
  console.log('送信ボタン押下')
}

const goToDetail = (item: Expense) => {
  router.push({
    name: 'ExpenseDetail',
    params: { employeeId: item.employeeId },
    query: { month: selectedMonth.value }
  })
}
</script>
