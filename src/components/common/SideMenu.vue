<template>
  <v-navigation-drawer
    :model-value="drawer"
    @update:model-value="emit('update:drawer', $event)"
    app
    permanent
    color="#f5f5f5"
  >
    <v-list nav density="compact">
      <!-- ユーザー情報 -->
      <v-list-item
        class="pa-3"
        title="愚龍 亜伏"
        subtitle="glue@afrofair.jp"
      />

      <!-- アカウント操作 -->
      <v-list-item
        @click="navigate('/login')"
        prepend-icon="mdi-logout"
        title="ログアウト"
      />
      <v-list-item
        @click="navigate('/changepassword')"
        prepend-icon="mdi-lock-reset"
        title="パスワード変更"
      />

      <v-divider class="my-2" />

      <!-- メニュー項目 -->
      <template v-for="item in menuItems" :key="item.label">
        <!-- サブメニューあり -->
        <v-list-group
          v-if="item.children"
          v-model:opened="opened[item.label]"
          no-action
        >
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              :title="item.label"
              :prepend-icon="item.icon"
            />
          </template>
          <v-list-item
            v-for="child in item.children"
            :key="child.path"
            @click="navigate(child.path)"
            :title="child.label"
            class="pl-8"
          />
        </v-list-group>

        <!-- 単独メニュー -->
        <v-list-item
          v-else
          @click="navigate(item.path!)"
          :title="item.label"
          :prepend-icon="item.icon"
        />
      </template>
    </v-list>

    <!-- 設定 -->
    <v-list nav dense class="mt-auto">
      <v-divider class="mb-2" />
      <v-list-group
        v-model:opened="opened['設定']"
        no-action
      >
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            title="設定"
            prepend-icon="mdi-cog"
          />
        </template>

        <v-list-item
          v-for="item in settingItems"
          :key="item.path"
          @click="navigate(item.path)"
          :title="item.label"
          class="pl-8"
        />
      </v-list-group>
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
      { label: '人事マスタ一覧', path: '/hr/list' },
      { label: '人事マスタ承認', path: '/hr/approval' },
    ]
  },
  {
    label: '部署マスタ',
    icon: 'mdi-sitemap',
    children: [
      { label: '部署マスタ一覧', path: '/dept/list' },
      { label: '部署マスタ承認', path: '/dept/approval' },
    ]
  },
  { path: '/attendancelist', label: '勤怠管理', icon: 'mdi-clock-outline' },
  { path: '/expenselist', label: '経費精算管理', icon: 'mdi-wallet' }
]

const settingItems = [
  { label: 'コード区分マスタ', path: '/codetypelist' },
  { label: 'コードマスタ', path: '/codelist' },
  { label: 'マッピング管理', path: '/mappinglist' },
  { label: 'SAAS選択', path: '/saasselection' },
]

const opened = ref<Record<string, boolean>>(
  Object.fromEntries(menuItems.filter(i => i.children).map(i => [i.label, false]))
)
</script>
