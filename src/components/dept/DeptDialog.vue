<template>
  <v-dialog v-model="internalModelValue" max-width="700px">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>{{ dialogTitle }}</span>
        <v-btn
          v-if="props.record && isView && !props.readonly"
          icon
          variant="text"
          @click="enableEdit"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-form ref="formRef" v-model="isValid">
          <v-row dense>
            <v-col cols="6">
              <v-select v-model="localRecord.operationStatus" label="運営状態" :items="['運営中', '休止']" :readonly="isView" />
            </v-col>
            <v-col cols="6">
              <v-select v-model="localRecord.approvalStatus" label="承認ステータス" :items="['申請中', '承認済み']" :readonly="isView" />
            </v-col>

            <v-col cols="6">
              <v-text-field v-model="localRecord.departmentCode" label="部署コード" :readonly="isView" required />
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="localRecord.departmentName" label="部署名" :readonly="isView" required />
            </v-col>

            <v-col cols="6">
              <v-select
                v-model="localRecord.parentDepartment"
                :items="parentDepartment"
                label="親部署"
                :readonly="isView"
                item-title="label"
                item-value="value"
              />
            </v-col>

            <v-col cols="6">
              <v-select
                v-model="localRecord.departmentType"
                :items="departmentTypeOptions"
                label="部署種別"
                :readonly="isView"
                item-title="label"
                item-value="value"
              />
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="localRecord.installedAt"
                label="設置日"
                type="date"
                :readonly="isView"
              />
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="localRecord.abolishedAt"
                label="廃止日"
                type="date"
                :readonly="isView"
              />
            </v-col>

            <v-col cols="12">
              <v-text-field v-model="localRecord.location" label="所在地" :readonly="isView" />
            </v-col>

            <v-col cols="12">
              <v-text-field v-model="localRecord.manager" label="責任者" :readonly="isView" />
            </v-col>

            <v-col cols="12">
              <v-text-field v-model="localRecord.zip" label="郵便番号" :readonly="isView" />
            </v-col>

            <v-col cols="12">
              <v-text-field v-model="localRecord.address" label="住所" :readonly="isView" />
            </v-col>

            <v-col cols="12">
              <v-textarea v-model="localRecord.remarks" label="備考" :readonly="isView" rows="3" />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn @click="close">閉じる</v-btn>
        <v-btn v-if="isEdit" color="primary" @click="submit" :disabled="!isValid">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { DeptRecord } from '@/types/dept'

const props = defineProps<{ modelValue: boolean; record?: DeptRecord | null; readonly?: boolean }>()
const emit = defineEmits<{ (e: 'update:modelValue', val: boolean): void; (e: 'submit', val: DeptRecord): void }>()

const internalModelValue = ref(props.modelValue)
watch(() => props.modelValue, val => (internalModelValue.value = val))
watch(internalModelValue, val => emit('update:modelValue', val))

const isEdit = ref(false)
const isView = computed(() => props.readonly || !isEdit.value)

const dialogTitle = computed(() => {
  if (!props.record) return '部署情報登録'
  return isEdit.value ? '部署情報編集' : '部署情報詳細'
})

const enableEdit = () => { isEdit.value = true }

const formRef = ref()
const isValid = ref(true)

const parentDepartment = [
  { value: '', label: '親部署なし' },
  { value: '1000', label: '営業部' },
  { value: '1010', label: '営業第一課' },
  { value: '2000', label: '開発部' },
  { value: '2010', label: '開発グループ' },
  { value: '3000', label: '管理部' },
  { value: '4000', label: '経営本部' },
  { value: '5000', label: 'プロジェクト推進チーム' },
]

const departmentTypeOptions = [
  { value: 'headquarters', label: '本部' },
  { value: 'division', label: '事業部' },
  { value: 'department', label: '部' },
  { value: 'section', label: '課' },
  { value: 'group', label: 'グループ' },
  { value: 'project', label: 'プロジェクト' }
]

const today = () => new Date().toISOString().substring(0, 10)

const localRecord = ref<DeptRecord>({
  departmentCode: '',
  departmentName: '',
  departmentKana: '',
  parentDepartment: '',
  departmentType: '',
  installedAt: today(),
  abolishedAt: '',
  location: '',
  manager: '',
  zip: '',
  address: '',
  remarks: '',
  operationStatus: '運営中',
  approvalStatus: '申請中'
})


watch(() => props.record, val => {
  if (!val) {
    isEdit.value = true
    localRecord.value = {
      departmentCode: '',
      departmentName: '',
      departmentKana: '',
      parentDepartment: '',
      departmentType: '',
      installedAt: today(),
      abolishedAt: '',
      location: '',
      manager: '',
      zip: '',
      address: '',
      remarks: '',
      operationStatus: '運営中',
      approvalStatus: '申請中'
    }
  } else {
    localRecord.value = JSON.parse(JSON.stringify(val))
    isEdit.value = false
  }
}, { immediate: true })

function close() {
  internalModelValue.value = false
  isEdit.value = false
}

function submit() {
  if (formRef.value?.validate()) {
    emit('submit', localRecord.value)
    internalModelValue.value = false
    isEdit.value = false
  }
}
</script>
