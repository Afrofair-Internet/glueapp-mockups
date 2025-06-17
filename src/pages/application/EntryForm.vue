<template>
  <v-container class="py-8">
    <v-card class="pa-6" elevation="3" rounded="xl">

      <!-- Vuetifyのステッパー -->
      <v-stepper v-model="step">
        <!-- ヘッダー -->
        <v-stepper-header>
          <v-stepper-item :value="1" title="お客様情報" :complete="step > 1" />
          <v-stepper-item :value="2" title="確認" :complete="step > 2" />
          <v-stepper-item :value="3" title="完了" />
        </v-stepper-header>

        <!-- ステップ内容 -->
        <v-stepper-window>
          <v-stepper-window-item :value="1">
            <ApplicationFormPage :form="form" />
          </v-stepper-window-item>
          <v-stepper-window-item :value="2">
            <ApplicationFormConfirm :form="form" />
          </v-stepper-window-item>
          <v-stepper-window-item :value="3">
            <ApplicationFormComplete />
          </v-stepper-window-item>
        </v-stepper-window>
      </v-stepper>

      <!-- ボタン -->
      <div class="mt-6 d-flex justify-space-between align-center">
        <v-btn variant="text" :disabled="step === 1" @click="step--">戻る</v-btn>

        <v-spacer />

        <v-btn v-if="step < 2" color="primary" @click="step++">次へ</v-btn>
        <v-btn v-else-if="step === 2" color="primary" @click="submit">申込む</v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ApplicationFormPage from '@/components/application/ApplicationFormPage.vue';
import ApplicationFormConfirm from '@/components/application/ApplicationFormConfirm.vue';
import ApplicationFormComplete from '@/components/application/ApplicationFormComplete.vue';

const step = ref(1)

const form = ref({
  companyName: '',
  kanaCompanyName: '',
  representative: '',
  postalCode: '',
  prefecture: '',
  city: '',
  block: '',
  building: '',
})

const submit = () => {
  console.log('送信内容：', form.value)
  step.value = 3
}
</script>

<style>
/* 通常ステップ */
.v-stepper-item .v-stepper-item__avatar {
  background-color: #e0e0e0;
  color: #424242;
}

/* 完了ステップ） */
.v-stepper-item--complete .v-stepper-item__avatar {
  background-color: #4caf50;
  color: white;
}

/* 現在のステップ */
.v-stepper-item--selected .v-stepper-item__avatar {
  background-color: #1976d2;
  color: white;
}
</style>

