<template>
  <div class="w-full">
    <div class="flex w-full">
      <label
        class="w-[83px] h-[54px] flex items-center justify-center px-[15px] py-[14px] border rounded-l-md bg-background cursor-pointer hover:bg-neutral-50"
        :class="error ? 'border-error' : 'border-black'"
      >
        {{ buttonText }}
        <input
          class="hidden"
          :id="id || name"
          :name="name"
          type="file"
          :accept="accept"
          :disabled="disabled"
          @change="onChange"
        />
      </label>

      <div
        class="flex-1 flex items-center px-[15px] py-[14px] border border-l-0 rounded-r-md text-neutral-500 truncate h-[54px] w-[380px]"
        :class="[error ? 'border-error' : 'border-grey-base', disabled ? 'opacity-60' : '']"
      >
        <span class="truncate">
          {{ fileName || placeholder }}
        </span>
      </div>
    </div>

    <p v-if="error" class="mt-1 text-[12px] text-error">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: [File, Object, null], default: null },
  name: { type: String, default: '' },
  id: { type: String, default: '' },
  accept: { type: String, default: 'image/jpeg,image/jpg' },
  placeholder: { type: String, default: 'Upload your photo' },
  buttonText: { type: String, default: 'Upload' },
  disabled: { type: Boolean, default: false },
  error: { type: String, default: '' },
})
const emit = defineEmits(['update:modelValue'])

const fileName = computed(() => props.modelValue?.name || '')

function onChange(e) {
  const file = e.target.files?.[0] || null
  emit('update:modelValue', file)
}
</script>
