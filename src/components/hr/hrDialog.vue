<template>
  <v-dialog v-model="internalModelValue" max-width="600px">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>{{ dialogTitle }}</span>
        <v-btn
          v-if="props.record && !isEdit"
          icon
          variant="text"
          @click="enableEdit"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-form ref="formRef" v-model="isValid">
          <v-text-field v-model="localRecord.employeeId" label="従業員ID" :readonly="isView" required />
          <v-text-field v-model="localRecord.employeeCode" label="従業員コード" :readonly="isView" required />
          <v-text-field v-model="localRecord.lastName" label="姓" :readonly="isView" required />
          <v-text-field v-model="localRecord.firstName" label="名" :readonly="isView" required />
          <v-text-field v-model="localRecord.lastNameKana" label="姓（カナ）" :readonly="isView" required />
          <v-text-field v-model="localRecord.firstNameKana" label="名（カナ）" :readonly="isView" required />
          <v-text-field v-model="localRecord.fullNameNote" label="姓名備考" :readonly="isView" />
          <v-select v-model="localRecord.gender" label="性別" :items="['男性', '女性']" :readonly="isView" required />
          <v-text-field v-model="localRecord.birthDate" label="生年月日" type="date" :readonly="isView" />

          <v-select v-model="localRecord.department" label="所属" :items="['総務部', '営業部', '開発部']" :readonly="isView" />
          <v-select v-model="localRecord.employmentType" label="勤務形態" :items="['正社員', '契約社員', '派遣社員']" :readonly="isView" />
          <v-select v-model="localRecord.workStatus" label="在籍状態" :items="['在籍中', '退職']" :readonly="isView" />
          <v-text-field v-model="localRecord.hireDate" label="入社年月日" type="date" :readonly="isView" />
          <v-text-field v-model="localRecord.retireDate" label="退職年月日" type="date" :readonly="isView" />

          <v-text-field v-model="localRecord.phoneType" label="電話種別" :readonly="isView" />
          <v-text-field v-model="localRecord.phoneNumber" label="電話番号" :readonly="isView" />
          <v-text-field v-model="localRecord.faxNumber" label="FAX番号" :readonly="isView" />
          <v-text-field v-model="localRecord.email" label="メールアドレス" :readonly="isView" />

          <v-text-field v-model="localRecord.addressType" label="世帯主（続柄）" :readonly="isView" />
          <v-text-field v-model="localRecord.zip" label="郵便番号" :readonly="isView" />
          <v-col cols="6">
            <PrefectureSelect v-model="localRecord.prefecture" :readonly="isView" required />
          </v-col>
          <v-text-field v-model="localRecord.city" label="市区町村" :readonly="isView" />
          <v-text-field v-model="localRecord.cityKana" label="市区町村（カナ）" :readonly="isView" />
          <v-text-field v-model="localRecord.address1" label="住所1（番地）" :readonly="isView" />
          <v-text-field v-model="localRecord.address2" label="住所2（建物）" :readonly="isView" />
          <v-text-field v-model="localRecord.address1Kana" label="住所1（カナ）" :readonly="isView" />
          <v-text-field v-model="localRecord.address2Kana" label="住所2（カナ）" :readonly="isView" />
          <v-text-field v-model="localRecord.approvalStatus" label="承認ステータス" readonly outlined />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn @click="close">閉じる</v-btn>
        <v-btn v-if="!isView" color="primary" @click="submit" :disabled="!isValid">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { HrRecord } from '../../types/hr'
import PrefectureSelect from '@/components/common/PrefectureSelect.vue';

const props = defineProps<{ modelValue: boolean; record?: HrRecord }>()
const emit = defineEmits<{ (e: 'update:modelValue', val: boolean): void; (e: 'submit', val: HrRecord): void }>()

// ダイアログの表示状態
const internalModelValue = ref(props.modelValue)
watch(() => props.modelValue, val => (internalModelValue.value = val))
watch(internalModelValue, val => emit('update:modelValue', val))

// 編集モード切替
const isEdit = ref(false)
const isView = computed(() => !isEdit.value)

const dialogTitle = computed(() => {
  if (!props.record) return '人事情報登録'
  return isEdit.value ? '人事情報編集' : '人事情報詳細'
})

const enableEdit = () => { isEdit.value = true }

const formRef = ref()
const isValid = ref(true)

const localRecord = ref<HrRecord>({
  lastName: '', firstName: '', lastNameKana: '', firstNameKana: '', fullNameNote: '', gender: '', birthDate: '',
  department: '', employeeId: '', employeeCode: '', employmentType: '', workStatus: '', hireDate: '', retireDate: '',
  phoneType: '', phoneNumber: '', faxNumber: '', email: '', addressType: '', zip: '', prefecture: '', city: '',
  cityKana: '', address1: '', address2: '', address1Kana: '', address2Kana: '', approvalStatus: ''
})

watch(() => props.record, val => {
  if (!val) {
    localRecord.value = {
      lastName: '', firstName: '', lastNameKana: '', firstNameKana: '', fullNameNote: '', gender: '', birthDate: '',
      department: '', employeeId: '', employeeCode: '', employmentType: '', workStatus: '', hireDate: '', retireDate: '',
      phoneType: '', phoneNumber: '', faxNumber: '', email: '', addressType: '', zip: '', prefecture: '', city: '',
      cityKana: '', address1: '', address2: '', address1Kana: '', address2Kana: '', approvalStatus: ''
    }
    isEdit.value = true
  } else {
    localRecord.value = JSON.parse(JSON.stringify(val))
  }
}, { immediate: true })

function close() {
  internalModelValue.value = false
  isEdit.value = !props.record
}

function submit() {
  if (formRef.value?.validate()) {
    emit('submit', localRecord.value)
    internalModelValue.value = false
    isEdit.value = false
  }
}
</script>
