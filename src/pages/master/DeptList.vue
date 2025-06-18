<template>
  <v-container>
    <v-card class="pa-4">
      <v-text-field
        v-model="search"
        label="部署検索（部署名・CD・所在地・責任者など）"
        prepend-inner-icon="mdi-magnify"
        class="mb-4"
        clearable
      />
      <v-data-table
        :headers="headers"
        :items="filteredDepartments"
        :items-per-page="10"
        class="elevation"
      >
        <template #top>
          <div class="d-flex justify-space-between align-center mb-4">
            <h2 class="text-h6 font-weight-bold">部署マスタ一覧</h2>
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

    <DepartmentDialog
      v-model="showDialog"
      :record="selectedRecord"
      @submit="handleSubmit"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import DepartmentDialog from '@/components/dept/DeptDialog.vue'
import type { DeptRecord } from '@/types/dept'
import { useDeptRecords } from '@/composables/useDeptRecords'

const search = ref('')

const { deptRecords } = useDeptRecords()

const headers = [
  { title: 'No', value: 'index', sortable: false },
  { title: '承認ステータス', value: 'approvalStatus', sortable: false },
  { title: '運営状態', value: 'operationStatus' },
  { title: '部署CD', value: 'departmentCode' },
  { title: '部署名', value: 'departmentName' },
  { title: '所在地', value: 'location' },
  { title: '責任者', value: 'manager' },
  { title: '郵便番号', value: 'zip' },
  { title: '住所', value: 'address' },
  { title: '詳細', value: 'actions', sortable: false }
]

type DepartmentDisplayRecord = DeptRecord & {
  index: number
}

const displayDepartments = computed<DepartmentDisplayRecord[]>(() =>
  deptRecords.value.map((r, i) => ({
    ...r,
    index: i + 1
  }))
)

const filteredDepartments = computed(() => {
  const keyword = search.value.trim().toLowerCase()
  if (!keyword) return displayDepartments.value
  return displayDepartments.value.filter((r) => {
    return (
      r.departmentCode?.toLowerCase().includes(keyword) ||
      r.departmentName?.toLowerCase().includes(keyword) ||
      r.location?.toLowerCase().includes(keyword) ||
      r.manager?.toLowerCase().includes(keyword)
    )
  })
})

const showDialog = ref(false)
const dialogMode = ref<'create' | 'edit' | 'view'>('view')
const selectedRecord = ref<DeptRecord | undefined>()

function onRegister() {
  selectedRecord.value = undefined
  dialogMode.value = 'create'
  showDialog.value = true
}

function showDetail(record: DeptRecord) {
  selectedRecord.value = { ...record }
  dialogMode.value = 'view'
  showDialog.value = true
}

function handleSubmit(updated: DeptRecord) {
  if (dialogMode.value === 'create') {
    deptRecords.value.push(updated)
    alert('登録しました')
  } else {
    const i = deptRecords.value.findIndex(r => r.departmentCode === updated.departmentCode)
    if (i !== -1) deptRecords.value[i] = updated
    alert('更新しました')
  }
}
</script>
