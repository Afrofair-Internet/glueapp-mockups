<template>
  <v-container>
    <h2 class="text-h5 mb-4">{{ serviceLabel }} の差分詳細</h2>

    <v-data-table
      :headers="headers"
      :items="diffs"
      class="elevation-1"
      dense
    >
      <template #item.status="{ item }">
        <v-chip :color="item.status === 'new' ? 'green' : 'orange'" small>
          {{ item.status === 'new' ? '新規' : '更新' }}
        </v-chip>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const serviceId = route.params.serviceId as string
const type = serviceId.split('_')[1] // 'hr', 'attendance', 'expense' など

const serviceLabel = ref(serviceId)
const diffs = ref<any[]>([])

const headers = computed(() => {
  switch (type) {
    case 'hr':
      return [
        { text: '氏名', value: 'name' },
        { text: '部署', value: 'department' },
        { text: 'ステータス', value: 'status' }
      ]
    case 'attendance':
      return [
        { text: '日付', value: 'date' },
        { text: '勤務時間', value: 'hours' },
        { text: 'ステータス', value: 'status' }
      ]
    case 'expense':
      return [
        { text: '経費項目', value: 'item' },
        { text: '金額', value: 'amount' },
        { text: 'ステータス', value: 'status' }
      ]
    default:
      return [
        { text: 'ID', value: 'id' },
        { text: 'ステータス', value: 'status' }
      ]
  }
})

onMounted(() => {
  serviceLabel.value = getLabel(serviceId)

  if (type === 'hr') {
    diffs.value = [
      { id: 1, name: '山田 太郎', department: '営業部', status: 'new' },
      { id: 2, name: '佐藤 花子', department: '総務部', status: 'updated' }
    ]
  } else if (type === 'attendance') {
    diffs.value = [
      { id: 1, date: '2025-06-20', hours: '8:00', status: 'new' },
      { id: 2, date: '2025-06-21', hours: '7:30', status: 'updated' }
    ]
  } else if (type === 'expense') {
    diffs.value = [
      { id: 1, item: '交通費', amount: 1500, status: 'new' },
      { id: 2, item: '宿泊費', amount: 9800, status: 'updated' }
    ]
  } else {
    diffs.value = [
      { id: 1, status: 'new' },
      { id: 2, status: 'updated' }
    ]
  }
})

function getLabel(id: string): string {
  switch (id) {
    case 'jinjer_hr':
      return 'jinjer（人事マスタ）'
    case 'jinjer_attendance':
      return 'jinjer（勤怠データ）'
    case 'jobcan_expense':
      return 'ジョブカン（経費データ）'
    default:
      return id
  }
}
</script>
