<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    @click="$emit('click')"
    :class="[
      widthClass,
      'h-[34px] rounded-[80px] bg-button hover:bg-button-hover text-black text-body flex items-center justify-center disabled:bg-disable-bg cursor-pointer disabled:text-disable-text disabled:cursor-not-allowed',
    ]"
  >
    <span v-if="!loading"><slot /></span>
    <span v-else class="text-sm">Loading…</span>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: { type: String, default: 'button' },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  size: { type: String, default: 'md' },
})

defineEmits(['click'])

const sizes = {
  md: 'w-[100px]',
  lg: 'w-[120px]',
}

const widthClass = computed(() => sizes[props.size] || sizes.md)
</script>
