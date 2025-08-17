<script setup>
import AppHeader from '@/components/AppHeader.vue'
import HeroSection from '@/components/HeroSection.vue'
import UsersSection from '@/components/UsersSection.vue'
import SignupSection from '@/components/SignupSection.vue'
</script>

<template>
  <div class="min-h-dvh bg-background font-nunito">
    <AppHeader />

    <main class="mx-auto w-full max-w-[1170px]">
      <HeroSection />
      <UsersSection />
      <SignupSection />
    </main>
  </div>
</template>
