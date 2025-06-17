<template>
  <v-dialog v-model="internalModelValue" max-width="600px">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>{{ dialogTitle }}</span>
        <v-btn
          v-if="props.mode !== 'create' && !isEdit"
          icon
          variant="text"
          @click="enableEdit"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-form ref="formRef" v-model="isValid">
          <v-text-field
            v-model="localUser.id"
            label="ユーザーID"
            :readonly="isView"
            :rules="[v => !!v || '必須項目です']"
            required
          />
          <v-text-field
            v-model="localUser.name"
            label="名前"
            :readonly="isView"
            :rules="[v => !!v || '必須項目です']"
            required
          />
          <v-text-field
            v-model="localUser.kana"
            label="名前（カナ）"
            :readonly="isView"
            :rules="[v => !!v || '必須項目です']"
            required
          />
          <v-text-field
            v-model="localUser.email"
            label="メールアドレス"
            :readonly="isView"
            :rules="[v => /.+@.+/.test(v) || '有効なメール形式で入力してください']"
            required
          />
          <v-select
            v-model="localUser.role"
            :items="['admin', 'user']"
            label="権限"
            :readonly="isView"
          />
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn @click="close">閉じる</v-btn>
        <v-btn
          v-if="!isView"
          color="primary"
          @click="submit"
          :disabled="!isValid"
        >
          保存
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { User } from '../../types/user'

const props = defineProps<{
  modelValue: boolean
  user?: User
  mode: 'create' | 'edit' | 'view'
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'submit', val: User): void
}>()

// ダイアログ開閉状態
const internalModelValue = ref(props.modelValue)
watch(() => props.modelValue, val => (internalModelValue.value = val))
watch(internalModelValue, val => emit('update:modelValue', val))

// view⇔edit
const isEdit = ref(props.mode === 'edit' || props.mode === 'create')
const isView = computed(() => !isEdit.value)

watch(
  () => props.mode,
  (newMode) => {
    isEdit.value = newMode === 'edit' || newMode === 'create'
  },
  { immediate: true }
)

// タイトル切替
const dialogTitle = computed(() => {
  if (props.mode === 'create') return 'ユーザー登録'
  if (props.mode === 'edit') return 'ユーザー編集'
  return 'ユーザー詳細'
})

// 編集に切り替え
const enableEdit = () => {
  isEdit.value = true
}

// ローカルコピー（変更を即時親に反映させない）
const localUser = ref<User>({
  id: '',
  name: '',
  kana: '',
  email: '',
  role: '',
  lastLogin: '',
})

watch(
  () => props.user,
  val => {
    if (props.mode === 'create'){
      // 新規作成時は初期値　空
      localUser.value = {
        id:'',
        name:'',
        kana:'',
        email:'',
        role:'',
        lastLogin:'',
      }
    }else if (val) {

      localUser.value = JSON.parse(JSON.stringify(val))
    }
  },
  { immediate: true }
)

// フォームバリデーション
const formRef = ref()
const isValid = ref(true)

function close() {
  internalModelValue.value = false
  isEdit.value = props.mode === 'edit' || props.mode === 'create'
}

function submit() {
  if (formRef.value?.validate()) {
    emit('submit', localUser.value)
    internalModelValue.value = false
  }
}
</script>
