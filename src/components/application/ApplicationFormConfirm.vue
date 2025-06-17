<!-- src/components/application/ApplicationFormConfirm.vue -->
<template>
  <v-card class="pa-6">
    <v-card-title>入力内容の確認</v-card-title>
    <v-divider class="my-4" />
    <v-card-text>
      <v-list dense>
        <v-list-item><strong>会社名：</strong>{{ form.companyName }}</v-list-item>
        <v-list-item><strong>カナ会社名：</strong>{{ form.kanaCompanyName }}</v-list-item>
        <v-list-item><strong>代表者名：</strong>{{ form.representative }}</v-list-item>
        <v-list-item><strong>郵便番号：</strong>{{ form.postalCode }}</v-list-item>
        <v-list-item><strong>都道府県：</strong>{{ form.prefecture }}</v-list-item>
        <v-list-item><strong>市区町村：</strong>{{ form.city }}</v-list-item>
        <v-list-item><strong>番地：</strong>{{ form.block }}</v-list-item>
        <v-list-item><strong>建物名：</strong>{{ form.building }}</v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
const {form} = defineProps<{
  form: {
    companyName: string;
    kanaCompanyName: string;
    representative: string;
    postalCode: string;
    prefecture: string;
    city: string;
    block: string;
    building: string;
  };
}>();
</script>
