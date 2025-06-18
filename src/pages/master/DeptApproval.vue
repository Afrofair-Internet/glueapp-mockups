<template>
  <v-container>
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>部署情報マスタ申請データ承認</span>
        <div>
          <v-btn color="success" class="mr-2" @click="updateStatus('承認')">承認</v-btn>
          <v-btn color="error" class="mr-2" @click="updateStatus('否認')">否認</v-btn>
          <v-btn color="warning" @click="updateStatus('差戻し')">差戻し</v-btn>
        </div>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field v-model="filters.departmentCode" label="部署CD" />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field v-model="filters.departmentName" label="部署名" />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field v-model="filters.manager" label="責任者" />
          </v-col>
        </v-row>

        <v-data-table
          :headers="headers"
          :items="filteredRows"
          item-value="departmentCode"
          show-select
          v-model="selected"
          class="elevation-1"
        >
          <template #item.actions="{ item }">
            <v-btn variant="text" @click="openDialog(item)">
              <v-icon>mdi-information</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <DepartmentDialog
      v-model="dialogVisible"
      :record="selectedDetail"
      :readonly="true"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import DepartmentDialog from '@/components/dept/DeptDialog.vue'
import type { DeptRecord } from '@/types/dept'
import { useDeptRecords } from '@/composables/useDeptRecords'

const { deptRecords } = useDeptRecords()

const filters = ref({
  departmentCode: '',
  departmentName: '',
  manager: ''
})

const headers = [
  { title: '部署CD', value: 'departmentCode' },
  { title: '部署名', value: 'departmentName' },
  { title: '責任者', value: 'manager' },
  { title: '所在地', value: 'location' },
  { title: '承認ステータス', value: 'approvalStatus' },
  { title: '', value: 'actions', sortable: false }
]

const selected = ref<string[]>([])
const dialogVisible = ref(false)
const selectedDetail = ref<DeptRecord | null>(null)

const filteredRows = computed(() => {
  return deptRecords.value.filter(row => {
    return (
      row.approvalStatus === '申請中' &&
      (!filters.value.departmentCode || row.departmentCode.includes(filters.value.departmentCode)) &&
      (!filters.value.departmentName || row.departmentName.includes(filters.value.departmentName)) &&
      (!filters.value.manager || row.manager.includes(filters.value.manager))
    )
  })
})

function updateStatus(status: string) {
  deptRecords.value = deptRecords.value.map(row =>
    selected.value.includes(row.departmentCode) ? { ...row, approvalStatus: status } : row
  )
  selected.value = []
}

function openDialog(item: DeptRecord) {
  selectedDetail.value = item
  dialogVisible.value = true
}
</script>
