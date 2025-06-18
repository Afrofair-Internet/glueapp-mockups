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

          <v-btn block color="primary" @click="sendResetPassword">変更</v-btn>

          <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000">
            {{ snackbarText }}
          </v-snackbar>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const currentPassword = ref<string | null>('')
const newPassword = ref<string | null>('')
const confirmPassword = ref<string | null>('')
const showPassword = ref(false)
const snackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('success')

const router = useRouter()

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const sendResetPassword = async () => {
  try {
    if (newPassword.value !== confirmPassword.value) {
      snackbarText.value = '新しいパスワードが一致しません';
      snackbarColor.value = 'error';
      snackbar.value = true;
      return;
    }

    // ダミーAPI呼び出し
    await new Promise((resolve) => setTimeout(resolve, 1000))

    snackbarText.value = 'パスワードを変更しました';
    snackbarColor.value = 'success';
    snackbar.value = true;

    setTimeout(() => {
      router.push('/home')
    }, 1000)
  } catch (error) {
    snackbarText.value = 'パスワードの変更に失敗しました';
    snackbarColor.value = 'error';
    snackbar.value = true;
  }
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
