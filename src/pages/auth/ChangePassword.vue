<template>
  <v-container class="reset-wrapper" fluid>
    <v-row align="center" justify="center" class="full-height">
      <v-col cols="12" sm="8" md="6" lg="4" class="d-flex justify-center">
        <v-card class="reset-card" elevation="3" rounded="xl">
          <div class="text-center mb-6">
            <h2 class="text-h5 font-weight-bold">パスワード変更</h2>
          </div>

          <v-text-field
            v-model="currentPassword"
            label="現在のパスワード"
            type="password"
            outlined
            dense
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="togglePassword"
            prepend-inner-icon="mdi-lock"
            class="mb-4"
          />

          <v-text-field
            v-model="newPassword"
            label="新しいパスワード"
            type="password"
            outlined
            dense
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="togglePassword"
            prepend-inner-icon="mdi-lock"
            class="mb-4"
          />

          <v-text-field
            v-model="confirmPassword"
            label="新しいパスワード（確認）"
            type="password"
            outlined
            dense
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="togglePassword"
            prepend-inner-icon="mdi-lock"
            class="mb-4"
          />

          <v-btn block color="primary" @click="sendResetPasswordd">変更</v-btn>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const sendResetPasswordd = () => {
  // 実際はAPI呼び出しを行う処理をここに実装
  // メール送信後に通知や画面遷移などを追加可能
}
</script>

<style scoped>
.reset-wrapper {
  background-color: #f0f2f5;
  height: 100vh;
  display: flex;
}

.reset-card {
  width: 400px;
  padding: 40px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

a {
  color: #1976d2;
  text-decoration: none;
  font-size: 0.875rem;
}
</style>
