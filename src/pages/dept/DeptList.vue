<template>
  <v-container>
    <v-card class="pa-4">
      <v-text-field
        v-model="search"
        label="部署検索（部署名・CD・種別など）"
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

const departmentMap = computed(() => {
  const map = new Map<string, string>()
  deptRecords.value.forEach(dept => {
    map.set(dept.departmentCode, dept.departmentName)
  })
  return map
})

const departmentTypeOptions = [
  { value: 'headquarters', label: '本部' },
  { value: 'division', label: '事業部' },
  { value: 'department', label: '部' },
  { value: 'section', label: '課' },
  { value: 'group', label: 'グループ' },
  { value: 'project', label: 'プロジェクト' }
]

const departmentTypeLabelMap = computed(() => {
  const map = new Map<string, string>()
  departmentTypeOptions.forEach(opt => {
    map.set(opt.value, opt.label)
  })
  return map
})

const headers = [
  { title: 'No', value: 'index', sortable: false },
  { title: '承認ステータス', value: 'approvalStatus' },
  { title: '運営状態', value: 'operationStatus' },
  { title: '部署コード', value: 'departmentCode' },
  { title: '部署名', value: 'departmentName' },
  { title: '親部署', value: 'parentDepartment' },
  { title: '部署種別', value: 'departmentTypeLabel' },
  { title: '設置日', value: 'installedAt' },
  { title: '廃止日', value: 'abolishedAt' },
  { title: '詳細', value: 'actions', sortable: false }
]

type DepartmentDisplayRecord = DeptRecord & {
  index: number
  parentDepartment: string
  departmentTypeLabel: string
}

const displayDepartments = computed<DepartmentDisplayRecord[]>(() =>
  deptRecords.value.map((r, i) => ({
    ...r,
    index: i + 1,
    parentDepartment: departmentMap.value.get(r.parentDepartment) || '',
    departmentTypeLabel: departmentTypeLabelMap.value.get(r.departmentType) || ''
  }))
)

const filteredDepartments = computed(() => {
  const keyword = search.value.trim().toLowerCase()
  if (!keyword) return displayDepartments.value
  return displayDepartments.value.filter((r) => {
    return (
      r.departmentCode?.toLowerCase().includes(keyword) ||
      r.departmentName?.toLowerCase().includes(keyword) ||
      r.departmentTypeLabel?.toLowerCase().includes(keyword)
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
