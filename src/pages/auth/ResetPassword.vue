<template>
  <v-container class="reset-wrapper" fluid>
    <v-row align="center" justify="center" class="full-height">
      <v-col cols="12" sm="8" md="6" lg="4" class="d-flex justify-center">
        <v-card class="reset-card" elevation="3" rounded="xl">
          <div class="text-center mb-6">
            <h2 class="text-h5 font-weight-bold">パスワード再設定</h2>
            <p class="text-caption mt-2">登録済みメールアドレスを入力してください</p>
          </div>

          <v-text-field
            v-model="email"
            label="メールアドレス"
            outlined
            dense
            prepend-inner-icon="mdi-email"
            class="mb-4"
          />

          <v-btn block color="primary" @click="sendResetEmail">再設定メール送信</v-btn>

          <div class="text-center mt-4">
            <RouterLink to="/login">ログインはこちら</RouterLink>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const email = ref('')

const sendResetEmail = () => {
  // 実際はAPI呼び出しを行う処理をここに実装
  console.log('送信されたメールアドレス:', email.value)
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
