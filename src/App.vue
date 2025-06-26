<template>
  <v-app>
    <router-view />

    <ScheduleDialog v-model="showScheduleDialog" />
  </v-app>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import ScheduleDialog from '@/components/sync/ScheduleDialog.vue'

const showScheduleDialog = ref(false)

provide('openScheduleDialog', () => {
  showScheduleDialog.value = true
})
</script>