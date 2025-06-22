<template>
  <v-card class="pa-4 d-flex flex-column justify-space-between" elevation="2" min-height="280px">
    <!-- タイトルとステータス -->
    <div class="d-flex align-center justify-space-between mb-2">
      <span class="text-subtitle-1 font-weight-medium">{{ service.label }}</span>
      <v-chip :color="getStatusColor(service)" size="small" text-color="white">
        {{ getStatusLabel(service) }}
      </v-chip>
    </div>

    <!-- 最終同期と突合結果 -->
    <div class="mb-2">
      <div class="text-body-2">最終同期：{{ service.lastSynced || '未同期' }}</div>
      <div class="text-body-2 mt-1">
        突合結果：
        <v-icon v-if="(service.reconcileDiffCount ?? 0) > 0" color="orange" size="small" class="mr-1">
          mdi-alert-circle
        </v-icon>
        <v-icon v-else color="green" size="small" class="mr-1">
          mdi-check-circle
        </v-icon>
        {{ (service.reconcileDiffCount ?? 0) > 0 ? `差分あり（${service.reconcileDiffCount} 件）` : '一致' }}
      </div>
    </div>

    <!-- エラー -->
    <div v-if="service.errorMessage" class="text-body-2 text-error mb-2">
      <v-icon color="red" size="small" class="mr-1">mdi-close-circle</v-icon>
      {{ service.errorMessage }}
    </div>

    <!-- アクションボタン -->
    <div class="d-flex flex-column align-center gap-2 mt-auto">
      <v-btn
        variant="outlined"
        color="primary"
        size="small"
        block
        @click="$emit('view-diff', service.id)"
      >
        <v-icon left size="small">mdi-magnify</v-icon> 差分を確認
      </v-btn>

      <v-icon size="16" color="grey">mdi-arrow-down-thin</v-icon>

      <v-btn
        variant="outlined"
        color="secondary"
        size="small"
        block
        @click="$emit('reconcile', service.id)"
      >
        <v-icon left size="small">mdi-refresh</v-icon> 再突合
      </v-btn>

      <v-icon size="16" color="grey">mdi-arrow-down-thin</v-icon>

      <v-btn
        variant="outlined"
        color="success"
        size="small"
        block
        :disabled="!canSync"
        @click="$emit('sync', service.id)"
      >
        <v-icon left size="small">mdi-upload</v-icon> 同期（SaaSへ反映）
      </v-btn>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type SyncStatus = 'success' | 'error' | 'not_synced'

type Service = {
  id: string
  label: string
  syncStatus: SyncStatus
  lastSynced: string | null
  reconcileDiffCount?: number
  errorMessage?: string
}

const props = defineProps<{ service: Service }>()
const service = props.service

const getStatusLabel = (s: Service) => {
  if (s.errorMessage) return 'エラー'
  if (s.reconcileDiffCount && s.reconcileDiffCount > 0) return '確認が必要'
  return '正常'
}

const getStatusColor = (s: Service) => {
  if (s.errorMessage) return 'red'
  if (s.reconcileDiffCount && s.reconcileDiffCount > 0) return 'orange'
  return 'blue'
}

const canSync = computed(() => !service.reconcileDiffCount || service.reconcileDiffCount === 0)
</script>
