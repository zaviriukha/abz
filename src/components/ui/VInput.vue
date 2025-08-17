<template>
  <label class="relative block w-full mb-[30px] last-of-type:mb-[25px]">
    <input
      :id="id"
      :name="name"
      :type="type"
      :value="modelValue"
      :required="required"
      :autocomplete="autocomplete"
      :aria-invalid="!!error"
      :aria-describedby="helperId"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder=" "
      :class="[
        'peer w-full h-[54px] rounded-md border-1 px-[16px] pt-[20px] pb-[16px] text-body text-black placeholder-transparent bg-background focus:outline-none focus:ring-0',
        error ? '!border-error focus:!border-error' : 'border-grey-base',
      ]"
    />

    <span
      class="pointer-events-none absolute left-[16px] top-[16px] z-10 text-[16px] leading-[20px] text-hint transition-all px-1 bg-background peer-placeholder-shown:top-[16px] peer-placeholder-shown:text-[16px] peer-focus:top-[-8px] peer-focus:text-[12px] peer-[&:not(:placeholder-shown)]:top-[-8px] peer-[&:not(:placeholder-shown)]:text-[12px]"
      :class="error ? 'text-error' : ''"
    >
      {{ label }}
    </span>

    <div :id="helperId" class="min-h-[14px] mt-1 px-[16px]">
      <p v-if="error" class="hint-text text-error">{{ error }}</p>
      <p v-else-if="hint" class="hint-text text-hint">{{ hint }}</p>
    </div>
  </label>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  name: { type: String, default: '' },
  id: { type: String, default: '' },
  label: { type: String, default: '' },
  type: { type: String, default: 'text' },
  required: { type: Boolean, default: false },
  autocomplete: { type: String, default: 'off' },
  hint: { type: String, default: '' },
  error: { type: String, default: '' },
})
defineEmits(['update:modelValue'])

const helperId = computed(() =>
  props.id || props.name ? `${props.id || props.name}-help` : undefined,
)
</script>
