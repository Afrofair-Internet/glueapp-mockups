<template>
  <v-container>
    <h2 class="text-h5 font-weight-bold mb-4">同期エラー詳細</h2>
    <v-card class="pa-4">
      <v-row>
        <v-col cols="12">
          <strong>サービスID：</strong> {{ serviceId }}
        </v-col>
        <v-col cols="12">
          <strong>エラー内容：</strong>
          <div class="text-error mt-2">
            <!-- 仮の固定メッセージ -->
            API認証エラーが発生しました。認証情報を再確認してください。
          </div>
        </v-col>
      </v-row>
    </v-card>
    <div class="mt-4 text-right">
      <v-btn color="primary" @click="goBack">戻る</v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const serviceId = route.params.serviceId as string

const goBack = () => {
  router.push({ name: 'Home' })
}
</script>
