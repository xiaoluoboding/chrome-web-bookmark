<template>
  <main
    class="p-4"
    :class="{'column': isHorizontal}"
    text="gray-700 dark:gray-200"
  >
    <Bookmark
      v-if="currentUrl"
      :url="currentUrl"
      :horizontal="isHorizontal"
    />

    <Footer class="text-center">
      <a class="icon-btn text-xl mx-2 inline-block" :title="$t('button.toggle_layout')" @click="toggleColumn">
        <mdi-dock-right v-if="isHorizontal" />
        <mdi-dock-top v-else />
      </a>
    </Footer>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { sharedLink } from '~/logic/storage'

const currentUrl = ref('')
const isHorizontal = ref(false)
const toggleColumn = () => {
  isHorizontal.value = !isHorizontal.value
}

chrome.tabs.query({
  active: true,
  currentWindow: true,
}, (tabs) => {
  const currentTab = tabs[0]
  currentUrl.value = currentTab.url as string
  sharedLink.value = currentUrl.value
})
</script>
