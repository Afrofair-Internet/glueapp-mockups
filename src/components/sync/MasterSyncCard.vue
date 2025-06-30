<template>
  <v-card class="pa-4 d-flex flex-column justify-space-between" elevation="2" min-height="220px">
    <!-- タイトルとステータス -->
    <div class="d-flex align-center justify-space-between mb-2">
      <span class="text-subtitle-1 font-weight-medium">{{ service.label }}</span>
      <v-chip :color="getStatusColor(service)" size="small" text-color="white" variant="elevated">
        {{ getStatusLabel(service) }}
      </v-chip>
    </div>

    <!-- 最終同期日時 -->
    <div class="mb-1 text-body-2">最終同期：{{ service.lastSynced || '未同期' }}</div>

    <!-- エラー表示 -->
    <div class="text-h8 mb-16" :class="{ 'text-error': !!service.errorMessage }" style="min-height: 1em">
      <template v-if="service.errorMessage">
        <v-icon color="red" size="small" class="mr-1">mdi-close-circle</v-icon>
        {{ service.errorMessage }}
      </template>
    </div>

    <!-- 送信ボタン -->

  </v-card>
</template>

<script setup lang="ts">
import type { MasterService } from '@/types/masterService'

const { service } = defineProps<{ service: MasterService }>()

const getStatusLabel = (s: MasterService) => {
  if (s.reconcileErrorCount && s.reconcileErrorCount > 0) {
    return '同期エラー'
  }
  if (s.reconcileDiffCount && s.reconcileDiffCount > 0) {
    return '差分あり'
  }
  return '同期完了'
}

const getStatusColor = (s: MasterService) => {
  if (s.reconcileErrorCount && s.reconcileErrorCount > 0) {
    return 'red'
  }
  if (s.reconcileDiffCount && s.reconcileDiffCount > 0) {
    return 'orange'
  }
  return 'blue'
}
</script>

<style scoped>
.clickable-chip {
  cursor: pointer;
  transition: background-color 0.2s;
}
.clickable-chip:hover {
  background-color: #e3f2fd;
}
</style>
