<template>
  <v-container class="login-wrapper" fluid>
    <v-row align="center" justify="center" class="full-height">
      <v-col cols="12" sm="8" md="4" lg="3">
        <v-card class="login-card" elevation="3" rounded="xl">
          <div class="text-center mb-6">
            <h1 class="text-h4 font-weight-bold">GlueApp</h1>
          </div>
          <v-text-field
            v-model="contractId"
            label="契約ID"
            outlined
            prepend-inner-icon="mdi-tag"
            class="mb-3"
          />

          <v-text-field
            v-model="loginId"
            label="ログインID"
            outlined
            prepend-inner-icon="mdi-account"
            class="mb-3"
          />

          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="パスワード"
            outlined
            prepend-inner-icon="mdi-lock"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append-inner="togglePassword"
            class="mb-3"
          />

          <v-btn block color="primary" @click="$router.push('/home')">ログイン</v-btn>

          <div class="text-center mt-4">
            <RouterLink to="/resetpassword">パスワードを忘れた方はこちら</RouterLink>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const contractId = ref('')
const loginId = ref('')
const password = ref('')
const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

</script>

<style scoped>
a {
  color: #1976d2;
  text-decoration: none;
  font-size: 0.875rem;
}

.login-wrapper {
  background-color: #f0f2f5;
  height: 100vh;
  display: flex;
}

.login-card {
  padding: 40px;
  flex-direction: column;
  box-sizing: border-box;
}
</style>