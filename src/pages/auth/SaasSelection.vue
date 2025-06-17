<template>
  <v-container>
    <v-card elevation="2" class="pa-4">
      <v-card-title class="blue white--text">
        <v-icon left>mdi-domain</v-icon>
        SaaS選択
      </v-card-title>

      <v-card-text class="overflow-auto">
        <table class="saas-table">
          <thead>
            <tr>
              <th rowspan="2" class="role-col">サービス</th>
              <template v-for="category in categories" :key="category.name">
                <th :colspan="category.services.length" class="category-cell">
                  {{ category.name }}
                </th>
              </template>
            </tr>
            <tr>
              <template v-for="category in categories" :key="category.name">
                <th
                  v-for="service in category.services"
                  :key="service"
                  :class="['vertical-header', { disabled: disabledServices.includes(service) }]"
                >
                  {{ service }}
                </th>
              </template>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="role-col"></td>
              <template v-for="category in categories" :key="category.name">
                <td
                  v-for="service in category.services"
                  :key="service"
                  :class="[
                    'checkbox-cell',
                    { disabled: disabledServices.includes(service) }
                   ]"
                >
                  <v-checkbox
                    v-model="selections[service]"
                    :disabled="disabledServices.includes(service)"
                    hide-details
                    density="compact"
                    class="mx-auto"
                  />
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="submit">登録</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Category = {
  name: string
  services: string[]
}

const categories: Category[] = [
  { name: '勤怠', services: ['Jinjer勤怠', 'Touch On Time'] },
  { name: '給与', services: ['オフィスステーション', 'Jinjer給与', 'freee人事労務'] },
  { name: '経費精算', services: ['ジョブカン経費精算', '楽楽精算'] },
  { name: '会計', services: ['freee会計', '楽楽明細'] },
  { name: '販売', services: ['インフォマート', 'freee販売','楽楽販売'] },
  { name: 'グループウェア', services: ['Google Workspace','J-MOTTO', 'kintone'] },
]

const disabledServices = ['Touch On Time', 'Jinjer給与', '楽楽精算', '楽楽明細', 'インフォマート', '楽楽販売', 'J-MOTTO']


const selections = ref<Record<string, boolean>>(
  Object.fromEntries(categories.flatMap(c => c.services).map(s => [s, false]))
)

const submit = () => {
  console.log('選択内容:', selections.value)
}
</script>

<style scoped>
.saas-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  border: 1px solid #ccc;
}

.saas-table th,
.saas-table td {
  border: 1px solid #ccc;
  text-align: center;
  padding: 6px;
}

.category-cell {
  background-color: #f4f6fa;
  font-weight: bold;
}

.vertical-header {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  white-space: nowrap;
  min-height: 100px;
  padding: 8px 4px;
  font-weight: bold;
  background-color: white;
}

.vertical-header.disabled {
  background-color: #f5f5f5;
  color: #aaa;
  font-weight: normal;
}

.checkbox-cell {
  height: 60px;
  vertical-align: middle;
}

.role-col {
  width: 80px;
  background-color: #fafafa;
  font-weight: bold;
}
</style>
