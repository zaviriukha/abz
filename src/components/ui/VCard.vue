<template>
  <div
    class="flex flex-col items-center text-center rounded-2xl bg-white p-5 w-full max-w-[370px] h-[254px]"
  >
    <img
      :src="imgSrc"
      :alt="user.name"
      loading="lazy"
      class="w-[70px] h-[70px] rounded-full object-cover mb-5"
      @error="onImgError"
    />

    <div class="min-w-0 w-full">
      <h3 class="text-black text-body pb-5 truncate" :title="user.name">
        {{ user.name }}
      </h3>
      <p class="text-black text-body truncate" :title="user.title">
        {{ user.title }}
      </p>
      <p class="text-black text-body truncate" :title="user.email">
        {{ user.email }}
      </p>
      <p class="text-black text-body">
        {{ user.phone }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({ user: { type: Object, required: true } })

const fallback = '/photo-cover.svg'
const imgSrc = ref(props.user.avatar || fallback)

watchEffect(() => {
  imgSrc.value = props.user.avatar || fallback
})

function onImgError(e) {
  if (imgSrc.value !== fallback) {
    imgSrc.value = fallback
  } else {
    e.target.onerror = null
  }
}
</script>
