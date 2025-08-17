<template>
  <header class="bg-white">
    <div
      class="mx-auto w-full max-w-[1170px] h-[60px] flex items-center justify-between xl:px-0 lg:px-[60px] md:px-[32px] px-4"
    >
      <div class="flex items-center gap-3">
        <img src="/logo.svg" alt="Logo" class="h-[26px] w-[104px]" />
      </div>

      <nav class="flex items-center gap-2.5">
        <VButton size="md" type="button">Users</VButton>
        <VButton size="md" type="button">Sign up</VButton>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import VButton from '@/components/ui/VButton.vue'
</script>
