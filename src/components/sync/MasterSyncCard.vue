<template>
  <v-card class="pa-4 d-flex flex-column justify-space-between" elevation="2" min-height="300px">
    <!-- タイトルとステータス -->
    <div class="d-flex align-center justify-space-between mb-2">
      <span class="text-subtitle-1 font-weight-medium">{{ service.label }}</span>
      <v-chip :color="getStatusColor(service)" size="small" text-color="white" variant="elevated">
        {{ getStatusLabel(service) }}
      </v-chip>
    </div>

    <!-- 最終同期日時 -->
    <div class="mb-1 text-body-2">最終同期：{{ service.lastSynced || '未同期' }}</div>

    <!-- ステータス別カウント -->
    <v-row dense no-gutters class="mb-2 flex-wrap" align="center">
      <v-col cols="auto" class="mr-2">
        <v-chip color="info" size="small" variant="outlined">
          <v-icon start size="small">mdi-file-clock</v-icon>
          申請中：{{ service.requestCount }} 件
        </v-chip>
      </v-col>
      <v-col cols="auto" class="mr-2">
        <v-chip color="error" size="small" variant="outlined">
          <v-icon start size="small">mdi-backspace</v-icon>
          差戻し：{{ service.rejectedCount }} 件
        </v-chip>
      </v-col>
      <v-col cols="auto" class="mr-2">
        <v-chip color="success" size="small" variant="outlined">
          <v-icon start size="small">mdi-check-bold</v-icon>
          承認済：{{ service.approvedCount }} 件
        </v-chip>
      </v-col>
      <v-col cols="auto">
        <v-chip color="red" size="small" variant="outlined">
          <v-icon start size="small">mdi-alert-circle</v-icon>
          突合エラー：{{ service.reconcileErrorCount || 0 }} 件
        </v-chip>
      </v-col>
    </v-row>

    <!-- エラー表示 -->
    <div v-if="service.errorMessage" class="text-body-2 text-error mb-2">
      <v-icon color="red" size="small" class="mr-1">mdi-close-circle</v-icon>
      {{ service.errorMessage }}
    </div>

    <!-- アクションボタン -->
    <v-row dense class="mt-2" align="center">
      <v-col cols="6">
        <v-btn
          class="sync-btn"
          variant="outlined"
          color="primary"
          block
          :disabled="service.approvedCount === 0"
          @click="$emit('view-diff', service.id)"
        >
          <v-icon left size="small">mdi-magnify</v-icon> 突合エラー確認
        </v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn
          class="sync-btn"
          variant="elevated"
          color="success"
          block
          :disabled="service.approvedCount === 0"
          @click="$emit('sync', service.id)"
        >
          <v-icon left size="small">mdi-upload</v-icon> 送信
        </v-btn>
      </v-col>
    </v-row>


  </v-card>
</template>

<script setup lang="ts">
import type { MasterService } from '@/types/masterService'

const props = defineProps<{ service: MasterService }>()

const getStatusLabel = (s: MasterService) => {
  if (s.reconcileErrorCount && s.reconcileErrorCount > 0) return 'エラー'
  if (
    (s.requestCount && s.requestCount > 0) ||
    (s.rejectedCount && s.rejectedCount > 0) ||
    (s.approvedCount && s.approvedCount > 0) ||
    (s.reconcileDiffCount && s.reconcileDiffCount > 0)
  ) {
    return '未同期データあり'
  }
  return '正常'
}

const getStatusColor = (s: MasterService) => {
  if (s.reconcileErrorCount && s.reconcileErrorCount > 0) return 'red'
  if (
    (s.requestCount && s.requestCount > 0) ||
    (s.rejectedCount && s.rejectedCount > 0) ||
    (s.approvedCount && s.approvedCount > 0) ||
    (s.reconcileDiffCount && s.reconcileDiffCount > 0)
  ) {
    return 'orange'
  }
  return 'blue'
}
</script>

<style scoped>
.v-card {
  min-width: 280px;
}
</style>
