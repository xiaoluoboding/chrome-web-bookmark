<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <section class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
      <div class="w-full flex justify-center flex-col items-center">
        <Bookmark v-if="currentUrl" :url="currentUrl" horizontal />
        <Bookmark v-if="currentUrl" :url="currentUrl" cover="left" horizontal />
        <Bookmark v-if="currentUrl" :url="currentUrl" size="small" horizontal />
      </div>

      <div class="w-full flex justify-center flex-col items-center">
        <Bookmark v-if="currentUrl" :url="currentUrl" />
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
const currentUrl = ref('https://ghost.org/changelog/bookmark-cards/')

// chrome.tabs.query({
//   active: true,
//   currentWindow: true,
// }, (tabs) => {
//   const currentTab = tabs[0]
//   currentUrl.value = currentTab.url as string
// })
</script>
