<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <section class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
      <div class="w-full flex justify-center flex-col items-center">
        <Bookmark v-if="sharedLink" :url="sharedLink" horizontal />
        <Bookmark v-if="sharedLink" :url="sharedLink" cover="left" horizontal />
        <Bookmark v-if="sharedLink" :url="sharedLink" size="small" horizontal />
      </div>

      <div class="w-full flex justify-center flex-col items-center">
        <Bookmark v-if="sharedLink" :url="sharedLink" />
        <!-- <Bookmark v-if="currentUrl" :url="currentUrl" size="small" /> -->
      </div>
    </section>

    <Footer />

    <div class="mt-4">
      {{ $t('options.powered_by_vite') }} <pixelarticons-zap class="align-middle inline-block" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { sharedLink } from '~/logic/storage'
</script>
