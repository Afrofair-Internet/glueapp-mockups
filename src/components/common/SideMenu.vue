<template>
  <v-navigation-drawer
    :model-value="drawer"
    @update:model-value="emit('update:drawer', $event)"
    app
    permanent
  >
    <v-list nav dense>
      <v-list-item
        v-for="item in menuItems"
        :key="item.path"
        @click="navigate(item.path)"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.label }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const { drawer } = defineProps<{ drawer: boolean }>()
const emit = defineEmits<{ (e: 'update:drawer', value: boolean): void }>()

import { useRouter } from 'vue-router'
const router = useRouter()

const navigate = (path: string) => {
  router.push(path)
  emit('update:drawer', false)
}

const menuItems = [
  { path: '/home', label: 'ホーム', icon: 'mdi-home' },
  { path: '/entryform', label: '入力フォーム', icon: 'mdi-form-select' },
  { path: '/entryconfirmation', label: '確認画面', icon: 'mdi-check' },
  { path: '/entrycompletion', label: '完了画面', icon: 'mdi-check-circle' },
  { path: '/login', label: 'ログイン', icon: 'mdi-login' },
]
</script>
