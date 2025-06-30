<template>
  <v-container>
    <h2 class="text-h5 font-weight-bold mb-4">突合差分詳細</h2>

    <v-card class="pa-4 mb-6">
      <v-row>
        <v-col cols="12">
          <strong>サービスID：</strong> {{ serviceId }}
        </v-col>
        <v-col cols="12">
          <strong>差分件数：</strong> {{ diffList.length }} 件
        </v-col>
      </v-row>
    </v-card>

    <v-table class="elevation-1 mb-4">
      <thead>
        <tr>
          <th>項目名</th>
          <th>GlueApp</th>
          <th>jinjer</th>
          <th>ジョブカン</th>
          <th>オフィスステーション</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in diffList" :key="row.field">
          <td>{{ row.label }}</td>
          <td>{{ row.values.glueApp }}</td>
          <td :class="getDiffClass(row, 'jinjer')">{{ row.values.jinjer }}</td>
          <td :class="getDiffClass(row, 'jobcan')">{{ row.values.jobcan }}</td>
          <td :class="getDiffClass(row, 'officeStation')">{{ row.values.officeStation }}</td>
        </tr>
      </tbody>
    </v-table>

    <div class="text-right">
      <v-btn color="primary" @click="goBack">戻る</v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const serviceId = route.params.serviceId as string

// 仮の差分データ
const diffList = ref([
  {
    field: 'name',
    label: '氏名',
    values: {
      glueApp: '山田 太郎',
      jinjer: '山田 太朗',
      jobcan: '山田 太郎',
      officeStation: '山田 太郎'
    }
  },
  {
    field: 'department',
    label: '部署',
    values: {
      glueApp: '営業部',
      jinjer: '営業本部',
      jobcan: '営業部',
      officeStation: '営業課'
    }
  },
  {
    field: 'employmentType',
    label: '雇用区分',
    values: {
      glueApp: '正社員',
      jinjer: '契約社員',
      jobcan: '正社員',
      officeStation: '契約社員'
    }
  }
])

const getDiffClass = (row: any, system: keyof typeof row.values) => {
  const master = row.values.glueApp
  const compare = row.values[system]
  return master !== compare ? 'text-orange font-weight-bold' : ''
}

const goBack = () => {
  router.push({ name: 'Home' })
}
</script>
