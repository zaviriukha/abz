<template>
  <label
    class="group inline-flex items-center gap-3 cursor-pointer select-none mb-[7px] last-of-type:mb-0"
  >
    <input
      class="peer sr-only"
      type="radio"
      :name="name"
      :value="value"
      :checked="modelValue === value"
      :disabled="disabled"
      @change="$emit('update:modelValue', value)"
    />

    <span
      class="relative w-[20px] h-[20px] rounded-full grid place-items-center border border-neutral-300 peer-checked:border-base-line peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-base-line peer-disabled:opacity-50 after:content-[''] after:w-[10px] after:h-[10px] after:rounded-full after:bg-base-line after:transition after:duration-150 after:scale-0 peer-checked:after:scale-100"
    ></span>

    <span class="text-body text-black">
      <slot />
    </span>
  </label>
</template>

<script setup>
defineProps({
  modelValue: { type: [String, Number], default: '' },
  value: { type: [String, Number], required: true },
  name: { type: String, required: true },
  disabled: { type: Boolean, default: false },
})
defineEmits(['update:modelValue'])
</script>
