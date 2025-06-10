<template>
  <v-app>
    <AppHeader @toggle-drawer="drawer = !drawer" />
    <SideMenu :drawer="drawer" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import SideMenu from '@/components/common/SideMenu.vue'
import AppHeader from '@/components/common/AppHeader.vue'
import { ref } from 'vue'
const drawer = ref(false)
</script>
