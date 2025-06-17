<template>
  <v-navigation-drawer
    :model-value="drawer"
    @update:model-value="emit('update:drawer', $event)"
    app
    permanent
    color="#f5f5f5"
  >
    <v-list nav dense>

      <!-- ユーザー情報 -->
      <v-list-item class="pa-3">
        <v-list-item-content>
          <v-item-title class="text-subtitle-1 font-weight-bold">愚龍 亜伏</v-item-title>
          <v-list-item-subtitle>glue@afrofair.jp</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <!-- アカウント操作 -->
      <v-list-item @click="navigate('/login')">
        <v-list-item-icon><v-icon>mdi-logout</v-icon></v-list-item-icon>
        <v-list-item-title>ログアウト</v-list-item-title>
      </v-list-item>
      <v-list-item @click="navigate('/changepassword')">
        <v-list-item-icon><v-icon>mdi-lock-reset</v-icon></v-list-item-icon>
        <v-list-item-title>パスワード変更</v-list-item-title>
      </v-list-item>

      <v-divider class="my-2" />

      <!-- メニュー項目 -->
      <template v-for="item in menuItems" :key="item.label">
        <!-- サブメニューあり（開閉あり） -->
        <v-list-group
          v-if="item.children"
          v-model:opened="opened[item.label]"
          no-action
        >
          <template #activator="{ props }">
            <v-list-item v-bind="props">
              <v-list-item-icon class="mr-3">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.label }}</v-list-item-title>
            </v-list-item>
          </template>

          <v-list-item
            v-for="child in item.children"
            :key="child.path"
            @click="navigate(child.path)"
            class="pl-8"
          >
            <v-list-item-title>{{ child.label }}</v-list-item-title>
          </v-list-item>
        </v-list-group>

        <!-- 通常メニュー -->
        <v-list-item
          v-else
          @click="navigate(item.path!)"
        >
          <v-list-item-icon class="mr-3"><v-icon>{{ item.icon }}</v-icon></v-list-item-icon>
          <v-list-item-title>{{ item.label }}</v-list-item-title>
        </v-list-item>
      </template>

    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const { drawer } = defineProps<{ drawer: boolean }>()
const emit = defineEmits<{ (e: 'update:drawer', value: boolean): void }>()

const router = useRouter()
const navigate = (path: string) => {
  router.push(path)
  emit('update:drawer', false)
}

// 構造化されたメニュー
type MenuItem = {
  label: string
  icon: string
  path?: string
  children?: { label: string; path: string }[]
}

const menuItems: MenuItem[] = [
  { path: '/home', label: 'ホーム', icon: 'mdi-home' },
  { path: '/userlist', label: 'ユーザー管理', icon: 'mdi-account-multiple' },
  {
    label: '人事マスタ',
    icon: 'mdi-account-tie',
    children: [
      { label: '人事マスタ一覧', path: '/hrlist' },
      { label: '人事マスタ承認', path: '/hrapproval' },
    ]
  },
  {
    label: '部署マスタ',
    icon: 'mdi-sitemap',
    children: [
      { label: '部署マスタ一覧', path: '/hrlist' },
      { label: '部署マスタ承認', path: '/hrapproval' },
    ]
  },
  {
    label: 'マスタ管理',
    icon: 'mdi-format-list-bulleted-type',
    children: [
      { label: 'コード区分マスタ', path: '/codetypelist' },
      { label: 'コードマスタ', path: '/codelist' },
    ]
  },
  { path: '/mappinglist', label: 'マッピング管理', icon: 'mdi-link-variant' },
  { path: '/attendancelist', label: '勤怠管理', icon: 'mdi-clock-outline' },
  { path: '/expenselist', label: '経費精算管理', icon: 'mdi-wallet' },
  { path: '/saasselection', label: 'SAAS選択', icon: 'mdi-cloud-outline' },
]

// 開閉状態を項目ごとに管理
const opened = ref<Record<string, boolean>>(
  Object.fromEntries(menuItems.filter(i => i.children).map(i => [i.label, false]))
)

</script>
