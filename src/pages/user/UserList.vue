<template>
  <v-container>
    <v-card elevation="2" class="pa-4">

      <!-- タイトルと新規登録ボタン -->
      <div class="d-flex justify-space-between align-center mb-4">
        <h2 class="text-h6 font-weight-bold">ユーザー一覧</h2>
        <v-btn color="primary" @click="onRegister">新規登録</v-btn>
      </div>

      <!-- ユーザー一覧テーブル -->
      <v-table density="comfortable">
        <thead>
          <tr class="table-header">
            <th>No</th>
            <th>ユーザーID</th>
            <th>ユーザー名</th>
            <th>ユーザー名（カナ）</th>
            <th>メールアドレス</th>
            <th>権限</th>
            <th>最終ログイン</th>
            <th class="text-center">詳細</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in users" :key="user.id">
            <td>{{ index + 1 }}</td>
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.kana }}</td>
            <td><a :href="`mailto:${user.email}`">{{ user.email }}</a></td>
            <td>{{ user.role }}</td>
            <td>{{ user.lastLogin }}</td>
            <td class="text-center">
              <v-btn variant="text" icon @click="showDetail(user)">
                <v-icon>mdi-information</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-container>

  <UserDialog
    v-model="showUserDialog"
    :mode="dialogMode"
    :user="selectedUser"
    @submit="handleUserSubmit"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UserDialog from '@/components/user/userDialog.vue'
import type { User } from '../../types/user'

const users = ref<User[]>([
  {
    id: 'user01',
    name: 'user1',
    kana: 'ユーザー1',
    email: 'user01@example.com',
    role: 'admin',
    lastLogin: '2025/6/2 9:12',
  },
  {
    id: 'user02',
    name: 'user2',
    kana: 'ユーザー2',
    email: 'user02@example.com',
    role: 'admin',
    lastLogin: '2025/5/4 11:16',
  },
  {
    id: 'user03',
    name: 'user3',
    kana: 'ユーザー3',
    email: 'user03@example.com',
    role: 'admin',
    lastLogin: '2025/5/22 9:41',
  },
  {
    id: 'user04',
    name: 'user4',
    kana: 'ユーザー4',
    email: 'user04@example.com',
    role: 'user',
    lastLogin: '2025/4/26 15:42',
  },
])

// 状態管理
const showUserDialog = ref(false)
const dialogMode = ref<'create' | 'edit' | 'view'>('view')
const selectedUser = ref<User | null>(null)

// 新規登録
const onRegister = () => {
  selectedUser.value = {
    id: '',
    name: '',
    kana: '',
    email: '',
    role: 'user',
    lastLogin: '',
  }
  dialogMode.value = 'create'
  showUserDialog.value = true
}

// 詳細表示
const showDetail = (user: User) => {
  selectedUser.value = {...user}
  dialogMode.value = 'view'
  showUserDialog.value = true
}

// 登録・編集完了
const handleUserSubmit = (user: User) => {
  if (dialogMode.value === 'create') {
    users.value.push({ ...user, id: `user${users.value.length + 1}` })
    alert('ユーザーを登録しました')
  } else {
    const index = users.value.findIndex(u => u.id === user.id)
    if (index !== -1) {
      users.value[index] = { ...user }
      alert('ユーザーを更新しました')
    }
  }
}

</script>

<style scoped>
.table-header {
  background-color: #fdeee5;
  font-weight: bold;
}
</style>
