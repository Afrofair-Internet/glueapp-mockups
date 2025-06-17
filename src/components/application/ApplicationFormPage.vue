<!-- src/components/application/ApplicationFormPage1.vue -->
<template>
  <v-form v-model="valid">
    <v-row dense>
      <v-col cols="12" md="6">
        <v-text-field v-model="form.companyName" label="会社名" required />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field v-model="form.kanaCompanyName" label="カナ会社名" required />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field v-model="form.representative" label="代表者名" required />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field
          v-model="form.postalCode"
          label="郵便番号"
          hint="例: 732-0817"
          persistent-hint
        />
      </v-col>

      <v-col cols="12" md="6">
        <PrefectureSelect v-model="form.prefecture" required />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field v-model="form.city" label="市区町村" />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field v-model="form.block" label="番地" />
      </v-col>

      <v-col cols="12" md="6">
        <v-text-field v-model="form.building" label="建物名" />
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import PrefectureSelect from '@/components/common/PrefectureSelect.vue';

const valid = ref(true);

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
