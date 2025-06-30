<template>
  <v-row class="mb-2" dense>
    <v-col cols="12" md="3">
      <v-card class="pa-2" hover outlined @click="navigate('申請中')">
        <div class="d-flex align-center">
          <v-icon color="info" class="mr-2">mdi-progress-clock</v-icon>
          <div>
            <div class="text-caption">申請中</div>
            <div class="text-h6">{{ summary.requestCount }} 件</div>
          </div>
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" md="3">
      <v-card class="pa-2" hover outlined @click="navigate('差戻し')">
        <div class="d-flex align-center">
          <v-icon color="info" class="mr-2">mdi-arrow-u-left-top</v-icon>
          <div>
            <div class="text-caption">差戻し</div>
            <div class="text-h6">{{ summary.rejectedCount }} 件</div>
          </div>
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" md="3">
      <v-card class="pa-2" hover outlined @click="navigate('承認済み')">
        <div class="d-flex align-center">
          <v-icon color="info" class="mr-2">mdi-check-bold</v-icon>
          <div>
            <div class="text-caption">承認済み</div>
            <div class="text-h6">{{ summary.approvedCount }} 件</div>
          </div>
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" md="3">
      <v-card class="pa-2" hover outlined @click="navigate('同期エラー')">
        <div class="d-flex align-center">
          <v-icon color="info" class="mr-2">mdi-alert-circle</v-icon>
          <div>
            <div class="text-caption">同期エラー</div>
            <div class="text-h6">{{ summary.syncErrorCount }} 件</div>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useHrRecords } from '@/composables/useHrRecords'

const { hrRecords } = useHrRecords()
const router = useRouter()

const summary = computed(() => ({
  requestCount: hrRecords.value.filter(r => r.status === '申請中').length,
  rejectedCount: hrRecords.value.filter(r => r.status === '差戻し').length,
  approvedCount: hrRecords.value.filter(r => r.status === '承認済み').length,
  syncErrorCount: hrRecords.value.filter(r => r.status === '同期エラー').length
}))

function navigate(status: string) {
  router.push({ name: 'HrList', query: { status } })
}
</script>
