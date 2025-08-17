<template>
  <section class="pt-[140px]">
    <div
      class="mx-auto max-w-[1170px] xl:px-0 lg:px-[60px] md:px-[32px] flex flex-col items-center"
    >
      <h2 class="text-black title-text pb-8 sm:pb-[50px] text-center px-4 md:px-0">
        Working with GET request
      </h2>

      <ul
        class="grid place-items-center gap-6 lg:gap-[29px] md:gap-[16px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full px-4 md:px-0"
      >
        <li v-for="u in users" :key="u.id" class="w-full flex justify-center">
          <VCard :user="u" />
        </li>
      </ul>

      <div class="flex justify-center mt-8 sm:mt-[50px]" v-if="!isLastPage">
        <VButton size="lg" :loading="loading" :disabled="loading" @click="loadMore"
          >Show more</VButton
        >
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUsersStore } from '@/stores/users'
import VCard from '@/components/ui/VCard.vue'
import VButton from '@/components/ui/VButton.vue'

const store = useUsersStore()
const { list: users, loading, isLastPage } = storeToRefs(store)

onMounted(() => store.fetchPage(1))

function loadMore() {
  if (!loading.value && !isLastPage.value) store.fetchPage(store.page + 1)
}
</script>
