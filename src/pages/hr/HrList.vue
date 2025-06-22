<template>
  <v-container>
    <v-card class="pa-4">
      <v-text-field
        v-model="search"
        label="従業員検索（氏名・ID・メール・部署など）"
        prepend-inner-icon="mdi-magnify"
        class="mb-4"
        clearable
      />
      <v-data-table
        :headers="headers"
        :items="filteredRecords"
        :items-per-page="10"
        class="elevation"
      >
        <template #top>
          <div class="d-flex justify-space-between align-center mb-4">
            <h2 class="text-h6 font-weight-bold">人事マスタ一覧</h2>
            <v-btn color="primary" @click="onRegister">新規登録</v-btn>
          </div>
        </template>

        <template #item.actions="{ item }">
          <v-btn icon variant="text" @click="showDetail(item)">
            <v-icon>mdi-information</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <HrDialog
      v-model="showDialog"
      :record="selectedRecord"
      :mode="dialogMode"
      @submit="handleSubmit"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import HrDialog from '@/components/hr/HrDialog.vue'
import type { HrRecord } from '../../types/hr'
import { useHrRecords } from '@/composables/useHrRecords'

const search = ref('')

const { hrRecords } = useHrRecords()

// ソート可能なヘッダー定義
const headers = [
  { title: 'No', value: 'index', sortable: false },
  { title: '従業員ID', value: 'employeeId', sortable: true },
  { title: '従業員コード', value: 'employeeCode', sortable: true },
  { title: '氏名', value: 'fullName' },
  { title: '部署名', value: 'department', sortable: true },
  { title: '在籍状態', value: 'workStatus', sortable: true },
  { title: '入社年月日', value: 'hireDate', sortable: true },
  { title: '承認ステータス', value: 'approvalStatus', sortable: false },
  { title: '詳細', value: 'actions', sortable: false },
]

// テーブルに表示する加工済みデータ
type HrDisplayRecord = HrRecord & {
  fullName: string
  index: number
}

const displayRecords = computed<HrDisplayRecord[]>(() =>
  hrRecords.value.map((r, i) => ({
    ...r,
    fullName: `${r.lastName} ${r.firstName}`,
    index: i + 1,
  }))
)

const filteredRecords = computed(() => {
  const keyword = search.value.trim().toLowerCase()
  if (!keyword) return displayRecords.value
  return displayRecords.value.filter((r) => {
    return (
      r.employeeId?.toLowerCase().includes(keyword) ||
      r.employeeCode?.toLowerCase().includes(keyword) ||
      r.lastName?.toLowerCase().includes(keyword) ||
      r.firstName?.toLowerCase().includes(keyword) ||
      r.department?.toLowerCase().includes(keyword) ||
      r.workStatus?.toLowerCase().includes(keyword) ||
      r.email?.toLowerCase().includes(keyword)
    )
  })
})

const showDialog = ref(false)
const dialogMode = ref<'create' | 'edit' | 'view'>('view')
const selectedRecord = ref<HrRecord | undefined>()

function onRegister() {
  selectedRecord.value = undefined
  dialogMode.value = 'create'
  showDialog.value = true
}

function showDetail(record: HrRecord) {
  selectedRecord.value = { ...record }
  dialogMode.value = 'view'
  showDialog.value = true
}

function handleSubmit(updated: HrRecord) {
  if (dialogMode.value === 'create') {
    hrRecords.value.push(updated)
    alert('登録しました')
  } else {
    const i = hrRecords.value.findIndex(r => r.employeeId === updated.employeeId)
    if (i !== -1) hrRecords.value[i] = updated
    alert('更新しました')
  }
}
</script>
