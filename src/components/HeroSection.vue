<template>
  <section
    class="relative w-full lg:h-[650px] h-[500px] bg-center bg-cover bg-no-repeat"
    style="background-image: url('/hero-bg.webp')"
  >
    <div class="absolute inset-0 bg-black/50"></div>

    <div class="relative mx-auto max-w-[1170px] h-full">
      <div class="h-full flex items-center justify-center">
        <div class="max-w-[380px] text-center px-4 md:px-0">
          <h1 class="mb-[21px] text-white title-text">Test assignment for front-end developer</h1>

          <p class="text-white text-body">
            What defines a good front-end developer is one that has skilled knowledge of HTML, CSS,
            JS with a vast understanding of User design thinking as they'll be building web
            interfaces with accessibility in mind. They should also be excited to learn, as the
            world of Front-End Development keeps evolving.
          </p>

          <div class="mt-8 flex justify-center">
            <v-button>Sign up</v-button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import VButton from '@/components/ui/VButton.vue'
</script>
