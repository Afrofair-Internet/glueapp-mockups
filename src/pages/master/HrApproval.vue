<template>
  <v-container>
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>人事情報マスタ申請データ承認</span>
        <div>
          <v-btn color="success" class="mr-2" @click="updateStatus('承認')">承認</v-btn>
          <v-btn color="error" class="mr-2" @click="updateStatus('否認')">否認</v-btn>
          <v-btn color="warning" @click="updateStatus('差戻し')">差戻し</v-btn>
        </div>
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col cols="12" sm="4">
            <v-text-field v-model="filters.employeeCode" label="社員CD" />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field v-model="filters.employeeName" label="社員名" />
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field v-model="filters.department" label="部署名" />
          </v-col>
        </v-row>

        <v-data-table
          :headers="headers"
          :items="filteredRows"
          item-value="employeeId"
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

    <HrDialog
      v-model="dialogVisible"
      :record="selectedDetail"
      :readonly="true"
    />
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import HrDialog from '@/components/hr/HrDialog.vue'
import type { HrRecord } from '@/types/hr'
import { useHrRecords } from '@/composables/useHrRecords'

const { hrRecords } = useHrRecords()

const filters = ref({
  employeeCode: '',
  employeeName: '',
  department: '',
})

const headers = [
  { title: '社員ID', value: 'employeeId' },
  { title: '社員CD', value: 'employeeCode' },
  { title: '氏名', value: 'fullName' },
  { title: '性別', value: 'gender' },
  { title: '部署', value: 'department' },
  { title: '従業員区分', value: 'employmentType' },
  { title: '入社年月日', value: 'hireDate' },
  { title: 'ステータス', value: 'approvalStatus' },
  { title: '', value: 'actions', sortable: false },
]

const selected = ref<string[]>([])
const dialogVisible = ref(false)
const selectedDetail = ref<HrRecord | null>(null)

const filteredRows = computed(() => {
  return hrRecords.value.filter(row => {
    return (
      row.approvalStatus === '申請中' &&
      (!filters.value.employeeCode || row.employeeCode.includes(filters.value.employeeCode)) &&
      (!filters.value.employeeName || `${row.lastName}${row.firstName}`.includes(filters.value.employeeName)) &&
      (!filters.value.department || row.department.includes(filters.value.department))
    )
  }).map(row => ({
    ...row,
    fullName: `${row.lastName} ${row.firstName}`
  }))
})

function updateStatus(status: string) {
  hrRecords.value = hrRecords.value.map(row =>
    selected.value.includes(row.employeeId) ? { ...row, approvalStatus: status } : row
  )
  selected.value = []
}

function openDialog(item: HrRecord) {
  selectedDetail.value = item
  dialogVisible.value = true
}
</script>
